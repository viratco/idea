
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Users, LightbulbIcon, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="glass-nav w-full px-4 sm:px-6 py-4 fixed top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span>IdeaMatch</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className="text-foreground/80 hover:text-foreground underline-animation">
              Sign In
            </Link>
            <Link to="/sign-up">
              <Button className="bg-primary text-white rounded-full px-5 py-2 hover:shadow-lg hover:bg-primary/90 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 container mx-auto">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            AI-powered business idea generator
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Your AI Co-Founder for
            <span className="text-primary ml-2">Groundbreaking Ideas</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get personalized, AI-generated business ideas tailored to your skills, interests, and goals. Let us help you find your next big thing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up">
              <Button className="bg-primary text-white rounded-full px-8 py-6 text-lg hover:shadow-lg hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto">
                Generate Ideas <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-2 w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl p-6 card-hover animate-fade-in" style={{animationDelay: '100ms'}}>
            <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Ideas</h3>
            <p className="text-muted-foreground">
              Get business ideas tailored to your skills, interests, and resources.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 card-hover animate-fade-in" style={{animationDelay: '200ms'}}>
            <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
            <p className="text-muted-foreground">
              Each idea comes with market insights and competitive analysis.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 card-hover animate-fade-in" style={{animationDelay: '300ms'}}>
            <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Co-Founder Match</h3>
            <p className="text-muted-foreground">
              Connect with potential co-founders who complement your skills.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From concept to execution, we guide you every step of the way
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 text-center">
              <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Share Your Profile</h3>
              <p className="text-muted-foreground">Tell us about your skills, interests, and resources</p>
            </div>
            
            <div className="hidden md:block w-8 self-center">
              <ArrowRight className="w-8 h-8 text-primary/50" />
            </div>
            
            <div className="flex-1 text-center">
              <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">Our AI analyzes market trends and your unique profile</p>
            </div>
            
            <div className="hidden md:block w-8 self-center">
              <ArrowRight className="w-8 h-8 text-primary/50" />
            </div>
            
            <div className="flex-1 text-center">
              <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Personalized Ideas</h3>
              <p className="text-muted-foreground">Receive detailed, actionable business ideas with execution plans</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 container mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 z-0"></div>
          <div className="relative z-10">
            <LightbulbIcon className="h-12 w-12 text-primary mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Next Big Idea?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who've found success with our AI-generated business ideas.
            </p>
            <Link to="/sign-up">
              <Button className="bg-primary text-white rounded-full px-8 py-6 text-lg hover:shadow-lg hover:bg-primary/90 transition-all duration-300">
                Get Started For Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <span className="font-semibold">IdeaMatch</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} IdeaMatch. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
