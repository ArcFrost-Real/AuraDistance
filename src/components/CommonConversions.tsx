import { motion } from 'motion/react';
import { Info, ExternalLink } from 'lucide-react';
import { COMMON_CONVERSIONS, DISTANCE_UNITS } from '../constants';

export default function CommonConversions() {
  const convertValue = (val: number, from: string, to: string) => {
    const fromUnit = DISTANCE_UNITS.find(u => u.id === from)!;
    const toUnit = DISTANCE_UNITS.find(u => u.id === to)!;
    return (val * fromUnit.factor) / toUnit.factor;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pt-12" id="common-conversions-section">
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 bg-brand/5 rounded-xl">
          <Info className="w-4 h-4 text-brand/60" />
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Quick Glance</h3>
          <p className="text-[11px] text-brand/40 uppercase tracking-widest font-medium">Standard Distances</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMMON_CONVERSIONS.map((item, idx) => {
          const resultValue = convertValue(item.value, item.fromUnit, item.toUnit);
          const fromSymbol = DISTANCE_UNITS.find(u => u.id === item.fromUnit)?.symbol;
          const toSymbol = DISTANCE_UNITS.find(u => u.id === item.toUnit)?.symbol;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="group p-5 bg-surface border border-border rounded-2xl card-shadow hover:border-brand/20 transition-all cursor-default"
            >
              <div className="flex flex-col h-full gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-brand/80 group-hover:text-brand transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] leading-relaxed text-brand/40 group-hover:text-brand/60 transition-colors">
                    {item.description}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-mono font-medium">
                      {item.value}
                    </span>
                    <span className="text-[10px] font-mono text-brand/30">
                      {fromSymbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-px w-3 bg-brand/10" />
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-mono font-bold text-brand">
                        {resultValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] font-mono text-brand/40">
                        {toSymbol}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
