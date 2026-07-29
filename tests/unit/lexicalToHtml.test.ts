import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { lexicalToHtml } from '../../src/lib/cabinet/htmlToLexical'

describe('lexicalToHtml', () => {
  it('returns empty string for falsy/invalid docs', () => {
    assert.equal(lexicalToHtml(null), '')
    assert.equal(lexicalToHtml(undefined), '')
    assert.equal(lexicalToHtml(''), '')
    assert.equal(lexicalToHtml(123), '')
    assert.equal(lexicalToHtml({}), '') // missing root
  })

  it('converts basic paragraphs and text', () => {
    const doc = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Hello ' },
              { type: 'text', text: 'world' }
            ]
          }
        ]
      }
    }
    assert.equal(lexicalToHtml(doc), '<p>Hello world</p>')
  })

  it('handles text formatting', () => {
    const doc = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'normal ', format: 0 },
              { type: 'text', text: 'bold ', format: 1 },
              { type: 'text', text: 'italic ', format: 2 },
              { type: 'text', text: 'bold+italic', format: 3 }
            ]
          }
        ]
      }
    }
    assert.equal(
      lexicalToHtml(doc),
      '<p>normal <strong>bold </strong><em>italic </em><em><strong>bold+italic</strong></em></p>'
    )
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

  it('converts lists', () => {
    const doc = {
      root: {
        type: 'root',
        children: [
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Item 1' }]
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Item 2' }]
              }
            ]
          },
          {
            type: 'list',
            listType: 'number',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'First' }]
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Second' }]
              }
            ]
          }
        ]
      }
    }
    assert.equal(
      lexicalToHtml(doc),
      '<ul><li>Item 1</li><li>Item 2</li></ul><ol><li>First</li><li>Second</li></ol>'
    )
  })

  it('handles links', () => {
    const doc = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'link',
                url: 'https://example.com',
                children: [{ type: 'text', text: 'Click here' }]
              }
            ]
          }
        ]
      }
    }
    assert.equal(
      lexicalToHtml(doc),
      '<p><a href="https://example.com" rel="noopener noreferrer" target="_blank">Click here</a></p>'
    )
  })

  it('handles linebreaks', () => {
    const doc = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Line 1' },
              { type: 'linebreak' },
              { type: 'text', text: 'Line 2' }
            ]
          }
        ]
      }
    }
    assert.equal(lexicalToHtml(doc), '<p>Line 1<br>Line 2</p>')
  })

  it('escapes HTML in text and links', () => {
    const doc = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: '<script>alert(1)</script>' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'link',
                url: 'javascript:alert("hi")',
                children: [{ type: 'text', text: 'XSS & Link' }]
              }
            ]
          }
        ]
      }
    }
    assert.equal(
      lexicalToHtml(doc),
      '<p>&lt;script&gt;alert(1)&lt;/script&gt;</p><p><a href="javascript:alert(&quot;hi&quot;)" rel="noopener noreferrer" target="_blank">XSS &amp; Link</a></p>'
    )
  })

  it('handles undefined properties gracefully', () => {
    const doc = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text' }, // missing text
              { type: 'link' } // missing url and children
            ]
          }
        ]
      }
    }
    // undefined text is converted to '' -> text escapes to ''
    // undefined url is converted to '' -> href escapes to ''
    // missing link children is treated as [] -> empty <a>
    assert.equal(
      lexicalToHtml(doc),
      '<p><a href="" rel="noopener noreferrer" target="_blank"></a></p>'
    )
  })
})
