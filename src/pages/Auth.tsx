import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { isSupabaseConfigured } from "@/integrations/supabase/client";
import { getCurrentUser, onAuthChange, signOutUser, startOAuthSignIn } from "@/integrations/supabase/auth";

const Auth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState<"google" | "github" | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    getCurrentUser()
      .then((currentUser) => {
        if (mounted) setUser(currentUser);
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Failed to load account");
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    const subscription = onAuthChange((nextUser) => {
      if (mounted) {
        setUser(nextUser);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleOAuth = async (provider: "google" | "github") => {
    setIsSubmitting(provider);
    try {
      await startOAuthSignIn(provider);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to start sign in";
      toast.error(message);
      setIsSubmitting(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success("Signed out.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign out";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen pt-32 md:pt-40">
      <section className="section-padding pt-0">
        <div className="container-editorial max-w-3xl">
          <div className="border border-border/70 bg-card/70 p-8 md:p-12">
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">Account</p>
            <h1 className="mb-4 font-serif text-4xl md:text-5xl font-light">Studio Access</h1>
            <p className="mb-10 max-w-2xl font-sans text-muted-foreground leading-relaxed">
              Sign in to save your preferences and continue your Babel journey across devices.
            </p>

            {!isSupabaseConfigured && (
              <div className="border border-destructive/40 bg-background p-4">
                <p className="font-sans text-sm text-destructive">Supabase is not configured. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.</p>
              </div>
            )}

            {isSupabaseConfigured && isLoading && (
              <div className="space-y-3">
                <div className="h-10 w-full animate-pulse bg-muted" />
                <div className="h-10 w-full animate-pulse bg-muted" />
              </div>
            )}

            {isSupabaseConfigured && !isLoading && !user && (
              <div className="space-y-4">
                <button
                  onClick={() => handleOAuth("google")}
                  disabled={isSubmitting !== null}
                  className="w-full border border-foreground/35 px-6 py-4 text-left font-sans text-xs uppercase tracking-[0.26em] transition-colors hover:bg-foreground hover:text-background disabled:opacity-60"
                >
                  {isSubmitting === "google" ? "Connecting to Google..." : "Continue with Google"}
                </button>
                <button
                  onClick={() => handleOAuth("github")}
                  disabled={isSubmitting !== null}
                  className="w-full border border-foreground/25 px-6 py-4 text-left font-sans text-xs uppercase tracking-[0.26em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground disabled:opacity-60"
                >
                  {isSubmitting === "github" ? "Connecting to GitHub..." : "Continue with GitHub"}
                </button>
              </div>
            )}

            {isSupabaseConfigured && !isLoading && user && (
              <div className="border border-border bg-background p-6">
                <p className="font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground">Signed in as</p>
                <p className="mt-2 font-serif text-2xl">{user.email}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={handleSignOut}
                    className="border border-foreground/40 px-5 py-2 font-sans text-xs uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
                  >
                    Sign out
                  </button>
                  <Link
                    to="/collections"
                    className="border border-foreground/20 px-5 py-2 font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                  >
                    Explore collections
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
