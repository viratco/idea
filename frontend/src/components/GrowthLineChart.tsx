
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', users: 100, revenue: 5000 },
  { month: 'Feb', users: 220, revenue: 11000 },
  { month: 'Mar', users: 380, revenue: 19000 },
  { month: 'Apr', users: 520, revenue: 26000 },
  { month: 'May', users: 700, revenue: 35000 },
  { month: 'Jun', users: 1050, revenue: 52500 },
  { month: 'Jul', users: 1500, revenue: 75000 },
  { month: 'Aug', users: 2250, revenue: 112500 },
  { month: 'Sep', users: 3300, revenue: 165000 },
  { month: 'Oct', users: 4900, revenue: 245000 },
  { month: 'Nov', users: 7100, revenue: 355000 },
  { month: 'Dec', users: 10000, revenue: 500000 },
];

interface GrowthLineChartProps {
  className?: string;
}

const GrowthLineChart: React.FC<GrowthLineChartProps> = ({ className }) => {
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div className={className}>
      <ChartContainer
        config={{
          users: {
            label: 'User Growth',
            color: '#10B981'
          },
          revenue: {
            label: 'Revenue ($)',
            color: '#8B5CF6'
          }
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              width={60}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  formatter={(value) => [formatYAxis(Number(value)), null]}
                />
              }
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default GrowthLineChart;