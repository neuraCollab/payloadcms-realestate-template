import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'

import { htmlToLexical, lexicalToHtml } from '../../src/lib/cabinet/htmlToLexical'

describe('htmlToLexical & lexicalToHtml', () => {
  let jsdom: JSDOM

  before(() => {
    jsdom = new JSDOM('')
    global.DOMParser = jsdom.window.DOMParser
    global.Node = jsdom.window.Node
    global.HTMLElement = jsdom.window.HTMLElement
  })

  after(() => {
    // @ts-ignore
    delete global.DOMParser
    // @ts-ignore
    delete global.Node
    // @ts-ignore
    delete global.HTMLElement
  })

  describe('htmlToLexical', () => {
    it('returns empty lexical structure for empty or whitespace-only strings', () => {
      const empty1 = htmlToLexical('')
      const empty2 = htmlToLexical('   ')
      const empty3 = htmlToLexical('<p></p>')

      assert.equal(empty1.root.children[0].type, 'paragraph')
      assert.equal(empty1.root.children[0].children[0].text, '')
      assert.deepEqual(empty1, empty2)
      assert.deepEqual(empty2, empty3)
    })

    it('wraps plain text without tags into a paragraph', () => {
      const result = htmlToLexical('Hello world')
      assert.equal(result.root.children.length, 1)
      const p = result.root.children[0]
      assert.equal(p.type, 'paragraph')
      assert.equal(p.children[0].type, 'text')
      assert.equal(p.children[0].text, 'Hello world')
    })

    it('parses headings (h2, h3)', () => {
      const result = htmlToLexical('<h2>Heading 2</h2><h3>Heading 3</h3>')
      const [h2, h3] = result.root.children
      assert.equal(h2.type, 'heading')
      assert.equal(h2.tag, 'h2')
      assert.equal(h2.children[0].text, 'Heading 2')

      assert.equal(h3.type, 'heading')
      assert.equal(h3.tag, 'h3')
      assert.equal(h3.children[0].text, 'Heading 3')
    })

    it('parses paragraphs', () => {
      const result = htmlToLexical('<p>Paragraph text</p>')
      assert.equal(result.root.children[0].type, 'paragraph')
      assert.equal(result.root.children[0].children[0].text, 'Paragraph text')
    })

    it('parses bullet lists (ul)', () => {
      const result = htmlToLexical('<ul><li>Item 1</li><li>Item 2</li></ul>')
      const list = result.root.children[0]
      assert.equal(list.type, 'list')
      assert.equal(list.listType, 'bullet')
      assert.equal(list.tag, 'ul')
      assert.equal(list.children.length, 2)

      const li = list.children[0]
      assert.equal(li.type, 'listitem')
      assert.equal(li.children[0].text, 'Item 1')
      assert.equal(li.value, 1)
    })

    it('parses numbered lists (ol)', () => {
      const result = htmlToLexical('<ol><li>First</li></ol>')
      const list = result.root.children[0]
      assert.equal(list.type, 'list')
      assert.equal(list.listType, 'number')
      assert.equal(list.tag, 'ol')
      assert.equal(list.children[0].children[0].text, 'First')
    })

    it('parses inline formatting (bold, italic, br)', () => {
      const result = htmlToLexical('<p><strong>bold</strong> and <em>italic</em><br>end</p>')
      const p = result.root.children[0]

      // format bitmask: 1 = bold, 2 = italic
      assert.equal(p.children[0].text, 'bold')
      assert.equal(p.children[0].format, 1)

      assert.equal(p.children[1].text, ' and ')
      assert.equal(p.children[1].format, 0)

      assert.equal(p.children[2].text, 'italic')
      assert.equal(p.children[2].format, 2)

      assert.equal(p.children[3].type, 'linebreak')

      assert.equal(p.children[4].text, 'end')
    })

    it('parses links (a)', () => {
      const result = htmlToLexical('<p><a href="https://example.com">Link</a></p>')
      const a = result.root.children[0].children[0]
      assert.equal(a.type, 'link')
      assert.equal(a.url, 'https://example.com')
      assert.equal(a.children[0].text, 'Link')
    })

    it('strips unsafe links and renders as text only', () => {
      const result = htmlToLexical('<p><a href="javascript:alert(1)">Click</a></p>')
      const child = result.root.children[0].children[0]
      assert.equal(child.type, 'text')
      assert.equal(child.text, 'Click')
    })

    it('fallback to SSR logic when DOMParser is undefined', () => {
      // Temporarily remove DOMParser
      const cachedParser = global.DOMParser
      // @ts-ignore
      delete global.DOMParser

      const result = htmlToLexical('<p>Hello <strong>World</strong></p>')
      // Expect plain text wrapper
      assert.equal(result.root.children[0].type, 'paragraph')
      assert.equal(result.root.children[0].children[0].text, 'Hello World') // strips tags

      global.DOMParser = cachedParser
    })
  })

  describe('lexicalToHtml', () => {
    it('converts basic lexical back to html', () => {
      const html = '<h2>Title</h2><p>Some <strong>bold</strong> text</p>'
      const lexical = htmlToLexical(html)
      const convertedHtml = lexicalToHtml(lexical)

      assert.equal(convertedHtml, html)
    })

    it('converts lists to html', () => {
      const html = '<ul><li>one</li><li>two</li></ul>'
      const lexical = htmlToLexical(html)
      const convertedHtml = lexicalToHtml(lexical)

      assert.equal(convertedHtml, html)
    })

    it('handles empty/invalid input gracefully', () => {
      assert.equal(lexicalToHtml(null), '')
      assert.equal(lexicalToHtml({}), '')
    })
  })
})
