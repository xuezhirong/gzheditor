'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { themes } from '../styles/markdownThemes';

export default function MarkdownRenderer({ content }) {
  const [currentTheme, setCurrentTheme] = useState('wabisabi');

  return (
    <div className="markdown-container">
      {/* 主题切换按钮组 */}
      <div className="flex gap-2 mb-4">
        {Object.entries(themes).map(([themeKey, theme]) => (
          <button
            key={themeKey}
            onClick={() => setCurrentTheme(themeKey)}
            className={`px-3 py-1 rounded text-sm transition-all duration-300 ${
              currentTheme === themeKey
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>

      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]} 
        remarkPlugins={[remarkGfm]}
        className="markdown-body"
        components={{
          h1: ({node, ...props}) => <h1 className="markdown-h1" {...props} />,
          h2: ({node, ...props}) => <h2 className="markdown-h2" {...props} />,
          h3: ({node, ...props}) => <h3 className="markdown-h3" {...props} />,
          h4: ({node, ...props}) => <h4 className="markdown-h4" {...props} />,
          h5: ({node, ...props}) => <h5 className="markdown-h5" {...props} />,
          h6: ({node, ...props}) => <h6 className="markdown-h6" {...props} />,
          li: ({node, ...props}) => <li className="markdown-li" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>

      <style jsx global>{`
        .markdown-h1 { font-size: 2em; }
        .markdown-h2 { font-size: 1.5em; }
        .markdown-h3 { font-size: 1.17em; }
        .markdown-h4 { font-size: 1em; }
        .markdown-h5 { font-size: 0.83em; }
        .markdown-h6 { font-size: 0.67em; }
        
        /* 当前选中主题的样式 */
        ${themes[currentTheme].styles}

        .markdown-body {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
} 