import React, { useState, useEffect, useCallback } from 'react';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  FileText,
  CircleDollarSign, 
  Target, 
  Lightbulb, 
  Users, 
  LineChart, 
  BarChart3, 
  ShieldCheck, 
  BarChart, 
  PieChart, 
  RefreshCw, 
  Map,
  Download,
  Share2,
  Printer,
  CheckCircle2,
  Circle
} from 'lucide-react';
// TODO: Import RevenueProjectionsChart once component is created
const RevenueProjectionsChart = () => {
  return <div>Revenue Projections Chart Component</div>;
};
import MarketShareDonutChart from '../components/MarketShareDonutChart';
import GrowthLineChart from '../components/GrowthLineChart';
import MarketSizeChart from '../components/MarketSizeChart';
import CompetitiveAnalysisChart from '../components/CompetitiveAnalysisChart';
// TODO: Import RoadmapTimelineChart once component is created
const RoadmapTimelineChart = () => {
  return <div>Roadmap Timeline Chart Component</div>;
};
import ExecutiveSummaryMetrics from '../components/ExecutiveSummaryMetrics';
import { useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface IdeaData {
  title: string;
  ideaFitness: string;
  skills: string[];
  industry: string;
}

interface LocationState {
  idea: IdeaData;
}

export default function BusinessPlanPage() {
  const [activeSection, setActiveSection] = useState<string>('executive-summary');
  const [loading, setLoading] = useState(false);
  const [introduction, setIntroduction] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

  const location = useLocation();
  const ideaData = (location.state as LocationState)?.idea;

  const generateIntroduction = useCallback(async () => {
    if (!ideaData?.title || !ideaData?.ideaFitness) {
      toast.error('Idea title and fitness assessment are required');
      return;
    }
    
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000);

      const response = await fetch('http://localhost:3001/api/business-plan/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: ideaData.title,
          ideaFitness: ideaData.ideaFitness
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to generate introduction');
      }

      let data;
      try {
        data = await response.json();
        if (!data.introduction) {
          throw new Error('No introduction was generated');
        }
      } catch (parseError) {
        throw new Error('Invalid response from server');
      }
      
      setIntroduction(data.introduction);
      setRetryCount(0);
      toast.success('Introduction generated successfully!');
    } catch (error: any) {
      console.error('Error generating introduction:', error);
      
      if (error.name === 'AbortError') {
        if (retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          toast.error(`Generation taking longer than expected. Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
          // Wait a bit longer between retries
          setTimeout(() => generateIntroduction(), 5000);
          return;
        } else {
          toast.error('Generation timed out. The model might be busy, please try again in a moment.');
        }
      } else {
        toast.error(error.message || 'Failed to generate introduction');
      }
    } finally {
      setLoading(false);
    }
  }, [ideaData, retryCount]);

  useEffect(() => {
    if (ideaData) {
      generateIntroduction();
    }
  }, [ideaData, generateIntroduction]);

  const sidebar = [
    { id: 'executive-summary', label: 'Executive Summary', icon: <FileText className="h-4 w-4" /> },
    { id: 'problem-statement', label: 'Problem Statement', icon: <Target className="h-4 w-4" /> },
    { id: 'solution', label: 'Solution', icon: <Lightbulb className="h-4 w-4" /> },
    { id: 'business-model', label: 'Business Model', icon: <CircleDollarSign className="h-4 w-4" /> },
    { id: 'target-market', label: 'Target Market', icon: <Users className="h-4 w-4" /> },
    { id: 'competitor-analysis', label: 'Competitor Analysis', icon: <BarChart className="h-4 w-4" /> },
    { id: 'marketing-strategy', label: 'Marketing Strategy', icon: <PieChart className="h-4 w-4" /> },
    { id: 'technology-plan', label: 'Technology Plan', icon: <ShieldCheck className="h-4 w-4" /> },
    { id: 'revenue-projections', label: 'Revenue Projections', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'challenges', label: 'Challenges & Risks', icon: <RefreshCw className="h-4 w-4" /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map className="h-4 w-4" /> },
  ];

  // Helper function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 border-r p-6 bg-card">
        <div className="flex items-center mb-8">
          <FileText className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-xl font-bold">Business Plan</h2>
        </div>
        
        <div className="mx-2 mb-6">
          <Progress value={100} className="h-2 w-full" />
          <p className="text-xs text-muted-foreground mt-2">100% Complete</p>
        </div>
        
        <ScrollArea className="flex-1">
          <nav className="space-y-1 pr-4">
            {sidebar.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start ${activeSection === item.id ? 'bg-secondary font-medium' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Button>
            ))}
          </nav>
        </ScrollArea>
        
        <div className="mt-6 space-y-3">
          <Button variant="outline" className="w-full gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full">
          <div className="max-w-4xl mx-auto px-4 py-8 md:px-8 md:py-12">
            {/* Executive Summary */}
            <section id="executive-summary" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Executive Summary</h2>
              <div className="space-y-8">
                <Card className="border-none shadow-sm bg-primary/5">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">{ideaData?.title || 'Business Plan Title'}</h3>
                    
                    {loading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-3 text-muted-foreground">Generating introduction...</span>
                      </div>
                    ) : (
                      <>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                            {introduction || 'Generating introduction...'}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {ideaData?.skills?.map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                              {skill}
                            </Badge>
                          ))}
                          <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                            {ideaData?.industry || 'Industry'}
                          </Badge>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
                
                <ExecutiveSummaryMetrics 
                  ideaTitle={ideaData?.title || ''}
                  ideaFitness={ideaData?.ideaFitness || ''}
                />
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Investment Opportunity</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    We're seeking $850,000 in seed funding to accelerate product development, expand our AI capabilities, and grow our customer base to 10,000 startups within 18 months. Investors will receive 15% equity with projected returns of 12x within 5 years based on our current growth trajectory and market expansion plans.
                  </p>
                </div>
              </div>
            </section>
            
            <Separator className="my-16" />
            
            {/* Problem Statement */}
            <section id="problem-statement" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Problem Statement & Market Opportunity</h2>
              
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>The Problem</CardTitle>
                    <CardDescription>What startups are struggling with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span>Early-stage companies struggle with limited marketing resources and expertise</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span>Existing marketing tools are fragmented, expensive, and not optimized for startups</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span>Founders waste 15+ hours weekly managing marketing tasks</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span>Customer acquisition costs are unsustainable for early-stage companies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>The Opportunity</CardTitle>
                    <CardDescription>Market validation points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex gap-2">
                        <span className="text-green-500 font-bold">•</span>
                        <span>Global marketing automation market valued at $12.4B with 15% YoY growth</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500 font-bold">•</span>
                        <span>2.1M new tech startups founded annually seeking affordable marketing solutions</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500 font-bold">•</span>
                        <span>87% of startups report marketing as their biggest operational challenge</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500 font-bold">•</span>
                        <span>AI in marketing growing at 29% CAGR, reaching $40B by 2025</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <MarketSizeChart className="mt-8" />
              
              <div className="bg-secondary/30 p-6 rounded-lg mt-8">
                <h3 className="font-semibold mb-2">Customer Validation</h3>
                <p className="text-muted-foreground mb-4">
                  Our preliminary market research included interviews with 150+ startup founders across SaaS, fintech, and e-commerce sectors. 92% expressed strong interest in an AI-powered marketing suite specifically designed for startups, with 74% willing to pay $99-299 monthly for such a solution.
                </p>
              </div>
            </section>
            
            <Separator className="my-16" />
            
            {/* Solution */}
            <section id="solution" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Solution / Product Offering</h2>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">AI Campaign Manager</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Automatically creates, schedules, and optimizes marketing campaigns across email, social, and ads
                    </p>
                    <div className="flex mt-4">
                      <Badge variant="outline" className="bg-white/50">Core Feature</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Growth Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Real-time insights on campaign performance with AI-powered recommendations for improvement
                    </p>
                    <div className="flex mt-4">
                      <Badge variant="outline" className="bg-white/50">Core Feature</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Content Generator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Creates marketing copy, designs, and assets specifically tailored to startup audiences
                    </p>
                    <div className="flex mt-4">
                      <Badge variant="outline" className="bg-white/50">Core Feature</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Unique Selling Proposition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <Lightbulb className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">Startup-Focused Intelligence</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Unlike general marketing tools, our AI is trained specifically on successful startup campaigns.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <Target className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">Unified Platform</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Single solution replacing 5-7 separate marketing tools, reducing costs by 60% on average.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <CircleDollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">Growth-Based Pricing</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Flexible pricing that scales with startup growth, starting at just $99/month.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div className="flex gap-3">
                        <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 font-medium">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Connect & Configure</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Link marketing channels and set business goals in 10 minutes
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 font-medium">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">AI Analysis</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Our AI analyzes your audience and industry to create optimized campaigns
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 font-medium">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Automation & Optimization</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Campaigns run automatically with continuous AI-driven performance updates
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 font-medium">4</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Growth Analytics</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Monitor results and scale marketing efforts based on AI recommendations
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-secondary/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Development Status</h3>
                <p className="text-muted-foreground mb-4">
                  MVP completed with core AI marketing automation features. Alpha testing with 25 startups shows average 40% reduction in marketing workload and 28% improvement in campaign performance.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">MVP Complete</Badge>
                  <Badge variant="outline">Alpha Testing Done</Badge>
                  <Badge variant="outline">Beta Launch in 4 Weeks</Badge>
                </div>
              </div>
            </section>
            
            <Separator className="my-16" />
            
            {/* Business Model */}
            <section id="business-model" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Business Model & Monetization</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Startup Plan</CardTitle>
                    <CardDescription>$99/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Basic AI campaign automation</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">10 marketing campaigns/month</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Email + 2 social channels</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Basic analytics</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-primary">
                  <CardHeader>
                    <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <CardTitle>Growth Plan</CardTitle>
                      <Badge>Most Popular</Badge>
                    </div>
                    <CardDescription>$249/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Advanced AI campaign optimization</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">50 marketing campaigns/month</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Email + all social channels + ads</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Advanced analytics + recommendations</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">AI content generation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                      <LineChart className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Scale Plan</CardTitle>
                    <CardDescription>$499/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Enterprise-grade AI optimization</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Unlimited marketing campaigns</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">All channels + premium integrations</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Advanced analytics + custom reports</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Priority AI content generation</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm">Dedicated account manager</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Acquisition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-1 mt-1">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium">Startup Ecosystem Partnerships</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Integration with accelerators, incubators, and funding platforms (projected 45% of users)
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-1 mt-1">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium">Content Marketing & SEO</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Targeting startup marketing pain points (projected 30% of users)
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-1 mt-1">
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium">Freemium Strategy</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Basic tools free for early-stage startups with 18% conversion to paid plans
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <LineChart className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">Continuous AI Improvement</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Self-learning algorithms improve marketing results over time
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">Growth-Aligned Pricing</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Plans that scale with client success to maintain high LTV/CAC ratio (target 4:1)
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <Target className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">Data Network Effects</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Platform becomes more valuable as user base grows through anonymized data insights
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Key Growth Metrics</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Customer LTV</p>
                    <p className="text-2xl font-bold">$4,200</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">CAC</p>
                    <p className="text-2xl font-bold">$850</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Churn Rate</p>
                    <p className="text-2xl font-bold">5.2%</p>
                  </div>
                </div>
              </div>
            </section>
            
            <Separator className="my-16" />
            
            {/* Target Market */}
            <section id="target-market" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Target Market & Customer Segments</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Primary Customer Segments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold">Early-Stage SaaS Startups</h4>
                          <Badge variant="outline">50%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Pre-seed to Series A SaaS companies with limited marketing budgets but needing rapid user acquisition.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary" className="bg-secondary">Product-led growth</Badge>
                          <Badge variant="secondary" className="bg-secondary">5-50 employees</Badge>
                          <Badge variant="secondary" className="bg-secondary">$10K-50K monthly marketing budget</Badge>
                        </div>
                      </div>
                      
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold">Digital-First D2C Brands</h4>
                          <Badge variant="outline">30%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Direct-to-consumer brands needing effective social and email marketing automation to drive sales.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary" className="bg-secondary">E-commerce focused</Badge>
                          <Badge variant="secondary" className="bg-secondary">1-25 employees</Badge>
                          <Badge variant="secondary" className="bg-secondary">$5K-30K monthly marketing budget</Badge>
                        </div>
                      </div>
                      
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold">Tech-Enabled Service Startups</h4>
                          <Badge variant="outline">20%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Service businesses using technology to scale but lacking marketing infrastructure.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary" className="bg-secondary">Hybrid business model</Badge>
                          <Badge variant="secondary" className="bg-secondary">10-100 employees</Badge>
                          <Badge variant="secondary" className="bg-secondary">$15K-75K monthly marketing budget</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Market Size & Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Total Addressable Market (TAM)</p>
                          <p className="text-3xl font-bold text-primary">$12.4B</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Global marketing automation market for SMBs and startups
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium">Serviceable Available Market (SAM)</p>
                          <p className="text-3xl font-bold text-primary">$4.2B</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Early-stage startups and D2C brands in North America and Europe
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium">Serviceable Obtainable Market (SOM)</p>
                          <p className="text-3xl font-bold text-primary">$420M</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Target of 10% market share within 5 years of launch
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Customer Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="font-medium">Pain Points</p>
                        <p className="text-sm text-muted-foreground">
                          • 78% struggle with marketing channel fragmentation<br />
                          • 65% lack specialized marketing expertise<br />
                          • 91% are concerned about optimizing marketing ROI
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Buying Triggers</p>
                        <p className="text-sm text-muted-foreground">
                          • Fundraising rounds (leading to marketing budget increases)<br />
                          • Team scaling challenges (when hiring specialized marketers becomes necessary)<br />
                          • Growth plateaus (when organic acquisition slows)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <GrowthLineChart className="mt-8" />
            </section>
            
            <Separator className="my-16" />
            
            {/* Competitor Analysis */}
            <section id="competitor-analysis" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Competitor Analysis</h2>
              
              <div className="mb-8">
                <CompetitiveAnalysisChart />
              </div>
              
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-3 text-left font-medium text-muted-foreground">Feature</th>
                      <th className="p-3 text-left font-medium text-muted-foreground">Our Solution</th>
                      <th className="p-3 text-left font-medium text-muted-foreground">Competitor A</th>
                      <th className="p-3 text-left font-medium text-muted-foreground">Competitor B</th>
                      <th className="p-3 text-left font-medium text-muted-foreground">Competitor C</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3 font-medium">AI-Powered Automation</td>
                      <td className="p-3 text-green-600">Advanced</td>
                      <td className="p-3 text-amber-600">Basic</td>
                      <td className="p-3 text-amber-600">Basic</td>
                      <td className="p-3 text-red-500">Limited</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Startup-Specific Features</td>
                      <td className="p-3 text-green-600">Comprehensive</td>
                      <td className="p-3 text-red-500">None</td>
                      <td className="p-3 text-amber-600">Limited</td>
                      <td className="p-3 text-red-500">None</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Pricing Model</td>
                      <td className="p-3 text-green-600">Growth-based</td>
                      <td className="p-3 text-red-500">Enterprise</td>
                      <td className="p-3 text-amber-600">Fixed</td>
                      <td className="p-3 text-amber-600">Usage-based</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Starting Price</td>
                      <td className="p-3 text-green-600">$99/mo</td>
                      <td className="p-3 text-red-500">$499/mo</td>
                      <td className="p-3 text-amber-600">$199/mo</td>
                      <td className="p-3 text-green-600">$49/mo*</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Self-Service Setup</td>
                      <td className="p-3 text-green-600">10 min</td>
                      <td className="p-3 text-red-500">3-5 days</td>
                      <td className="p-3 text-amber-600">1-2 hours</td>
                      <td className="p-3 text-amber-600">1 hour</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Multi-Channel Support</td>
                      <td className="p-3 text-green-600">All-in-one</td>
                      <td className="p-3 text-amber-600">Partial</td>
                      <td className="p-3 text-green-600">All-in-one</td>
                      <td className="p-3 text-red-500">Email only</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground mt-2">*Limited to 1,000 contacts with significant feature restrictions</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Competitive Advantages</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Only platform trained specifically on startup marketing data and patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Price point 60-80% lower than enterprise solutions with comparable capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Unique AI content generator trained on high-converting startup messaging</span>
                  </li>
                </ul>
              </div>
            </section>
            
            <Separator className="my-16" />
            
            {/* Marketing Strategy */}
            <section id="marketing-strategy" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Marketing & Go-to-Market Strategy</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Acquisition Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-1 mt-1">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium">Phase 1: Strategic Partnerships</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Partner with 25 top startup accelerators and incubators to offer platform access to their portfolio companies.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-1 mt-1">
                          <Lightbulb className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium">Phase 2: Content Marketing & SEO</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Produce startup marketing guides, case studies, and data reports to establish thought leadership and drive organic traffic.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-1 mt-1">
                          <Target className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium">Phase 3: Community & Virality</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Build a startup marketer community with free tools, templates, and peer learning to drive word-of-mouth growth.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <h4 className="font-medium">Startup Ecosystem Partnerships</h4>
                          <Badge variant="outline">45%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <h4 className="font-medium">Content & SEO</h4>
                          <Badge variant="outline">30%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <h4 className="font-medium">Community & Word-of-Mouth</h4>
                          <Badge variant="outline">15%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <h4 className="font-medium">Targeted Advertising</h4>
                          <Badge variant="outline">10%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-8">
                <MarketShareDonutChart />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Key Performance Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center">
                        <span className="text-sm">Customer Acquisition Cost</span>
                        <span className="font-medium">$850</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-sm">Monthly Active Users (Y1)</span>
                        <span className="font-medium">2,500</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-sm">Conversion Rate (Free to Paid)</span>
                        <span className="font-medium">18%</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-sm">Monthly Recurring Revenue (Y1)</span>
                        <span className="font-medium">$500K</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Launch Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Alpha Release - Completed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Beta Program - Completed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Circle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm">Public Launch - 4 weeks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Circle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Integration Marketplace - Q3</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Growth Targets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium">Y1</span>
                        </div>
                        <span className="text-sm">2,500 paying customers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium">Y2</span>
                        </div>
                        <span className="text-sm">7,500 paying customers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium">Y3</span>
                        </div>
                        <span className="text-sm">15,000 paying customers</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <Separator className="my-16" />
            
            {/* Technology */}
            <section id="technology-plan" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Technology Plan</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Core Technology Stack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-1 mt-1">
                          <ShieldCheck className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium">AI & Machine Learning</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            TensorFlow and PyTorch for predictive analytics and natural language processing
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-1 mt-1">
                          <ShieldCheck className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium">Backend Infrastructure</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Microservices architecture using Node.js and Python, deployed on AWS
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-1 mt-1">
                          <ShieldCheck className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium">Frontend Framework</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            React with TypeScript for robust, type-safe UI development
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-1 mt-1">
                          <ShieldCheck className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium">Data Processing</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Apache Kafka for real-time data streaming and processing
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-4">
                        Our platform offers robust API-based integrations with popular tools in the startup ecosystem, allowing seamless data flow and automation.
                      </p>
                      
                      <h4 className="font-medium mb-3">Key Integration Categories:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="border border-border rounded-md p-2 text-center text-sm">
                          CRM Systems
                        </div>
                        <div className="border border-border rounded-md p-2 text-center text-sm">
                          Email Marketing
                        </div>
                        <div className="border border-border rounded-md p-2 text-center text-sm">
                          Social Media
                        </div>
                        <div className="border border-border rounded-md p-2 text-center text-sm">
                          Analytics
                        </div>
                        <div className="border border-border rounded-md p-2 text-center text-sm">
                          Payment Gateways
                        </div>
                        <div className="border border-border rounded-md p-2 text-center text-sm">
                          E-commerce Platforms
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Data Security & Compliance</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm">SOC 2 Type II compliance</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm">GDPR and CCPA compliant data handling</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm">End-to-end encryption for all data</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Regular penetration testing and security audits</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Development Roadmap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RoadmapTimelineChart />
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-muted/20 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Technology Differentiators</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Proprietary AI Models</h4>
                    <p className="text-sm text-muted-foreground">
                      Our AI engine has been trained on over 5 million successful startup marketing campaigns, creating highly specialized algorithms that understand the unique challenges of early-stage companies.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Adaptive Learning System</h4>
                    <p className="text-sm text-muted-foreground">
                      Unlike static marketing tools, our platform continuously improves through machine learning, analyzing performance data across all users to optimize campaigns in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <Separator className="my-16" />
            
            {/* Revenue Projections */}
            <section id="revenue-projections" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Revenue Projections</h2>
              
              <div className="mb-8">
                <RevenueProjectionsChart />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Year 1</CardTitle>
                    <CardDescription>First 12 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div>
                        <p className="text-3xl font-bold text-primary">$6M</p>
                        <p className="text-sm text-muted-foreground">Annual Recurring Revenue</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Startup Plan</span>
                          <span className="text-sm">35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Growth Plan</span>
                          <span className="text-sm">50%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Scale Plan</span>
                          <span className="text-sm">15%</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Customers</span>
                          <span className="text-sm font-medium">2,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Avg. Revenue Per User</span>
                          <span className="text-sm font-medium">$200/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Churn Rate</span>
                          <span className="text-sm font-medium">5.2%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Year 2</CardTitle>
                    <CardDescription>Months 13-24</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div>
                        <p className="text-3xl font-bold text-primary">$22.5M</p>
                        <p className="text-sm text-muted-foreground">Annual Recurring Revenue</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Startup Plan</span>
                          <span className="text-sm">30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Growth Plan</span>
                          <span className="text-sm">55%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Scale Plan</span>
                          <span className="text-sm">15%</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Customers</span>
                          <span className="text-sm font-medium">7,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Avg. Revenue Per User</span>
                          <span className="text-sm font-medium">$250/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Churn Rate</span>
                          <span className="text-sm font-medium">4.8%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Year 3</CardTitle>
                    <CardDescription>Months 25-36</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div>
                        <p className="text-3xl font-bold text-primary">$54M</p>
                        <p className="text-sm text-muted-foreground">Annual Recurring Revenue</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Startup Plan</span>
                          <span className="text-sm">25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Growth Plan</span>
                          <span className="text-sm">55%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Scale Plan</span>
                          <span className="text-sm">20%</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Customers</span>
                          <span className="text-sm font-medium">15,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Avg. Revenue Per User</span>
                          <span className="text-sm font-medium">$300/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Churn Rate</span>
                          <span className="text-sm font-medium">4.5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Burn Rate & Runway</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Burn Rate</p>
                          <p className="text-2xl font-bold">$250K</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Runway with Funding</p>
                          <p className="text-2xl font-bold">18 months</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2">Expense Breakdown</p>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Engineering (35%)</span>
                              <span className="text-sm">$87.5K/mo</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Sales & Marketing (40%)</span>
                              <span className="text-sm">$100K/mo</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Operations (15%)</span>
                              <span className="text-sm">$37.5K/mo</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">G&A (10%)</span>
                              <span className="text-sm">$25K/mo</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Key Financial Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Month 8: $250K MRR</p>
                          <p className="text-sm text-muted-foreground">
                            1,250 paying customers at an average of $200/month
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Month 14: Cash Flow Positive</p>
                          <p className="text-sm text-muted-foreground">
                            Revenue exceeds operating expenses without additional funding
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="bg-amber-100 rounded-full p-1 mt-1">
                          <Circle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Month 18: $1M MRR</p>
                          <p className="text-sm text-muted-foreground">
                            4,000 paying customers at an average of $250/month
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="bg-amber-100 rounded-full p-1 mt-1">
                          <Circle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Month 24: Series A Fundraising</p>
                          <p className="text-sm text-muted-foreground">
                            $15M raise at $100M valuation to accelerate growth
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="bg-muted rounded-full p-1 mt-1">
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Month 36: $4.5M MRR</p>
                          <p className="text-sm text-muted-foreground">
                            15,000 paying customers at an average of $300/month
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <Separator className="my-16" />
            
            {/* Challenges & Risks */}
            <section id="challenges" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Challenges & Risk Mitigation</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Challenges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="bg-red-100 rounded-full p-1 mt-1">
                          <RefreshCw className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <span className="font-medium">Competitive Landscape</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            The marketing automation space is becoming increasingly crowded, with large enterprises expanding downmarket.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="bg-red-100 rounded-full p-1 mt-1">
                          <RefreshCw className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <span className="font-medium">Technical Complexity</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Developing advanced AI that works across diverse marketing channels requires significant resources and expertise.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="bg-red-100 rounded-full p-1 mt-1">
                          <RefreshCw className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <span className="font-medium">Platform Dependency</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Changes to API policies on platforms like Facebook, LinkedIn, or Google could impact our functionality.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="bg-red-100 rounded-full p-1 mt-1">
                          <RefreshCw className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <span className="font-medium">Data Privacy Regulations</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Evolving global privacy laws require constant adaptation of our data handling practices.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Mitigation Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">Competitive Differentiation</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Maintaining our focus on startup-specific needs with pricing and features tailored to early-stage companies, avoiding direct competition with enterprise solutions.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">Technical Excellence</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Building a world-class engineering team with AI/ML expertise and implementing agile development practices to adapt quickly to market needs.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">Diversified Integrations</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Building redundancies across platforms and maintaining close relationships with key API providers to anticipate changes.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 mt-1">
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">Privacy by Design</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            Implementing privacy controls that exceed regulatory requirements and establishing a dedicated compliance team to monitor regulatory changes.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>SWOT Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-950/20 p-5 rounded-lg">
                        <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-3">Strengths</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Purpose-built for startup marketing needs</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Advanced AI technology with proprietary algorithms</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Experienced founding team with startup and AI backgrounds</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Competitive pricing with growth-aligned tiers</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-lg">
                        <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">Weaknesses</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>New entrant in established market</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Limited brand recognition</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Initial lack of case studies and success stories</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Early-stage company with limited financial resources</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-lg">
                        <h3 className="font-bold text-green-700 dark:text-green-400 mb-3">Opportunities</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Growing startup ecosystem globally</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Increasing adoption of AI in marketing</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Rising customer acquisition costs driving demand for automation</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Strategic acquisition potential from larger marketing platforms</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-5 rounded-lg">
                        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-3">Threats</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Established competitors moving downmarket</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Marketing platform API changes</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Evolving privacy regulations</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Economic downturns affecting startup funding</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-muted/20 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Key Success Factors</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-1">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Product-Market Fit</p>
                      <p className="text-sm text-muted-foreground">
                        Continuous validation with target customers to ensure alignment with evolving startup needs
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-1">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Strategic Partnerships</p>
                      <p className="text-sm text-muted-foreground">
                        Accelerator and incubator relationships that provide access to new startups
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-1">
                      <Lightbulb className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Technical Innovation</p>
                      <p className="text-sm text-muted-foreground">
                        Maintaining technological edge through continuous AI model improvement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <Separator className="my-16" />
            
            {/* Roadmap */}
            <section id="roadmap" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Strategic Roadmap</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                      <span className="font-semibold text-blue-700 dark:text-blue-400">1</span>
                    </div>
                    <CardTitle>Launch Phase (Months 1-6)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                        <span className="text-sm">Complete and launch MVP to initial 500 beta users</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                        <span className="text-sm">Establish partnerships with 10 startup accelerators</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                        <span className="text-sm">Achieve 1,000 active users with 15% conversion to paid</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span className="text-sm">Implement core AI campaign management features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span className="text-sm">Reach $100K MRR</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                      <span className="font-semibold text-purple-700 dark:text-purple-400">2</span>
                    </div>
                    <CardTitle>Growth Phase (Months 7-18)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span className="text-sm">Expand team to 30+ engineers and marketers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span className="text-sm">Launch AI content generation capabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span className="text-sm">Implement advanced analytics dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span className="text-sm">Reach 5,000 paying customers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span className="text-sm">Achieve cash flow positivity</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                      <span className="font-semibold text-green-700 dark:text-green-400">3</span>
                    </div>
                    <CardTitle>Expansion Phase (Months 19-36)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">Complete Series A funding round</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">Launch API and developer ecosystem</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">Expand to international markets (EMEA, APAC)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">Reach 15,000 paying customers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">Achieve $54M ARR</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Milestone Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative pb-12">
                      <div className="absolute left-0 top-0 ml-5 h-full w-0.5 bg-border"></div>
                      
                      <div className="relative mb-8">
                        <div className="flex items-center">
                          <div className="absolute -left-1.5 mt-0.5 h-8 w-8 rounded-full border border-primary bg-background flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <div className="ml-10">
                            <h4 className="font-medium">MVP Launch</h4>
                            <p className="text-sm text-muted-foreground">Month 1</p>
                            <p className="text-sm mt-1">
                              Core platform launch with AI campaign automation capabilities
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative mb-8">
                        <div className="flex items-center">
                          <div className="absolute -left-1.5 mt-0.5 h-8 w-8 rounded-full border border-primary bg-background flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <div className="ml-10">
                            <h4 className="font-medium">First 1,000 Users</h4>
                            <p className="text-sm text-muted-foreground">Month 4</p>
                            <p className="text-sm mt-1">
                              Milestone of 1,000 active users with 15% conversion to paid
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative mb-8">
                        <div className="flex items-center">
                          <div className="absolute -left-1.5 mt-0.5 h-8 w-8 rounded-full border border-amber-500 bg-background flex items-center justify-center">
                            <Circle className="h-4 w-4 text-amber-500" />
                          </div>
                          <div className="ml-10">
                            <h4 className="font-medium">$1M ARR</h4>
                            <p className="text-sm text-muted-foreground">Month 8</p>
                            <p className="text-sm mt-1">
                              First $1M ARR milestone with sustainable unit economics
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative mb-8">
                        <div className="flex items-center">
                          <div className="absolute -left-1.5 mt-0.5 h-8 w-8 rounded-full border border-amber-500 bg-background flex items-center justify-center">
                            <Circle className="h-4 w-4 text-amber-500" />
                          </div>
                          <div className="ml-10">
                            <h4 className="font-medium">Cash Flow Positive</h4>
                            <p className="text-sm text-muted-foreground">Month 14</p>
                            <p className="text-sm mt-1">
                              Reaching cash flow positivity with sustainable growth model
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative mb-8">
                        <div className="flex items-center">
                          <div className="absolute -left-1.5 mt-0.5 h-8 w-8 rounded-full border border-muted-foreground bg-background flex items-center justify-center">
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="ml-10">
                            <h4 className="font-medium">Series A Funding</h4>
                            <p className="text-sm text-muted-foreground">Month 24</p>
                            <p className="text-sm mt-1">
                              $15M Series A at $100M valuation to accelerate growth
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="flex items-center">
                          <div className="absolute -left-1.5 mt-0.5 h-8 w-8 rounded-full border border-muted-foreground bg-background flex items-center justify-center">
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="ml-10">
                            <h4 className="font-medium">International Expansion</h4>
                            <p className="text-sm text-muted-foreground">Month 36</p>
                            <p className="text-sm mt-1">
                              Global operations with offices in US, Europe, and Asia
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <div className="bg-muted/20 p-6 rounded-lg mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Investment Opportunity Summary</h3>
                <Badge variant="default" className="px-3">Seed Round</Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Funding Target:</span>
                      <span className="font-medium">$850,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Equity Offered:</span>
                      <span className="font-medium">15%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Pre-Money Valuation:</span>
                      <span className="font-medium">$4.8M</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Use of Funds:</span>
                      <span className="font-medium">Engineering (40%), Marketing (35%), Operations (25%)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Projected Exit:</span>
                      <span className="font-medium">Acquisition or Series C within 5 years</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Target Exit Valuation:</span>
                      <span className="font-medium">$250M-500M</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Projected ROI for Seed Investors:</span>
                      <span className="font-medium">12-15x</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Investment Minimum:</span>
                      <span className="font-medium">$50,000</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="default" className="w-full sm:w-auto">
                  Request Investor Deck
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center p-8 bg-primary/5 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Startup Marketing</h3>
              <p className="text-muted-foreground max-w-2xl mb-6">
                Our AI-powered platform helps startups reduce marketing costs while improving campaign performance. Join us in building the future of startup marketing automation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="default" size="lg">
                  Schedule a Demo
                </Button>
                <Button variant="outline" size="lg">
                  Contact Founders
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}