"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function normalizeRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = useMemo(
    () => normalizeRedirect(searchParams.get("redirect")),
    [searchParams]
  );
  const errorParam = searchParams.get("error");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const startSignIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
        errorCallbackURL: "/login?error=oauth",
        newUserCallbackURL: redirectTo,
      });
    } catch {
      setIsLoading(false);
      setError("Could not start Google sign-in. Please try again.");
    }
  }, [redirectTo]);

  useEffect(() => {
    if (errorParam) {
      setIsLoading(false);
      return;
    }

    void startSignIn();
  }, [errorParam, startSignIn]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 text-zinc-900">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-600">
          This app uses Google for sign-in.
        </p>
        <button
          type="button"
          onClick={startSignIn}
          disabled={isLoading}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Redirecting to Google..." : "Continue with Google"}
        </button>
        {error ? (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        ) : null}
      </main>
    </div>
  );
}
