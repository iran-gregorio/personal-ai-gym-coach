'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface WeekDay {
  date: string;
  isCompleted: boolean;
}

interface WorkoutOfDay {
  id: string;
  description: string;
  tags: string[];
  isCompletedToday: boolean;
  timesCompleted: number;
  lastDate: string | null;
  lastDuration: number | null;
  exercises: any[];
}

interface DashboardData {
  weekProgress: WeekDay[];
  workoutOfDay: WorkoutOfDay | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }

        // Use local date for the request
        const clientDate = format(new Date(), 'yyyy-MM-dd');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${apiUrl}/api/dashboard?clientDate=${clientDate}`, {
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
          throw new Error('Falha ao buscar dados do dashboard');
        }

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    return `${m}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center">
        <p className="text-on-surface-variant font-body-md">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center flex-col p-4">
        <p className="text-error mb-4 font-body-md">{error}</p>
        <button onClick={handleLogout} className="text-primary-fixed underline font-body-md">Voltar para o Login</button>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-margin-mobile h-16 md:px-margin-desktop">
        <div className="font-label-caps text-label-caps text-primary-fixed tracking-widest uppercase">
          AI Coach
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer hover:text-primary-fixed transition-colors text-secondary-fixed-dim"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
            <span className="font-label-caps text-label-caps uppercase hidden md:inline">Sair</span>
          </button>
        </div>
      </header>

      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto space-y-md">
        {/* Header */}
        <section>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg">Bom dia, Atleta</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Vamos bater as metas de hoje.</p>
        </section>

        {/* Weekly Calendar */}
        <section className="glass-panel rounded-xl p-gutter">
          <h2 className="font-label-caps text-label-caps mb-sm text-secondary-fixed-dim uppercase tracking-widest">PROGRESSO SEMANAL</h2>
          <div className="flex justify-between items-center">
            {data?.weekProgress.map((day, idx) => {
              // Extract just YYYY-MM-DD to avoid timezone shifts
              const dateString = day.date.substring(0, 10);
              const dateObj = parseISO(dateString);
              const dayName = format(dateObj, 'E', { locale: ptBR }).substring(0, 3).toUpperCase();
              const todayStr = format(new Date(), 'yyyy-MM-dd');
              const isToday = dateString === todayStr;
              const isPast = dateString < todayStr;

              let indicatorClass = "bg-surface-container-highest";
              let iconOrContent = <span className="material-symbols-outlined text-on-surface-variant">remove</span>;

              if (day.isCompleted) {
                indicatorClass = "bg-surface-container border border-primary-fixed";
                iconOrContent = <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>;
              } else if (isToday) {
                indicatorClass = "bg-surface-container border border-primary-fixed";
                iconOrContent = <span className="font-label-caps text-label-caps text-primary-fixed">{format(dateObj, 'd')}</span>;
              } else if (isPast) {
                indicatorClass = "bg-surface-container-highest";
                iconOrContent = <span className="material-symbols-outlined text-on-surface-variant">close</span>;
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-xs">
                  <span className={`font-label-caps text-label-caps ${isToday ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>{dayName}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${indicatorClass}`}>
                    {iconOrContent}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Workout of the Day */}
        <section className="glass-panel rounded-xl overflow-hidden ai-glow relative bg-surface-container border border-white/10">
          
          {!data?.workoutOfDay ? (
            <div className="h-32 bg-surface-container-highest relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
              <div className="relative z-10 text-center">
                <span className="inline-block bg-background/80 px-2 py-1 rounded font-label-caps text-label-caps text-on-surface-variant mb-2 tracking-widest">TREINO DO DIA</span>
                <h3 className="font-headline-md text-headline-md text-primary">Sem treinos programados</h3>
              </div>
            </div>
          ) : (
            <>
              <div className="h-32 bg-surface-container-highest relative">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
                <div className="absolute bottom-4 left-4 z-10 pr-4">
                  <span className="inline-block bg-background/80 px-2 py-1 rounded font-label-caps text-label-caps text-primary-fixed mb-2 uppercase tracking-widest">
                    {data.workoutOfDay.isCompletedToday ? 'TREINO CONCLUÍDO' : 'TREINO DO DIA'}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary uppercase">
                    <div className="flex items-center gap-2">
                      {data.workoutOfDay.description}
                      {data.workoutOfDay.isCompletedToday && (
                        <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      )}
                    </div>
                  </h3>
                </div>
              </div>

              <div className="p-gutter space-y-md">
                <div className="flex gap-sm flex-wrap">
                  {data.workoutOfDay.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full border border-white/20 bg-surface-container text-white font-label-caps text-label-caps uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                  {data.workoutOfDay.tags.length === 0 && (
                    <span className="px-3 py-1 rounded-full border border-white/20 bg-surface-container text-white font-label-caps text-label-caps uppercase tracking-widest">
                      GERAL
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-low p-sm rounded-lg border border-white/20">
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">VEZES REALIZADO</div>
                    <div className="font-data-display text-data-display text-primary">{String(data.workoutOfDay.timesCompleted).padStart(2, '0')}</div>
                  </div>
                  
                  <div className="bg-surface-container-low p-sm rounded-lg border border-white/20">
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">ÚLTIMA DATA</div>
                    <div className="font-data-display text-data-display text-primary">
                      {data.workoutOfDay.lastDate ? format(parseISO(data.workoutOfDay.lastDate.substring(0, 10)), 'dd MMM', { locale: ptBR }) : '--'}
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-sm rounded-lg border border-white/20 col-span-2">
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">ÚLTIMA DURAÇÃO</div>
                    <div className="font-data-display text-data-display text-primary">
                      {data.workoutOfDay.lastDuration ? formatDuration(data.workoutOfDay.lastDuration) : '--'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-2">
                  <button 
                    disabled={data.workoutOfDay.isCompletedToday}
                    className={`w-full font-headline-md text-headline-md py-3 rounded-full transition-colors flex justify-center items-center gap-2
                      ${data.workoutOfDay.isCompletedToday 
                        ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                        : 'bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim'
                      }
                    `}
                  >
                    {data.workoutOfDay.isCompletedToday ? 'FINALIZADO' : 'INICIAR TREINO'}
                  </button>
                  <button className="w-full bg-transparent border border-primary-fixed text-primary-fixed font-headline-md text-headline-md py-3 rounded-full hover:bg-surface-container-high transition-colors">
                    VER OUTROS TREINOS
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
