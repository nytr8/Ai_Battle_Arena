import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, GitBranch, X, Zap } from "lucide-react";
import PromptInput from "./components/PromptInput";
import SolutionCard from "./components/SolutionCard";
import JudgePanel from "./components/JudgePanel";

const STAGES = { IDLE: "idle", LOADING: "loading", BATTLE: "battle" };
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function App() {
  const [stage, setStage] = useState(STAGES.IDLE);
  const [battleData, setBattleData] = useState(null);
  const [showJudge, setShowJudge] = useState(false);
  const [error, setError] = useState("");

  const handleBattle = async (query) => {
    setStage(STAGES.LOADING);
    setShowJudge(false);
    setBattleData(null);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/invoke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      if (!data?.judge) {
        throw new Error("Invalid response from backend");
      }

      setBattleData(data);
      setStage(STAGES.BATTLE);
      setShowJudge(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not fetch battle results from backend";
      setError(message);
      setStage(STAGES.IDLE);
    }
  };

  const solutionOneScore = battleData?.judge?.solution_1_score ?? 0;
  const solutionTwoScore = battleData?.judge?.solution_2_score ?? 0;

  const winner = battleData
    ? solutionOneScore === solutionTwoScore
      ? "Tie"
      : solutionOneScore > solutionTwoScore
        ? "Model Alpha"
        : "Model Beta"
    : "";

  const judgeReason = battleData
    ? winner === "Model Alpha"
      ? battleData.judge.solution_1_reasoning
      : winner === "Model Beta"
        ? battleData.judge.solution_2_reasoning
        : `Model Alpha: ${battleData.judge.solution_1_reasoning} Model Beta: ${battleData.judge.solution_2_reasoning}`
    : "";

  const judgeStats = battleData?.judge
    ? [
        {
          label: "Model Alpha Score",
          value: Math.round((solutionOneScore / 10) * 100),
          color: "from-violet-500 to-violet-700",
        },
        {
          label: "Model Beta Score",
          value: Math.round((solutionTwoScore / 10) * 100),
          color: "from-pink-500 to-pink-700",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[120px]" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-violet-500 rounded-xl shadow-lg shadow-violet-500/30">
            <Swords size={20} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">
            AI<span className="gradient-text">Arena</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            2 Models Online
          </div>
          <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <GitBranch size={20} />
          </button>
          <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <X size={20} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center">
        <PromptInput
          onSubmit={handleBattle}
          isLoading={stage === STAGES.LOADING}
        />
        {error && (
          <p className="mt-4 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        <AnimatePresence>
          {stage === STAGES.LOADING && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16"
            >
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="glass rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-white/10 rounded" />
                      <div className="h-3 w-20 bg-white/5 rounded" />
                    </div>
                    <div className="h-8 w-16 bg-white/10 rounded-lg" />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-5/6 bg-white/5 rounded" />
                    <div className="h-4 w-4/6 bg-white/5 rounded" />
                    <div className="mt-6 h-32 bg-slate-950/50 rounded-xl border border-white/5" />
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-3/4 bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage === STAGES.BATTLE && battleData && (
            <motion.div
              key="battle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >
              <div className="flex items-center justify-center gap-6 mb-10">
                <div className="text-right">
                  <p className="text-lg font-bold text-violet-400">
                    Model Alpha
                  </p>
                  <p className="text-sm text-slate-500">Challenger 1</p>
                </div>
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl gradient-border bg-slate-950 shadow-2xl">
                  <Zap size={28} className="text-yellow-400" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-pink-400">Model Beta</p>
                  <p className="text-sm text-slate-500">Challenger 2</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SolutionCard
                  index={0}
                  name="Model Alpha"
                  content={battleData.solution_1}
                  score={battleData.judge.solution_1_score}
                  reasoning={battleData.judge.solution_1_reasoning}
                />
                <SolutionCard
                  index={1}
                  name="Model Beta"
                  content={battleData.solution_2}
                  score={battleData.judge.solution_2_score}
                  reasoning={battleData.judge.solution_2_reasoning}
                />
              </div>

              <AnimatePresence>
                {showJudge && (
                  <JudgePanel
                    winner={winner}
                    reason={judgeReason}
                    stats={judgeStats}
                  />
                )}
              </AnimatePresence>

              {showJudge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center mt-10"
                >
                  <button
                    onClick={() => {
                      setStage(STAGES.IDLE);
                      setBattleData(null);
                      setShowJudge(false);
                      setError("");
                    }}
                    className="px-8 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all font-semibold"
                  >
                    ↩ Start a New Battle
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {stage === STAGES.IDLE && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center "
          >
            <div className="inline-grid grid-cols-3 gap-4 mt-8 ">
              {[
                {
                  icon: "⚔️",
                  title: "Head to Head",
                  desc: "Two AIs, one question",
                },
                {
                  icon: "⚖️",
                  title: "Impartial Judge",
                  desc: "Scored by a third AI",
                },
                {
                  icon: "📊",
                  title: "Deep Reasoning",
                  desc: "Understand why one wins",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="p-5 glass rounded-2xl space-y-2 glass-hover"
                >
                  <span className="text-3xl">{icon}</span>
                  <p className="font-bold text-white">{title}</p>
                  <p className="text-sm text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/5 py-6 text-center text-slate-600 text-sm mt-16">
        Built with ⚡ · AI Battle Arena · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
