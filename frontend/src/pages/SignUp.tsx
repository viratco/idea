
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import AuthForm from '@/components/AuthForm';
import { toast } from 'sonner';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSignUp = (data: { email: string; password: string; name?: string }) => {
    console.log('Sign up data:', data);
    // In a real app, you would register with a backend
    // For demo purposes, we'll simulate a successful registration
    toast.success('Account created successfully!');
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
      
      <AuthForm type="signup" onSubmit={handleSignUp} />
      
      <p className="mt-8 text-sm text-muted-foreground text-center">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
};

export default SignUp;
