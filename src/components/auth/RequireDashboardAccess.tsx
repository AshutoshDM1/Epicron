import { useState, useEffect } from 'react';
import { useUser } from '@clerk/react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { DotmSquare8 } from '../ui/dotm-square-8';

function PageLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background select-none animate-in fade-in duration-300">
      <div className="flex flex-col items-center justify-center gap-6">
        <DotmSquare8
          size={32}
          dotSize={4}
          speed={1.2}
          bloom
        />

        {/* Minimalist Subtext */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[11px] font-bold tracking-[0.25em] text-foreground uppercase animate-pulse">
            Mochi
          </span>
          <span className="text-[9px] tracking-wider text-muted-foreground uppercase opacity-70">
            Connecting to service...
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RequireDashboardAccess() {
  const location = useLocation();
  const { user, isLoaded, isSignedIn } = useUser();
  const [minLoaderElapsed, setMinLoaderElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoaderElapsed(true);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  // Important: only block when metadata explicitly says "false".
  // Many users won't have this field set yet (undefined), and should still be allowed in.
  const hasSignedUp = user?.publicMetadata?.has_signed_up;

  // Render loader if Clerk has not loaded or the minimum 1.5s time has not elapsed
  const isLoading = !isLoaded || !minLoaderElapsed;

  if (isLoading) {
    return <PageLoader />;
  }

  // Once loading completes, evaluate user authentication:
  if (!isSignedIn) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  if (hasSignedUp === false) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
