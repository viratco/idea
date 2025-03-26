
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, Menu, X, User, Settings, LogOut, Home, Lightbulb, BookOpen, BarChart3, FileText, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, you would handle logout logic
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  return (
    <nav className="glass-nav w-full px-4 sm:px-6 py-4 fixed top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="text-xl font-bold flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span>IdeaMatch</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-foreground/80 hover:text-foreground flex items-center gap-1.5 underline-animation">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/idea-generator" className="text-foreground/80 hover:text-foreground flex items-center gap-1.5 underline-animation">
              <Lightbulb className="h-4 w-4" />
              <span>New Idea</span>
            </Link>
            <Link to="/saved-ideas" className="text-foreground/80 hover:text-foreground flex items-center gap-1.5 underline-animation">
              <BookOpen className="h-4 w-4" />
              <span>Saved Ideas</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-4 py-3 font-medium">My Account</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/analytics" className="flex items-center gap-2 cursor-pointer">
                      <BarChart3 className="h-4 w-4" />
                      <span>Analytics</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/documents" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="h-4 w-4" />
                      <span>Documents</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/billing" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link to="/idea-generator" className="flex items-center gap-2 py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                <Lightbulb className="h-5 w-5" />
                <span>New Idea</span>
              </Link>
              <Link to="/saved-ideas" className="flex items-center gap-2 py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                <BookOpen className="h-5 w-5" />
                <span>Saved Ideas</span>
              </Link>
              <Link to="/analytics" className="flex items-center gap-2 py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
              <Link to="/documents" className="flex items-center gap-2 py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                <FileText className="h-5 w-5" />
                <span>Documents</span>
              </Link>
              <Link to="/billing" className="flex items-center gap-2 py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                <CreditCard className="h-5 w-5" />
                <span>Billing</span>
              </Link>
              <Link to="/profile" className="flex items-center gap-2 py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 py-2 text-destructive"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
