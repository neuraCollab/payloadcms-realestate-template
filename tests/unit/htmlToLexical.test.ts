import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import { htmlToLexical, lexicalToHtml } from '../../src/lib/cabinet/htmlToLexical'

const dom = new JSDOM()
const realDOMParser = global.DOMParser

function setupDOM() {
  global.DOMParser = dom.window.DOMParser as any
  global.Node = dom.window.Node as any
  global.HTMLElement = dom.window.HTMLElement as any
}

function teardownDOM() {
  global.DOMParser = realDOMParser as any
  global.Node = undefined as any
  global.HTMLElement = undefined as any
}

function assertRootParagraph(res: Record<string, any>, children: any[]) {
  assert.deepEqual(res.root.children, [{
    type: 'paragraph',
    version: 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    children
  }])
}

describe('htmlToLexical', () => {
  it('handles empty strings', () => {
    setupDOM()
    const res = htmlToLexical('')
    assertRootParagraph(res, [{
      type: 'text',
      version: 1,
      text: '',
      format: 0,
      style: '',
      mode: 'normal',
      detail: 0
    }])
    teardownDOM()
  })

  it('handles SSR fallback (no DOMParser)', () => {
    teardownDOM()
    const res = htmlToLexical('<p>Hello <b>World</b></p>')
    assertRootParagraph(res, [{
      type: 'text',
      version: 1,
      text: 'Hello World', // stripped tags fallback
      format: 0,
      style: '',
      mode: 'normal',
      detail: 0
    }])
  })

  it('parses basic paragraphs', () => {
    setupDOM()
    const res = htmlToLexical('<p>Hello World</p>')
    assertRootParagraph(res, [{
      type: 'text',
      version: 1,
      text: 'Hello World',
      format: 0,
      style: '',
      mode: 'normal',
      detail: 0
    }])
    teardownDOM()
  })

  it('parses headings', () => {
    setupDOM()
    const res = htmlToLexical('<h2>Heading 2</h2><h3>Heading 3</h3>')
    assert.deepEqual(res.root.children, [
      {
        type: 'heading',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        tag: 'h2',
        children: [{
          type: 'text',
          version: 1,
          text: 'Heading 2',
          format: 0,
          style: '',
          mode: 'normal',
          detail: 0
        }]
      },
      {
        type: 'heading',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        tag: 'h3',
        children: [{
          type: 'text',
          version: 1,
          text: 'Heading 3',
          format: 0,
          style: '',
          mode: 'normal',
          detail: 0
        }]
      }
    ])
    teardownDOM()
  })

  it('parses formatting', () => {
    setupDOM()
    const res = htmlToLexical('<p>Hello <strong>bold</strong> and <em>italic</em> text</p>')
    assertRootParagraph(res, [
      { type: 'text', version: 1, text: 'Hello ', format: 0, style: '', mode: 'normal', detail: 0 },
      { type: 'text', version: 1, text: 'bold', format: 1, style: '', mode: 'normal', detail: 0 },
      { type: 'text', version: 1, text: ' and ', format: 0, style: '', mode: 'normal', detail: 0 },
      { type: 'text', version: 1, text: 'italic', format: 2, style: '', mode: 'normal', detail: 0 },
      { type: 'text', version: 1, text: ' text', format: 0, style: '', mode: 'normal', detail: 0 },
    ])
    teardownDOM()
  })

  it('parses lists', () => {
    setupDOM()
    const res = htmlToLexical('<ul><li>Item 1</li><li>Item 2</li></ul><ol><li>Item 3</li></ol>')
    assert.deepEqual(res.root.children, [
      {
        type: 'list',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        listType: 'bullet',
        tag: 'ul',
        start: 1,
        children: [
          {
            type: 'listitem',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            value: 1,
            children: [{ type: 'text', version: 1, text: 'Item 1', format: 0, style: '', mode: 'normal', detail: 0 }]
          },
          {
            type: 'listitem',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            value: 2,
            children: [{ type: 'text', version: 1, text: 'Item 2', format: 0, style: '', mode: 'normal', detail: 0 }]
          }
        ]
      },
      {
        type: 'list',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        listType: 'number',
        tag: 'ol',
        start: 1,
        children: [
          {
            type: 'listitem',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            value: 1,
            children: [{ type: 'text', version: 1, text: 'Item 3', format: 0, style: '', mode: 'normal', detail: 0 }]
          }
        ]
      }
    ])
    teardownDOM()
  })

  it('parses links and sanitizes dangerous ones', () => {
    setupDOM()
    const res = htmlToLexical('<p><a href="https://example.com">Good Link</a> <a href="javascript:alert(1)">Bad Link</a></p>')
    assertRootParagraph(res, [
      {
        type: 'link',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        url: 'https://example.com',
        rel: 'noopener noreferrer',
        target: '_blank',
        children: [{ type: 'text', version: 1, text: 'Good Link', format: 0, style: '', mode: 'normal', detail: 0 }]
      },
      { type: 'text', version: 1, text: ' ', format: 0, style: '', mode: 'normal', detail: 0 },
      // Bad link is converted to plain text
      { type: 'text', version: 1, text: 'Bad Link', format: 0, style: '', mode: 'normal', detail: 0 }
    ])
    teardownDOM()
  })

  it('wraps plain text outside of blocks', () => {
    setupDOM()
    const res = htmlToLexical('Some text outside blocks')
    assertRootParagraph(res, [{ type: 'text', version: 1, text: 'Some text outside blocks', format: 0, style: '', mode: 'normal', detail: 0 }])
    teardownDOM()
  })

  it('handles unknown blocks by taking their inline content', () => {
    setupDOM()
    const res = htmlToLexical('<div><span>Inner text</span></div>')
    assertRootParagraph(res, [{ type: 'text', version: 1, text: 'Inner text', format: 0, style: '', mode: 'normal', detail: 0 }])
    teardownDOM()
  })

  it('handles linebreaks', () => {
    setupDOM()
    const res = htmlToLexical('<p>Line 1<br>Line 2</p>')
    assertRootParagraph(res, [
      { type: 'text', version: 1, text: 'Line 1', format: 0, style: '', mode: 'normal', detail: 0 },
      { type: 'linebreak', version: 1 },
      { type: 'text', version: 1, text: 'Line 2', format: 0, style: '', mode: 'normal', detail: 0 }
    ])
    teardownDOM()
  })
})

describe('lexicalToHtml', () => {
  it('handles empty or invalid inputs', () => {
    assert.equal(lexicalToHtml(null), '')
    assert.equal(lexicalToHtml(undefined), '')
    assert.equal(lexicalToHtml('string'), '')
    assert.equal(lexicalToHtml({}), '')
  })

  it('converts basic paragraphs and text', () => {
    const doc = {
      root: {
        type: 'root',
        children: [{
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Hello ' },
            { type: 'text', text: 'World' }
          ]
        }]
      }
    }
    assert.equal(lexicalToHtml(doc), '<p>Hello World</p>')
  })

  it('converts headings', () => {
    const doc = {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Heading 2' }]
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Heading 3' }]
          }
        ]
      }
    }
    assert.equal(lexicalToHtml(doc), '<h2>Heading 2</h2><h3>Heading 3</h3>')
  })

  it('converts formatting', () => {
    const doc = {
      root: {
        type: 'root',
        children: [{
          type: 'paragraph',
          children: [
            { type: 'text', text: 'bold', format: 1 },
            { type: 'text', text: 'italic', format: 2 },
            { type: 'text', text: 'both', format: 3 }
          ]
        }]
      }
    }
    assert.equal(lexicalToHtml(doc), '<p><strong>bold</strong><em>italic</em><em><strong>both</strong></em></p>')
  })

  it('converts lists', () => {
    const doc = {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            listType: 'bullet',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Item 1' }] },
              { type: 'listitem', children: [{ type: 'text', text: 'Item 2' }] }
            ]
          },
          {
            type: 'list',
            listType: 'number',
            children: [
              { type: 'listitem', children: [{ type: 'text', text: 'Item 3' }] }
            ]
          }
        ]
      }
    }
    assert.equal(lexicalToHtml(doc), '<ul><li>Item 1</li><li>Item 2</li></ul><ol><li>Item 3</li></ol>')
  })

  it('converts links', () => {
    const doc = {
      root: {
        type: 'root',
        children: [{
          type: 'paragraph',
          children: [
            {
              type: 'link',
              url: 'https://example.com',
              children: [{ type: 'text', text: 'Link' }]
            }
          ]
        }]
      }
    }
    assert.equal(lexicalToHtml(doc), '<p><a href="https://example.com" rel="noopener noreferrer" target="_blank">Link</a></p>')
  })

  it('escapes html to prevent XSS', () => {
    const doc = {
      root: {
        type: 'root',
        children: [{
          type: 'paragraph',
          children: [
            { type: 'text', text: '<script>alert(1)</script>' }
          ]
        }]
      }
    }
    assert.equal(lexicalToHtml(doc), '<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>')
  })

  it('handles linebreaks', () => {
    const doc = {
      root: {
        type: 'root',
        children: [{
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Line 1' },
            { type: 'linebreak' },
            { type: 'text', text: 'Line 2' }
          ]
        }]
      }
    }
    assert.equal(lexicalToHtml(doc), '<p>Line 1<br>Line 2</p>')
  })
})
