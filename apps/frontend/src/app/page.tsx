"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 400) {
          throw new Error("E-mail ou senha incorretos.");
        }
        throw new Error("Falha de conexão com o servidor. Tente novamente mais tarde.");
      }

      const data = await response.json();
      // Handle successful login (e.g., store token, redirect to dashboard)
      // For now, we will simulate a redirect
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative z-10 flex-1 flex flex-col justify-center px-margin-mobile py-lg w-full max-w-[448px] mx-auto md:h-auto h-[100dvh]">
      {/* Header Section */}
      <header className="text-center mb-xl">
        <span
          className="material-symbols-outlined text-display-lg text-primary-fixed mb-base"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          fitness_center
        </span>
        <h1 className="font-headline-lg md:font-display-lg text-headline-lg md:text-display-lg text-on-surface tracking-tighter mb-base md:mb-0">
          AI Coach
        </h1>
        <p className="font-label-caps text-label-caps text-on-surface-variant md:mt-xs uppercase md:normal-case tracking-widest md:tracking-normal">
          Identifique. Adapte-se. Supere.
        </p>
      </header>

      {/* Login Form Card */}
      <div className="w-full md:bg-surface-container-lowest md:border md:border-surface-variant md:rounded-xl md:p-md md:shadow-2xl relative">
        <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="flex flex-col gap-xs">
            <label
              className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest ml-xs md:ml-0"
              htmlFor="email"
            >
              E-mail
            </label>
            <div className="relative group">
              <span
                className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-fixed transition-colors"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                mail
              </span>
              <input
                className={`w-full bg-[#1A1A1A] md:bg-surface border-0 border-b-2 ${error ? 'border-error' : 'border-surface-variant'} text-on-surface font-body-md text-body-md px-4 py-sm pl-[44px] rounded-t-lg md:rounded-t focus:ring-0 input-glow md:focus:border-primary-fixed transition-colors placeholder:text-on-surface-variant/50`}
                id="email"
                name="email"
                placeholder="atleta@exemplo.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-xs">
            <label
              className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest ml-xs md:ml-0"
              htmlFor="password"
            >
              Senha
            </label>
            <div className="relative group">
              <span
                className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-fixed transition-colors"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                lock
              </span>
              <input
                className={`w-full bg-[#1A1A1A] md:bg-surface border-0 border-b-2 ${error ? 'border-error' : 'border-surface-variant'} text-on-surface font-body-md text-body-md px-4 py-sm pl-[44px] rounded-t-lg md:rounded-t focus:ring-0 input-glow md:focus:border-primary-fixed transition-colors placeholder:text-on-surface-variant/50`}
                id="password"
                name="password"
                placeholder="••••••••"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-error font-body-md text-sm mt-1 text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            className="w-full bg-primary-fixed text-on-primary-fixed font-headline-md text-headline-md py-sm rounded-full hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-sm mt-sm shadow-[0_0_20px_rgba(202,243,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Autenticando..." : "Entrar"}
            {!isLoading && (
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'wght' 700" }}
              >
                arrow_forward
              </span>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
