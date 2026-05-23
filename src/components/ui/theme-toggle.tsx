import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/theme-context';

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const { theme } = useTheme();
  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="fixed bottom-5 md:bottom-5 right-5 z-50 cursor-pointer rounded-full size-8" size="sm">
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}