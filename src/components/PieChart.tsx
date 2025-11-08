import { useEffect, useRef, useState } from 'react';

interface PieChartProps {
  distribution: Array<{
    label: string;
    percentage: number;
    color: string;
    value: string;
  }>;
}

export default function PieChart({ distribution }: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1500;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAnimationProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  const getColorClasses = (colorString: string) => {
    const colorMap: Record<string, string> = {
      'from-cyan-400 to-blue-500': '#06b6d4',
      'from-blue-400 to-indigo-500': '#60a5fa',
      'from-purple-400 to-pink-500': '#c084fc',
      'from-green-400 to-emerald-500': '#4ade80',
      'from-yellow-400 to-orange-500': '#facc15',
      'from-red-400 to-rose-500': '#f87171'
    };
    return colorMap[colorString] || '#06b6d4';
  };

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <svg className="w-full h-full" viewBox="0 0 200 200">
        <defs>
          {distribution.map((item, index) => (
            <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={getColorClasses(item.color)} stopOpacity="0.9" />
              <stop offset="100%" stopColor={getColorClasses(item.color)} stopOpacity="0.6" />
            </linearGradient>
          ))}
        </defs>

        {distribution.map((item, index) => {
          const prevPercentages = distribution.slice(0, index).reduce((sum, d) => sum + d.percentage, 0);
          const startAngle = (prevPercentages / 100) * 360 * animationProgress;
          const angle = (item.percentage / 100) * 360 * animationProgress;
          const isHovered = hoveredIndex === index;
          const radius = isHovered ? 85 : 80;

          if (angle === 0) return null;

          const startRad = (startAngle - 90) * (Math.PI / 180);
          const endRad = (startAngle + angle - 90) * (Math.PI / 180);

          const startX = 100 + radius * Math.cos(startRad);
          const startY = 100 + radius * Math.sin(startRad);
          const endX = 100 + radius * Math.cos(endRad);
          const endY = 100 + radius * Math.sin(endRad);

          const largeArc = angle > 180 ? 1 : 0;

          return (
            <g key={index}>
              <path
                d={`M 100 100 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} Z`}
                fill={`url(#gradient-${index})`}
                opacity={isHovered ? 1 : 0.85}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  filter: isHovered ? 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.6))' : 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              />
            </g>
          );
        })}

        <circle cx="100" cy="100" r="50" className="fill-slate-900" />

        <text
          x="100"
          y="92"
          textAnchor="middle"
          className="text-2xl font-bold fill-cyan-400"
          style={{ transition: 'all 0.3s ease' }}
        >
          COCOS
        </text>
        <text
          x="100"
          y="110"
          textAnchor="middle"
          className="text-xs fill-gray-400"
        >
          1B Total
        </text>

        {hoveredIndex !== null && (
          <text
            x="100"
            y="130"
            textAnchor="middle"
            className="text-sm font-semibold fill-cyan-300 animate-fadeIn"
          >
            {distribution[hoveredIndex].percentage}%
          </text>
        )}
      </svg>
    </div>
  );
}
