import MarkdownRenderer from '../components/MarkdownRenderer';
import fs from 'fs/promises';
import path from 'path';

export default async function Editor() {
  const mdPath = path.join(process.cwd(), 'public/md/1.md');
  const content = await fs.readFile(mdPath, 'utf8');
  
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="prose dark:prose-invert">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
} 