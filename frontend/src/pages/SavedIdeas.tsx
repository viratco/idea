import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import IdeaCard from '@/components/IdeaCard';
import IdeaDetails from '@/components/IdeaDetails';
import { Button } from '@/components/ui/button';
import { BookOpen, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

// Sample saved ideas data
const savedIdeas = [
  {
    title: "Automated Marketing and Growth Platform for Startups",
    description: "A tool that automates marketing and growth efforts for startups using AI-driven strategies and tactics.",
    marketPotential: "High" as const,
    competitionLevel: "Medium" as const,
    skills: ["AI Development", "Marketing Strategy", "UX Design", "Growth Hacking"],
    industry: "SaaS",
    businessModel: "Subscription",
    initialInvestment: "$10K - $50K",
    savedDate: "October 24, 2023",
  },
  {
    title: "AI Personal Fitness Coach",
    description: "A smart fitness application that creates personalized workout and nutrition plans using AI.",
    marketPotential: "High" as const,
    competitionLevel: "High" as const,
    skills: ["AI Development", "Mobile Development", "Fitness Expertise", "UX Design"],
    industry: "Health",
    businessModel: "Freemium",
    initialInvestment: "$10K - $30K",
    savedDate: "October 20, 2023",
  },
  {
    title: "Sustainable Food Delivery Platform",
    description: "An eco-friendly food delivery service focusing on local, sustainable restaurants.",
    marketPotential: "Medium" as const,
    competitionLevel: "High" as const,
    skills: ["Logistics", "Mobile Development", "Marketing", "Sustainability"],
    industry: "Food",
    businessModel: "Marketplace",
    initialInvestment: "$50K - $100K",
    savedDate: "October 15, 2023",
  }
];

const SavedIdeas: React.FC = () => {
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(savedIdeas[0]);
  
  const handleExploreDetails = (idea: typeof savedIdeas[0]) => {
    setSelectedIdea(idea);
    setDetailsOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Saved Ideas</span>
            </div>
            <h1 className="text-3xl font-bold">Your Saved Business Ideas</h1>
            <p className="text-muted-foreground mt-2">
              Browse and manage all your saved business ideas
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search saved ideas..." 
                className="pl-9"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {savedIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedIdeas.map((idea, index) => (
              <div key={index} className="idea-card-container">
                <div className="absolute top-0 right-0 bg-secondary/80 text-xs px-2 py-1 rounded-bl-lg font-medium">
                  Saved on {idea.savedDate}
                </div>
                <IdeaCard 
                  {...idea} 
                  onExploreDetails={() => handleExploreDetails(idea)}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle className="mb-2 text-xl">No saved ideas yet</CardTitle>
              <CardDescription>
                You haven't saved any business ideas yet. Generate a new idea or browse existing ones to save them here.
              </CardDescription>
              <Button 
                className="mt-6" 
                onClick={() => navigate('/idea-generator')}
              >
                Generate New Idea
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      
      <IdeaDetails 
        idea={selectedIdea}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
};

export default SavedIdeas;
