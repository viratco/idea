
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import AuthForm from '@/components/AuthForm';
import { toast } from 'sonner';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSignIn = (data: { email: string; password: string }) => {
    console.log('Sign in data:', data);
    // In a real app, you would authenticate with a backend
    // For demo purposes, we'll simulate a successful login
    toast.success('Successfully signed in!');
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span>IdeaMatch</span>
        </Link>
      </div>
      
      <AuthForm type="signin" onSubmit={handleSignIn} />
      
      <p className="mt-8 text-sm text-muted-foreground text-center">
        By signing in, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
};

export default SignIn;
