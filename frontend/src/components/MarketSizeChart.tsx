
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { year: '2023', totalMarket: 5000000, targetSegment: 1000000, ourShare: 50000 },
  { year: '2024', totalMarket: 6500000, targetSegment: 1500000, ourShare: 300000 },
  { year: '2025', totalMarket: 8000000, targetSegment: 2000000, ourShare: 800000 },
  { year: '2026', totalMarket: 10000000, targetSegment: 3000000, ourShare: 1500000 },
  { year: '2027', totalMarket: 12000000, targetSegment: 4000000, ourShare: 2400000 },
];

interface MarketSizeChartProps {
  className?: string;
}

const MarketSizeChart: React.FC<MarketSizeChartProps> = ({ className }) => {
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className={className}>
      <ChartContainer
        config={{
          totalMarket: {
            label: 'Total Market',
            color: '#94A3B8'
          },
          targetSegment: {
            label: 'Target Segment',
            color: '#F59E0B'
          },
          ourShare: {
            label: 'Our Share',
            color: '#8B5CF6'
          }
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="year"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              width={80}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  formatter={(value) => [formatYAxis(Number(value)), null]}
                />
              }
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="totalMarket" 
              stackId="1" 
              stroke="#94A3B8" 
              fill="#94A3B8" 
              fillOpacity={0.2}
            />
            <Area 
              type="monotone" 
              dataKey="targetSegment" 
              stackId="2" 
              stroke="#F59E0B" 
              fill="#F59E0B" 
              fillOpacity={0.4}
            />
            <Area 
              type="monotone" 
              dataKey="ourShare" 
              stackId="3" 
              stroke="#8B5CF6" 
              fill="#8B5CF6" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default MarketSizeChart;