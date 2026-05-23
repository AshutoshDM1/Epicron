import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-foreground">
      {/* Ambient backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Navigation */}
        <div className="mb-12">
          <Link to="/">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: May 22, 2026. Your privacy is paramount to us at Epicron.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 border-t border-border/40 pt-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Information We Collect</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We only collect information about you if we have a reason to do so—for example, to provide our services, to communicate with you, or to make our services better. We collect this information from three sources: information you provide to us, information collected automatically, and information from third parties (such as Clerk for authentication).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">How We Use Information</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect to provide and maintain the Epicron monitoring service, verify your identity, send notifications when your services experience downtime, and to secure our application. We do not sell or share your personal data with third-party advertisers.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Data Retention & Security</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard administrative, technical, and physical security measures designed to protect your personal information. Your monitoring configurations and associated uptime records are retained securely in our PostgreSQL database and can be deleted at any time through your dashboard.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© 2026 Epicron. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
