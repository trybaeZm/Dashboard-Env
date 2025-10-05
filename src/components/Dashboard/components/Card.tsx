import { CardProps } from '@/types/cards'
import React from 'react'
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react'

export const Card: React.FC<CardProps> = ({ 
  title, 
  value, 
  description, 
  className = '',
  icon: Icon,
  trend,
  trendValue,
  loading = false
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    const iconProps = { className: "w-4 h-4" };
    
    switch (trend) {
      case 'up':
        return <TrendingUp {...iconProps} className="text-green-500" />;
      case 'down':
        return <TrendingDown {...iconProps} className="text-red-500" />;
      case 'neutral':
        return <Minus {...iconProps} className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      case 'neutral':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div
        className={`
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 
          border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md 
          transition-all duration-300 animate-pulse ${className}
        `}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div
      className={`
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 
        border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md 
        hover:border-gray-300/50 dark:hover:border-gray-600/50 
        transition-all duration-300 group cursor-pointer ${className}
      `}
    >
      {/* Header with Icon and Trend */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          {title}
        </h3>
        
        <div className="flex items-center gap-2">
          {trendValue && (
            <span className={`text-xs font-medium ${getTrendColor()}`}>
              {trendValue}
            </span>
          )}
          {getTrendIcon()}
          {Icon && (
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Main Value */}
      <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 dark:from-gray-100 dark:to-purple-400 bg-clip-text text-transparent mb-2">
        {value}
      </p>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      )}

      {/* Optional Progress Bar */}
      {trendValue && typeof trendValue === 'string' && trendValue.includes('%') && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`
                h-2 rounded-full transition-all duration-500 ease-out
                ${trend === 'up' ? 'bg-green-500' : 
                  trend === 'down' ? 'bg-red-500' : 
                  'bg-blue-500'}
              `}
              style={{ 
                width: trendValue 
              }}
            />
          </div>
        </div>
      )}

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};