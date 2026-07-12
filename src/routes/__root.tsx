import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScriptOnce,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Lost in space</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for drifted out of orbit.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:scale-105 glow-primary"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a href="/" className="rounded-lg border border-border px-4 py-2 text-sm">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gopinath C | Full Stack Developer Portfolio" },
      {
        name: "description",
        content:
          "Full Stack Developer • Java Programmer • React Developer • AI Enthusiast. Explore projects, internships, certifications, and skills.",
      },
      {
        name: "keywords",
        content:
          "Gopinath C, Java Developer, React Developer, Full Stack Developer, Portfolio, ECE Student, Web Developer, AI, Machine Learning",
      },
      { name: "author", content: "Gopinath C" },
      { name: "theme-color", content: "#0F172A" },
      { property: "og:title", content: "Gopinath C | Full Stack Developer Portfolio" },
      {
        property: "og:description",
        content:
          "Full Stack Developer • Java Programmer • React Developer • AI Enthusiast. Explore projects, internships, certifications, and skills.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gopinath C | Full Stack Developer Portfolio" },
      { name: "twitter:description", content: "Full Stack Developer • Java Programmer • React Developer • AI Enthusiast. Explore projects, internships, certifications, and skills." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f9a25403-fca1-49eb-838a-115198dedf34/id-preview-8e215ebf--f879fd65-7e61-4ae6-8288-51c406143430.lovable.app-1783848334757.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f9a25403-fca1-49eb-838a-115198dedf34/id-preview-8e215ebf--f879fd65-7e61-4ae6-8288-51c406143430.lovable.app-1783848334757.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>
          {`try {
            const t = localStorage.getItem('theme');
            if (t === 'light') document.documentElement.classList.add('light');
          } catch (e) {}`}
        </ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
