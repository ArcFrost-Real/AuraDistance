import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRightLeft, Ruler, Scale, Thermometer, Maximize, Box } from 'lucide-react';
import { ALL_UNITS, UnitCategory } from '../constants';

const categoryIcons = {
  [UnitCategory.DISTANCE]: Ruler,
  [UnitCategory.WEIGHT]: Scale,
  [UnitCategory.TEMPERATURE]: Thermometer,
  [UnitCategory.AREA]: Maximize,
  [UnitCategory.VOLUME]: Box,
};

export default function Converter() {
  const [activeCategory, setActiveCategory] = useState<UnitCategory>(UnitCategory.DISTANCE);
  const [fromValue, setFromValue] = useState<string>('1');
  
  // Filter units by active category
  const categoryUnits = useMemo(() => 
    ALL_UNITS.filter(u => u.category === activeCategory), 
  [activeCategory]);

  // Default units for category
  const [fromUnitId, setFromUnitId] = useState<string>(categoryUnits[0].id);
  const [toUnitId, setToUnitId] = useState<string>(categoryUnits[1]?.id || categoryUnits[0].id);

  // Sync unit IDs when category changes
  useMemo(() => {
    const units = ALL_UNITS.filter(u => u.category === activeCategory);
    setFromUnitId(units[0].id);
    setToUnitId(units[1]?.id || units[0].id);
  }, [activeCategory]);

  const fromUnit = useMemo(() => ALL_UNITS.find(u => u.id === fromUnitId)!, [fromUnitId]);
  const toUnit = useMemo(() => ALL_UNITS.find(u => u.id === toUnitId)!, [toUnitId]);

  const convertedValue = useMemo(() => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) return 0;
    
    if (activeCategory === UnitCategory.TEMPERATURE) {
      // Temperature conversion: (Val + Offset1) * Factor1 = Kelvin
      // Kelvin / Factor2 - Offset2 = Target
      const inKelvin = (val + (fromUnit.offset || 0)) * fromUnit.factor;
      return (inKelvin / toUnit.factor) - (toUnit.offset || 0);
    }

    const inBase = val * fromUnit.factor;
    return inBase / toUnit.factor;
  }, [fromValue, fromUnit, toUnit, activeCategory]);

  const swapUnits = () => {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8" id="converter-main">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-surface rounded-[24px] border border-border card-shadow">
        {(Object.values(UnitCategory) as UnitCategory[]).map((cat) => {
          const Icon = categoryIcons[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all
                ${activeCategory === cat 
                  ? 'bg-brand text-surface shadow-md shadow-brand/10' 
                  : 'text-brand/40 hover:text-brand hover:bg-brand/5'}
              `}
            >
              <Icon className="w-4 h-4" />
              {cat}
            </button>
          );
        })}
      </div>

      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface p-8 md:p-10 rounded-[40px] border border-border card-shadow space-y-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand/5 rounded-2xl">
              {(() => {
                const Icon = categoryIcons[activeCategory];
                return <Icon className="w-6 h-6 text-brand" />;
              })()}
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{activeCategory}</h2>
              <p className="text-[11px] font-medium text-brand/30 uppercase tracking-widest">Precision Tool</p>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-brand/40 px-3 py-1.5 bg-brand/5 rounded-full">
            Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,48px,1fr] items-center gap-6">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand/30 ml-1">
              Initial Value
            </label>
            <div className="space-y-3">
              <input
                id="from-input"
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="w-full bg-surface-low border border-border rounded-3xl px-6 py-5 text-3xl font-light focus:outline-none focus:ring-2 focus:ring-brand/5 transition-all placeholder:text-brand/10 appearance-none"
                placeholder="0"
              />
              <select
                id="from-unit-select"
                value={fromUnitId}
                onChange={(e) => setFromUnitId(e.target.value)}
                className="w-full bg-surface-low border border-border rounded-2xl px-5 py-3.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand/5 cursor-pointer appearance-none"
              >
                {categoryUnits.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.label} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center md:pt-14">
            <motion.button
              id="swap-units-btn"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={swapUnits}
              className="p-3.5 rounded-full bg-brand text-surface hover:bg-brand/90 transition-colors shadow-xl shadow-brand/20"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand/30 ml-1">
              Result
            </label>
            <div className="space-y-3">
              <div className="w-full bg-surface-low border border-border rounded-3xl px-6 py-5 text-3xl font-light overflow-hidden whitespace-nowrap text-brand/80">
                {convertedValue.toLocaleString(undefined, { 
                  maximumFractionDigits: activeCategory === UnitCategory.TEMPERATURE ? 2 : 5 
                })}
              </div>
              <select
                id="to-unit-select"
                value={toUnitId}
                onChange={(e) => setToUnitId(e.target.value)}
                className="w-full bg-surface-low border border-border rounded-2xl px-5 py-3.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand/5 cursor-pointer appearance-none"
              >
                {categoryUnits.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.label} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        key={activeCategory + fromUnitId + toUnitId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center gap-4 px-8 text-brand/20"
      >
        <div className="h-px flex-1 bg-border" />
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase">
          {fromUnit.symbol} to {toUnit.symbol} Formula Integrated
        </span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>
    </div>
  );
}
