'use client'
import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'
import { CopyButton } from './CopyButton'

type Props = {
  code: string
  language?: string
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
  if (!code) return null

  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <div className="relative group">
          <pre className="bg-surface-container-highest p-6 border border-border rounded-md overflow-x-auto shadow-e1 hover:shadow-e1 transition-all duration-300">
            <code className="text-sm">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ className: 'table-row', line })}>
                  <span className="table-cell select-none text-right text-on-surface-variant pr-4 w-8">
                    {i + 1}
                  </span>
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </code>
            <CopyButton code={code} />
          </pre>
        </div>
      )}
    </Highlight>
  )
}
