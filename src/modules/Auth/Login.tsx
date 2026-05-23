import { SignIn } from '@clerk/react';
import Logo from '@/components/common/logo/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background relative overflow-hidden p-4 animate-in fade-in duration-300">
      {/* Premium Ambient Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-500/10 blur-[120px] pointer-events-none" />

      {/* Theme Toggle in top-right */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Centered Sign In Dialog */}
      <div className="w-full max-w-md flex flex-col items-center gap-6 z-10">
        <div className="flex items-center gap-2 mb-2 select-none">
          <Logo />
          <span className="text-3xl font-bold tracking-wider mb-1">Mochi</span>
        </div>
        <SignIn routing="hash" />
      </div>
    </div>
  );
}
