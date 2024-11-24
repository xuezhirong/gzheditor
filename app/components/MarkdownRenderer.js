'use client';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-container">
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
        .markdown-h1,
        .markdown-h2,
        .markdown-h3,
        .markdown-h4,
        .markdown-h5,
        .markdown-h6 {
          text-align: center;
          color: #2ecc71;
        }

        .markdown-h1 {
          font-size: 20px;
        }

        .markdown-h2 {
          font-size: 18px;
        }

        .markdown-h3 {
          font-size: 16px;
        }

        .markdown-h4 {
          font-size: 14px;
        }

        .markdown-h5 {
          font-size: 13px;
        }

        .markdown-h6 {
          font-size: 12px;
        }

        .markdown-li {
          color: #666666;
          -webkit-text-fill-color: #666666;
        }
      `}</style>
    </div>
  );
} 