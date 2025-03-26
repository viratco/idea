import React from 'react';
import { ArrowRight, TrendingUp, Users, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Sample data structure for an idea
interface IdeaProps {
  title: string;
  description: string;
  marketPotential: 'Low' | 'Medium' | 'High';
  competitionLevel: 'Low' | 'Medium' | 'High';
  skills: string[];
  industry: string;
  businessModel: string;
  initialInvestment: string;
  onExploreDetails?: () => void;
}

const IdeaCard: React.FC<IdeaProps> = ({
  title,
  description,
  marketPotential,
  competitionLevel,
  skills,
  industry,
  businessModel,
  initialInvestment,
  onExploreDetails,
}) => {
  const getMarketColor = () => {
    if (marketPotential === 'High') return 'bg-green-100 text-green-800';
    if (marketPotential === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getCompetitionColor = () => {
    if (competitionLevel === 'Low') return 'bg-green-100 text-green-800';
    if (competitionLevel === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getInvestmentColor = () => {
    const amount = initialInvestment.replace(/[^0-9]/g, '');
    const firstNumber = parseInt(amount.split('-')[0]);
    if (firstNumber <= 50) return 'bg-green-100 text-green-800';
    if (firstNumber <= 200) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="overflow-hidden card-hover animate-scale-in border-0 glass-card">
      <CardHeader className="pb-3 pt-6 px-6 bg-primary/5">
        <div className="flex items-start justify-between">
          <div className="bg-primary/10 p-2 rounded-lg mb-3">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <Badge variant="outline" className="text-xs font-medium">
            {industry}
          </Badge>
        </div>
        <h3 className="text-2xl font-extrabold leading-tight mb-2">{title}</h3>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Market:</span>
            <Badge variant="secondary" className={`text-xs ${getMarketColor()}`}>
              {marketPotential}
            </Badge>
          </div>
          
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Competition:</span>
            <Badge variant="secondary" className={`text-xs ${getCompetitionColor()}`}>
              {competitionLevel}
            </Badge>
          </div>
          
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Model:</span>
            <span className="text-sm">{businessModel}</span>
          </div>
          
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Investment:</span>
            <Badge variant="secondary" className={`text-xs ${getInvestmentColor()}`}>
              {initialInvestment}
            </Badge>
          </div>
        </div>
        
        <div className="mb-2">
          <p className="text-sm font-medium mb-2">Required Skills:</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-secondary/50">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-secondary/30 flex justify-between">
        <Button variant="ghost" size="sm">
          Save Idea
        </Button>
        <Button 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onExploreDetails}
        >
          Explore Details <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IdeaCard;
