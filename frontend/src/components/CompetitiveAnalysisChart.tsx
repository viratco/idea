
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

// Data represents scores (0-100) for different aspects of the product vs competitors
const data = [
  { aspect: 'User Experience', us: 90, competitorA: 70, competitorB: 85, competitorC: 60 },
  { aspect: 'Features', us: 85, competitorA: 80, competitorB: 75, competitorC: 65 },
  { aspect: 'Performance', us: 95, competitorA: 65, competitorB: 80, competitorC: 70 },
  { aspect: 'Security', us: 90, competitorA: 75, competitorB: 85, competitorC: 80 },
  { aspect: 'Integration', us: 80, competitorA: 60, competitorB: 70, competitorC: 85 },
  { aspect: 'Pricing', us: 75, competitorA: 60, competitorB: 65, competitorC: 90 },
];

interface CompetitiveAnalysisChartProps {
  className?: string;
}

const CompetitiveAnalysisChart: React.FC<CompetitiveAnalysisChartProps> = ({ className }) => {
  return (
    <div className={className}>
      <ChartContainer
        config={{
          us: {
            label: 'Our Solution',
            color: '#8B5CF6'
          },
          competitorA: {
            label: 'Competitor A',
            color: '#EC4899'
          },
          competitorB: {
            label: 'Competitor B',
            color: '#F59E0B'
          },
          competitorC: {
            label: 'Competitor C',
            color: '#10B981'
          }
        }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis 
              dataKey="aspect" 
              tick={{ fill: '#64748B', fontSize: 12 }}
              tickLine={{ stroke: '#E2E8F0' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }}
              tickCount={5}
              stroke="#E2E8F0"
            />
            
            <Radar name="Our Solution" dataKey="us" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.5} />
            <Radar name="Competitor A" dataKey="competitorA" stroke="#EC4899" fill="#EC4899" fillOpacity={0.3} />
            <Radar name="Competitor B" dataKey="competitorB" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
            <Radar name="Competitor C" dataKey="competitorC" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  formatter={(value) => [`${value}/100`, null]}
                />
              }
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default CompetitiveAnalysisChart;