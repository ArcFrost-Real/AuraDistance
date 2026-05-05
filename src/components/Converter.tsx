import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRightLeft, Ruler } from 'lucide-react';
import { DISTANCE_UNITS } from '../constants';

export default function Converter() {
  const [fromValue, setFromValue] = useState<string>('1');
  const [fromUnitId, setFromUnitId] = useState<string>('m');
  const [toUnitId, setToUnitId] = useState<string>('ft');

  const fromUnit = useMemo(() => DISTANCE_UNITS.find(u => u.id === fromUnitId)!, [fromUnitId]);
  const toUnit = useMemo(() => DISTANCE_UNITS.find(u => u.id === toUnitId)!, [toUnitId]);

  const convertedValue = useMemo(() => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) return 0;
    
    // Step 1: Convert from source to meters
    const inMeters = val * fromUnit.factor;
    // Step 2: Convert from meters to target
    return inMeters / toUnit.factor;
  }, [fromValue, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-8" id="converter-main">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface p-8 rounded-[32px] border border-border card-shadow space-y-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand/5 rounded-2xl">
              <Ruler className="w-5 h-5 text-brand" />
            </div>
            <h2 className="text-lg font-medium tracking-tight">Distance Converter</h2>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.05em] text-brand/40 px-3 py-1 bg-brand/5 rounded-full">
            Real-time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,48px,1fr] items-center gap-4">
          {/* From Section */}
          <div className="space-y-3">
            <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand/40 ml-1">
              From
            </label>
            <div className="space-y-2">
              <input
                id="from-input"
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="w-full bg-surface-low border border-border rounded-2xl px-5 py-4 text-2xl font-light focus:outline-none focus:ring-1 focus:ring-brand/20 transition-all placeholder:text-brand/10"
                placeholder="0"
              />
              <select
                id="from-unit-select"
                value={fromUnitId}
                onChange={(e) => setFromUnitId(e.target.value)}
                className="w-full bg-surface-low border border-border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-brand/20 cursor-pointer appearance-none"
              >
                {DISTANCE_UNITS.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.label} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Trigger */}
          <div className="flex justify-center pt-6">
            <motion.button
              id="swap-units-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={swapUnits}
              className="p-3 rounded-full bg-brand text-surface hover:bg-brand/90 transition-colors shadow-lg shadow-brand/10"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </motion.button>
          </div>

          {/* To Section */}
          <div className="space-y-3">
            <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand/40 ml-1">
              To
            </label>
            <div className="space-y-2">
              <div className="w-full bg-surface-low border border-border rounded-2xl px-5 py-4 text-2xl font-light overflow-hidden whitespace-nowrap">
                {convertedValue.toLocaleString(undefined, { maximumFractionDigits: 5 })}
              </div>
              <select
                id="to-unit-select"
                value={toUnitId}
                onChange={(e) => setToUnitId(e.target.value)}
                className="w-full bg-surface-low border border-border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-brand/20 cursor-pointer appearance-none"
              >
                {DISTANCE_UNITS.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.label} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Result Formula / Details */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-3 px-6 text-brand/30"
      >
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-mono tracking-widest uppercase">
          1 {fromUnit.symbol} ≈ {(fromUnit.factor / toUnit.factor).toFixed(4)} {toUnit.symbol}
        </span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>
    </div>
  );
}
