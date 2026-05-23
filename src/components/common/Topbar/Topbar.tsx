import { Button } from '@/components/ui/button';
import { Github, Star } from 'lucide-react';
import Logo from '../logo/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserButton } from '@clerk/react';

const Topbar = () => {
  const githubRepoUrl =
    import.meta.env.VITE_GITHUB_REPO_URL || 'https://github.com/AshutoshDM1/Elite-Cron';

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="w-full max-w-7xl mx-auto px-4 py-2 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-2xl font-bold tracking-wider mb-1">Epicron</span>
            </div>
            <div className="flex items-center gap-3">

              {/* Clerk User Button */}
              <div className="shrink-0 flex items-center">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'h-8 w-8 rounded-full ring-2 ring-muted/20 hover:scale-105 transition-transform duration-200 cursor-pointer',
                    },
                  }}
                />
              </div>


              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex"
              >
                <Button variant="outline" size="sm" className="gap-2 hover:bg-accent cursor-pointer text-xs font-light">
                  <Github className="h-4 w-4" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span>Star on GitHub</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>
      <ThemeToggle />
    </>
  );
};

export default Topbar;
