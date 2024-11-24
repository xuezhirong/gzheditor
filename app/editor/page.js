'use client';
import { useState, useEffect } from 'react';
import TurndownService from 'turndown';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function Editor() {
  const [markdown, setMarkdown] = useState('');
  const turndownService = new TurndownService();
  
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
  
  const handleContentChange = (e) => {
    setMarkdown(e.target.value);
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    
    // 获取剪贴板数据
    const clipboardData = e.clipboardData || window.clipboardData;
    
    // 尝试获取 HTML 内容
    const htmlContent = clipboardData.getData('text/html');
    
    if (htmlContent) {
      // 如果有 HTML 内容，转换为 Markdown
      const markdownContent = turndownService.turndown(htmlContent);
      setMarkdown(markdownContent);
    } else {
      // 如果没有 HTML，使用普通文本
      const textContent = clipboardData.getData('text/plain');
      setMarkdown(textContent);
    }
  };
  
  return (
    <div className="flex h-screen">
      {/* 左侧编辑区 */}
      <div className="w-1/2 p-4 border-r">
        <textarea
          className="w-full h-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg resize-none focus:outline-none"
          value={markdown}
          onChange={handleContentChange}
          onPaste={handlePaste}
          placeholder="在这里粘贴 Markdown 或富文本内容..."
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