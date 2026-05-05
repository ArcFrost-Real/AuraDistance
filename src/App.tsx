/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import Converter from './components/Converter';
import CommonConversions from './components/CommonConversions';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('aura-theme');
    return saved === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('aura-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('aura-theme', 'light');
    }
  }, [darkMode]);

  return (
    <main className="min-h-screen py-12 px-6 md:py-24" id="aura-distance-app">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center space-y-6">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block"
            >
              <span className="px-3 py-1 bg-brand text-surface text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                Utility / Dist
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-light tracking-tight text-brand"
            >
              Aura <span className="font-semibold text-brand/30">Distance</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-brand/40 max-w-sm mx-auto font-medium"
            >
              Precision conversion between scientific and everyday measurement systems.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </motion.div>
        </header>

        {/* Core Tools */}
        <section className="space-y-24">
          <Converter />
          <CommonConversions />
        </section>

        {/* Minimal Footer */}
        <footer className="pt-24 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand/20 animate-pulse" />
            <p className="text-[10px] font-mono tracking-widest uppercase text-brand/30">
              Live Calculation Engine v1.0
            </p>
          </div>
          <nav className="flex gap-8">
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand/20 hover:text-brand/40 transition-colors cursor-default">
              Metric
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand/20 hover:text-brand/40 transition-colors cursor-default">
              Imperial
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand/20 hover:text-brand/40 transition-colors cursor-default">
              Nautical
            </span>
          </nav>
        </footer>
      </div>
    </main>
  );
}
