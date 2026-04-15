import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { Trophy, Star, MessageSquare } from 'lucide-react';

const SolutionCard = ({ name, content, score, reasoning, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="glass rounded-2xl overflow-hidden flex flex-col h-full group"
    >
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${index === 0 ? 'bg-violet-500/20 text-violet-400' : 'bg-pink-500/20 text-pink-400'}`}>
            <MessageSquare size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Contributor AI</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-glow">
            <span className="text-2xl font-black text-violet-400">{score}</span>
            <span className="text-slate-500 text-sm font-bold">/ 10</span>
          </div>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < Math.round(score / 2) ? 'text-violet-400 fill-violet-400' : 'text-slate-700'} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow overflow-y-auto max-h-[500px] scrollbar-thin">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-xl !bg-slate-950/50 !p-4 my-4"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={`${className} bg-slate-800/50 rounded px-1 py-0.5`} {...props}>
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 gradient-text">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold mb-3 text-slate-100">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-bold mb-2 text-slate-200">{children}</h3>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-slate-300 space-y-1">{children}</ul>,
              li: ({ children }) => <li className="marker:text-violet-400">{children}</li>,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {reasoning && (
        <div className="p-6 bg-slate-950/40 border-t border-white/5">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-violet-500/10 rounded-lg shrink-0">
              <Trophy size={16} className="text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">Judge's Notes</p>
              <p className="text-sm text-slate-400 italic leading-relaxed">"{reasoning}"</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SolutionCard;
