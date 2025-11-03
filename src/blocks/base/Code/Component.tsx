import React from 'react'

import { Code } from './Component.client'

export type CodeBlockProps = {
  code: string
  language?: string
  blockType: 'code'
}

type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language }) => {
  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className={`opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards] ${className || ''} not-prose`}>
          <Code code={code} language={language} />
        </div>
      </div>
    </div>
  )
}
