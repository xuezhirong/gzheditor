'use client';
import { useState, useEffect } from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function Editor() {
  const [markdown, setMarkdown] = useState('');
  
  useEffect(() => {
    // 加载默认的Markdown内容
    fetch('/md/1.md')
      .then(response => response.text())
      .then(content => {
        setMarkdown(content);
      })
      .catch(error => {
        console.error('加载Markdown文件失败:', error);
        setMarkdown('# 加载失败\n\n请重试...');
      });
  }, []);
  
  return (
    <div className="flex h-screen">
      {/* 左侧编辑区 */}
      <div className="w-1/2 p-4 border-r">
        <textarea
          className="w-full h-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg resize-none focus:outline-none"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
      
      {/* 右侧预览区 */}
      <div className="w-1/2 p-4 overflow-auto">
        <div className="prose dark:prose-invert max-w-none">
          <MarkdownRenderer content={markdown} />
        </div>
      </div>
    </div>
  );
} 