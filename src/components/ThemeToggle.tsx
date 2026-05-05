import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <motion.button
      id="theme-toggle"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setDarkMode(!darkMode)}
      className="p-3 rounded-2xl bg-surface border border-border card-shadow text-brand hover:border-brand/20 transition-all"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 fill-brand/10" />
      ) : (
        <Moon className="w-5 h-5 fill-brand/10" />
      )}
    </motion.button>
  );
}
