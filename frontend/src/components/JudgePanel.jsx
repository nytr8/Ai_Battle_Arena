import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, Award, TrendingUp, AlertCircle } from 'lucide-react';

const JudgePanel = ({ winner, reason, stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto mt-12 overflow-hidden rounded-3xl gradient-border glass"
    >
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Verdict Section */}
        <div className="flex-1 p-8 bg-linear-to-br from-violet-500/10 to-transparent">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-violet-500 rounded-xl text-white shadow-lg shadow-violet-500/20">
              <Gavel size={24} />
            </div>
            <h2 className="text-2xl font-black tracking-tight">Final Verdict</h2>
          </div>
          
          <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">
            <Award className="text-yellow-400" size={32} />
            <div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">The Winner</p>
              <h3 className="text-xl font-bold text-white">{winner}</h3>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed italic border-l-2 border-violet-500 pl-4 py-1">
            "{reason}"
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex-1 p-8 bg-slate-950/20">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-violet-400" />
            Battle Metrics
          </h3>
          
          <div className="space-y-6">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">{stat.label}</span>
                  <span className="text-white font-bold">{stat.value}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className={`h-full bg-linear-to-r ${stat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-sm text-slate-500">
            <AlertCircle size={16} />
            <span>Scores calculated based on clarity, accuracy, and depth.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JudgePanel;
