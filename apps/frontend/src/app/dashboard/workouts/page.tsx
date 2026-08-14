'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Workout } from '../../../types/workout';

export default function WorkoutsListPage() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${apiUrl}/api/workouts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          cache: 'no-store'
        });

        if (res.status === 401) {
          localStorage.removeItem('token');
          router.push('/');
          return;
        }

        if (!res.ok) {
          throw new Error('Falha ao buscar a lista de treinos');
        }

        const result = await res.json();
        setWorkouts(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [router]);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-margin-mobile h-16 md:px-margin-desktop">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 cursor-pointer hover:text-primary-fixed transition-colors text-secondary-fixed-dim"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
          <span className="font-label-caps text-label-caps uppercase hidden md:inline">Voltar</span>
        </button>
        <div className="font-label-caps text-label-caps text-primary-fixed tracking-widest uppercase">
          Todos os Treinos
        </div>
        <div className="w-8 md:w-20"></div> {/* Spacer to center the title */}
      </header>

      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto space-y-md">
        <section>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg">Meus Treinos</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Selecione um treino para iniciar.</p>
        </section>

        {loading ? (
          <div className="flex justify-center p-8">
            <p className="text-on-surface-variant font-body-md">Carregando treinos...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-8 bg-surface-container rounded-xl border border-error/20">
            <p className="text-error mb-4 font-body-md">{error}</p>
            <button onClick={() => window.location.reload()} className="text-primary-fixed underline font-body-md">Tentar Novamente</button>
          </div>
        ) : workouts.length === 0 ? (
          <div className="p-gutter text-center py-12 flex flex-col items-center w-full bg-surface-container rounded-xl border border-white/10">
            <span className="material-symbols-outlined text-6xl text-primary-fixed mb-4" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>fitness_center</span>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Nenhum treino encontrado</h3>
            <p className="font-body-md text-body-md text-on-surface-variant w-full max-w-xs sm:max-w-sm">
              Você ainda não possui treinos cadastrados. Aguarde seu AI Coach gerar seu plano ou crie o seu primeiro treino.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-md">
            {workouts.map(workout => (
              <section key={workout.id} className="glass-panel rounded-xl overflow-hidden ai-glow relative bg-surface-container border border-white/10 cursor-pointer hover:border-primary-fixed/50 transition-colors" onClick={() => router.push(`/dashboard/workouts/${workout.id}`)}>
                <div className="p-gutter space-y-md">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary uppercase">
                      {workout.description}
                    </h3>
                  </div>
                  
                  <div className="flex gap-sm flex-wrap">
                    {workout.tags && workout.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full border border-white/20 bg-surface-container-high text-white font-label-caps text-label-caps uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                    {(!workout.tags || workout.tags.length === 0) && (
                      <span className="px-3 py-1 rounded-full border border-white/20 bg-surface-container-high text-white font-label-caps text-label-caps uppercase tracking-widest">
                        GERAL
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-on-surface-variant gap-2 text-sm">
                    <span className="material-symbols-outlined text-sm">list</span>
                    <span>{workout.exercises.length} exercícios</span>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
