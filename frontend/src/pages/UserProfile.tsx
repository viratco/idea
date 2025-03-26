
import React from 'react';
import Navbar from '@/components/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, CreditCard, Star, FileText, BookOpen, Clock, LogOut, Mail, Building, Lightbulb, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "",
    company: "Tech Innovators Inc.",
    role: "Founder & CEO",
    joinDate: "January 2023",
    subscription: {
      plan: "Premium",
      status: "Active",
      renewDate: "November 15, 2023",
      features: ["Detailed business plans", "Market analysis", "Competitor insights", "GPT-4o model access"]
    },
    stats: {
      ideasGenerated: 12,
      plansCreated: 5,
      savedIdeas: 8
    },
    recentIdeas: [
      {
        title: "Automated Marketing Platform",
        date: "October 24, 2023",
        category: "SaaS"
      },
      {
        title: "AI Personal Fitness Coach",
        date: "October 20, 2023",
        category: "Health"
      },
      {
        title: "Sustainable Food Delivery",
        date: "October 15, 2023",
        category: "Food"
      }
    ]
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="container max-w-6xl mx-auto pt-28 px-4">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-center text-xl">{userData.name}</CardTitle>
                  <CardDescription className="text-center flex items-center gap-1 mt-1">
                    <Mail className="h-3.5 w-3.5" />
                    {userData.email}
                  </CardDescription>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Building className="h-3 w-3" />
                    <span>{userData.company}</span>
                    <span className="mx-1">•</span>
                    <span>{userData.role}</span>
                  </div>
                </div>
              </CardHeader>
              
              <Separator />
              
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">Subscription</h3>
                  <Badge className="bg-primary/90 text-white">
                    {userData.subscription.plan}
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {userData.subscription.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Renews</span>
                    <span>{userData.subscription.renewDate}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Your Plan Includes:</h4>
                  <ul className="space-y-2">
                    {userData.subscription.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="bg-green-100 rounded-full h-4 w-4 flex items-center justify-center">
                          <Star className="h-2.5 w-2.5 text-green-700" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    Manage Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start mb-1">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start mb-1">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start mb-1">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </Button>
                  <Button variant="ghost" className="w-full justify-start mb-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Documents
                  </Button>
                  <Separator className="my-2" />
                  <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Ideas Generated</p>
                      <p className="text-3xl font-bold">{userData.stats.ideasGenerated}</p>
                    </div>
                    <div className="bg-white p-2 rounded-md dark:bg-slate-800">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Business Plans</p>
                      <p className="text-3xl font-bold">{userData.stats.plansCreated}</p>
                    </div>
                    <div className="bg-white p-2 rounded-md dark:bg-slate-800">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Saved Ideas</p>
                      <p className="text-3xl font-bold">{userData.stats.savedIdeas}</p>
                    </div>
                    <div className="bg-white p-2 rounded-md dark:bg-slate-800">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="ideas">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="ideas" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Ideas</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Activity</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ideas">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Recent Ideas</CardTitle>
                    <CardDescription>
                      Browse and manage your recently generated business ideas
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {userData.recentIdeas.map((idea, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                          <div>
                            <h4 className="font-medium">{idea.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {idea.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{idea.date}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/idea-generator')}
                        className="text-primary"
                      >
                        Generate New Idea
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Analytics</CardTitle>
                    <CardDescription>
                      Track your business ideas performance and metrics
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="py-10">
                    <div className="flex items-center justify-center h-48 text-muted-foreground">
                      Analytics visualizations will appear here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your recent actions and notifications
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="py-10">
                    <div className="flex items-center justify-center h-48 text-muted-foreground">
                      Activity log will appear here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
