import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Send } from "lucide-react";

const PromptInput = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-16 relative">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-semibold mb-2"
        >
          <Sparkles size={14} />
          <span>Next Generation Comparison</span>
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white">
          AI <span className="gradient-text">Battle Arena</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">
          Challenge two giants of intelligence and let the machine judge decide
          the winner.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="relative group mt-12"
      >
        <div className="absolute -inset-1 bg-linear-to-r from-violet-600 to-pink-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-slate-900 rounded-2xl border border-white/10 p-2 pl-6">
          <Search className="text-slate-500 mr-4" size={24} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question or provide a coding challenge..."
            className="flex-grow bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-600"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="ml-4 px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-600 transition-all rounded-xl font-bold flex items-center gap-2 text-white shadow-xl shadow-violet-900/20 active:scale-95"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Battle</span>
                <Send size={18} />
              </>
            )}
          </button>
        </div>
      </motion.form>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {[
          "React vs Vue",
          "Python vs Rust",
          "Write a factorial function",
          "Explain Quantum Physics",
        ].map((hint) => (
          <button
            key={hint}
            onClick={() => setQuery(hint)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            {hint}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptInput;
