import { Suspense, lazy, useEffect, useState } from "react";

const HomePage = lazy(async () => {
  const module = await import("@/pages/HomePage");
  return { default: module.HomePage };
});

const ThoughtsPage = lazy(async () => {
  const module = await import("@/pages/ThoughtsPage");
  return { default: module.ThoughtsPage };
});

const AdminPage = lazy(async () => {
  const module = await import("@/pages/AdminPage");
  return { default: module.AdminPage };
});

export default function App() {
  const [pathname, setPathname] = useState(() => getPathname());

  useEffect(() => {
    function handleLocationChange() {
      setPathname(getPathname());
    }

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  if (pathname.startsWith("/admin")) {
    return (
      <Suspense fallback={<AppLoadingState />}>
        <AdminPage />
      </Suspense>
    );
  }

  if (pathname.startsWith("/thoughts")) {
    return (
      <Suspense fallback={<AppLoadingState />}>
        <ThoughtsPage />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<AppLoadingState />}>
      <HomePage />
    </Suspense>
  );
}

function getPathname() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
}

function AppLoadingState() {
  return (
    <div className="min-h-screen px-3 py-10 md:px-5">
      <div className="shell-container">
        <div className="glass-panel rounded-[24px] px-5 py-4 text-sm text-white/52">Loading...</div>
      </div>
    </div>
  );
}
