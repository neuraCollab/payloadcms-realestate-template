/**
 * Конвертер HTML (вывод tiptap) → Lexical JSON.
 *
 * Поддерживаемые ноды (whitelist):
 *   <p>      → paragraph
 *   <h2/h3>  → heading (tag = h2|h3)
 *   <ul/ol>  → list
 *   <li>     → listitem
 *   <a>      → link node (с url'ом)
 *   <strong>, <b>     → format bit 1 (IS_BOLD)
 *   <em>, <i>         → format bit 2 (IS_ITALIC)
 *
 * Всё остальное игнорируется (защита от XSS / неподдерживаемых тэгов).
 *
 * Работает в браузере (использует DOMParser).
 */

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2

interface LexNode {
  type: string
  version: number
  format?: any
  indent?: number
  direction?: string | null
  children?: LexNode[]
  text?: string
  mode?: string
  style?: string
  detail?: number
  tag?: string
  listType?: 'bullet' | 'number'
  start?: number
  url?: string
  rel?: string | null
  target?: string | null
}

export function htmlToLexical(html: string): Record<string, any> {
  // Пустое содержимое → минимальный валидный документ.
  const trimmed = (html ?? '').trim()
  if (!trimmed || trimmed === '<p></p>') {
    return emptyLexical()
  }

  if (typeof DOMParser === 'undefined') {
    // SSR fallback — отдаём plain-text wrapper.
    return wrapPlainText(stripTags(trimmed))
  }

  const doc = new DOMParser().parseFromString(`<div>${trimmed}</div>`, 'text/html')
  const root = doc.body.firstChild as HTMLElement | null
  if (!root) return emptyLexical()

  const children = Array.from(root.childNodes)
    .map((n) => walkBlock(n))
    .filter((n): n is LexNode => n !== null)

  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children: children.length > 0 ? children : [emptyParagraph()],
    },
  }
}

function walkBlock(node: ChildNode): LexNode | null {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = (node.textContent ?? '').trim()
    if (!text) return null
    // Голый текст вне блока — оборачиваем в paragraph.
    return paragraph([textNode(text, 0)])
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return null
  const el = node as HTMLElement
  const tag = el.tagName.toLowerCase()

  if (tag === 'p') {
    return paragraph(walkInline(el, 0))
  }
  if (tag === 'h2') {
    return heading('h2', walkInline(el, 0))
  }
  if (tag === 'h3') {
    return heading('h3', walkInline(el, 0))
  }
  if (tag === 'ul') {
    return list('bullet', listItems(el))
  }
  if (tag === 'ol') {
    return list('number', listItems(el))
  }
  // Неподдерживаемый блок — обернуть текст в paragraph.
  const inline = walkInline(el, 0)
  if (inline.length === 0) return null
  return paragraph(inline)
}

function listItems(parent: HTMLElement): LexNode[] {
  return Array.from(parent.children)
    .filter((c) => c.tagName.toLowerCase() === 'li')
    .map((li, idx) => ({
      type: 'listitem',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      value: idx + 1,
      children: walkInline(li as HTMLElement, 0),
    }))
}

function walkInline(parent: HTMLElement, format: number): LexNode[] {
  const out: LexNode[] = []
  for (const child of Array.from(parent.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent ?? ''
      if (text) out.push(textNode(text, format))
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as HTMLElement
      const tag = el.tagName.toLowerCase()
      if (tag === 'strong' || tag === 'b') {
        out.push(...walkInline(el, format | FORMAT_BOLD))
      } else if (tag === 'em' || tag === 'i') {
        out.push(...walkInline(el, format | FORMAT_ITALIC))
      } else if (tag === 'br') {
        out.push({ type: 'linebreak', version: 1 })
      } else if (tag === 'a') {
        const href = el.getAttribute('href') ?? ''
        if (!isSafeUrl(href)) {
          // Унебезопасные ссылки (javascript:) → инлайн текстом.
          out.push(...walkInline(el, format))
          continue
        }
        out.push({
          type: 'link',
          version: 1,
          format: '',
          indent: 0,
          direction: 'ltr',
          url: href,
          rel: 'noopener noreferrer',
          target: '_blank',
          children: walkInline(el, format),
        })
      } else {
        // Неизвестный inline — берём только текст.
        out.push(...walkInline(el, format))
      }
    }
  }
  return out
}

function textNode(text: string, format: number): LexNode {
  return {
    type: 'text',
    version: 1,
    text,
    format,
    style: '',
    mode: 'normal',
    detail: 0,
  }
}

function paragraph(children: LexNode[]): LexNode {
  return {
    type: 'paragraph',
    version: 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    children: children.length > 0 ? children : [textNode('', 0)],
  }
}

function heading(tag: string, children: LexNode[]): LexNode {
  return {
    type: 'heading',
    version: 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    tag,
    children: children.length > 0 ? children : [textNode('', 0)],
  }
}

function list(listType: 'bullet' | 'number', children: LexNode[]): LexNode {
  return {
    type: 'list',
    version: 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    listType,
    tag: listType === 'bullet' ? 'ul' : 'ol',
    start: 1,
    children,
  }
}

function emptyParagraph(): LexNode {
  return paragraph([textNode('', 0)])
}

function emptyLexical(): Record<string, any> {
  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children: [emptyParagraph()],
    },
  }
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, '')
}

function wrapPlainText(text: string): Record<string, any> {
  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children: [paragraph([textNode(text, 0)])],
    },
  }
}

/** Конвертер обратно — Lexical → plain text (для form initial из БД). */
export function lexicalToHtml(doc: any): string {
  if (!doc || typeof doc !== 'object') return ''
  return blockToHtml(doc.root)
}

function blockToHtml(node: any): string {
  if (!node) return ''
  if (node.type === 'root') {
    return (node.children ?? []).map((c: any) => blockToHtml(c)).join('')
  }
  if (node.type === 'paragraph') {
    return `<p>${inlineToHtml(node.children)}</p>`
  }
  if (node.type === 'heading') {
    const tag = node.tag === 'h3' ? 'h3' : 'h2'
    return `<${tag}>${inlineToHtml(node.children)}</${tag}>`
  }
  if (node.type === 'list') {
    const tag = node.listType === 'number' ? 'ol' : 'ul'
    const items = (node.children ?? [])
      .map((li: any) => `<li>${inlineToHtml(li.children)}</li>`)
      .join('')
    return `<${tag}>${items}</${tag}>`
  }
  return ''
}

function inlineToHtml(children: any[] = []): string {
  return children
    .map((c) => {
      if (c.type === 'linebreak') return '<br>'
      if (c.type === 'text') {
        const text = escapeHtml(String(c.text ?? ''))
        const fmt = Number(c.format ?? 0)
        let out = text
        if (fmt & FORMAT_BOLD) out = `<strong>${out}</strong>`
        if (fmt & FORMAT_ITALIC) out = `<em>${out}</em>`
        return out
      }
      if (c.type === 'link') {
        const url = escapeHtml(String(c.url ?? ''))
        return `<a href="${url}" rel="noopener noreferrer" target="_blank">${inlineToHtml(c.children)}</a>`
      }
      return ''
    })
    .join('')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isSafeUrl(url: string): boolean {
  if (!url) return false
  const trimmed = url.trim().toLowerCase()
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('vbscript:')
  ) {
    return false
  }
  return true
}
