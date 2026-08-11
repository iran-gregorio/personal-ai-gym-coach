'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { format } from 'date-fns';

interface WorkoutHistoryExercise {
  id: string;
  exerciseId: string;
  nameSnapshot: string;
  setsSnapshot: string;
  repsSnapshot: string;
  weightUsed: string | null;
  isCompleted: boolean;
  order: number;
}

interface WorkoutHistory {
  id: string;
  workoutId: string;
  workoutDescriptionSnapshot: string;
  executedAt: string;
  durationSeconds: number;
  exercises: WorkoutHistoryExercise[];
}

export default function ExecuteWorkoutPage() {
  const router = useRouter();
  const params = useParams();
  const workoutId = params.workoutId as string;

  const [history, setHistory] = useState<WorkoutHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Timer state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const startWorkout = async () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${apiUrl}/api/execution/start`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            workoutId, 
            executedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
          })
        });

        if (res.status === 401) {
          localStorage.removeItem('token');
          router.push('/');
          return;
        }

        if (!res.ok) {
          throw new Error('Falha ao iniciar o treino');
        }

        const result = await res.json();
        setHistory(result);
        
        // Start the local timer counting up from the execution start time
        const localTimeString = result.executedAt.endsWith('Z') 
          ? result.executedAt.slice(0, -1) 
          : result.executedAt;
        const startTime = new Date(localTimeString).getTime();
        setElapsedSeconds(Math.max(0, Math.floor((new Date().getTime() - startTime) / 1000)));
        timerIntervalRef.current = setInterval(() => {
          const now = new Date().getTime();
          setElapsedSeconds(Math.max(0, Math.floor((now - startTime) / 1000)));
        }, 1000);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    startWorkout();

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [workoutId, router]);

  const handleUpdateExercise = async (exerciseId: string, updates: { isCompleted?: boolean, weightUsed?: string }) => {
    if (!history) return;

    // Optimistic update
    const updatedExercises = history.exercises.map(ex => {
      if (ex.id === exerciseId) {
        return { ...ex, ...updates };
      }
      return ex;
    });
    setHistory({ ...history, exercises: updatedExercises });

    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      await fetch(`${apiUrl}/api/execution/exercise/${exerciseId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
    } catch (err) {
      console.error('Falha ao atualizar o exercício', err);
    }
  };

  const handleFinishWorkout = async () => {
    if (!history) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      await fetch(`${apiUrl}/api/execution/finish/${history.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          finishedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        })
      });
      router.push('/dashboard');
    } catch (err) {
      console.error('Falha ao finalizar o treino', err);
      setLoading(false);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading && !history) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center">
        <p className="text-on-surface-variant font-body-md">Iniciando treino...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center flex-col p-4">
        <p className="text-error mb-4 font-body-md">{error}</p>
        <button onClick={() => router.push('/dashboard')} className="text-primary-fixed underline font-body-md">Voltar para o Dashboard</button>
      </div>
    );
  }

  if (!history) return null;

  const completedCount = history.exercises.filter(e => e.isCompleted).length;
  const totalCount = history.exercises.length;
  const progressPercent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-margin-mobile h-16 md:px-margin-desktop">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-on-surface-variant cursor-pointer">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="font-headline-md text-headline-md uppercase">
            {history.workoutDescriptionSnapshot}
          </div>
        </div>
        
        {/* Timer */}
        <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full border border-white/10">
          <span className="material-symbols-outlined text-primary-fixed text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          <span className="font-data-display text-[16px] text-primary">{formatTimer(elapsedSeconds)}</span>
        </div>
      </header>

      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto space-y-md">
        
        {/* Progress Bar */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
              Progresso
            </span>
            <span className="font-label-caps text-label-caps text-primary-fixed">
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-fixed transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </section>

        {/* Exercises List */}
        <section className="space-y-4">
          {history.exercises.map((exercise) => (
            <div 
              key={exercise.id} 
              className={`glass-panel p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
                exercise.isCompleted ? 'border-primary-fixed bg-surface-container/50' : 'border-white/10 bg-surface-container'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleUpdateExercise(exercise.id, { isCompleted: !exercise.isCompleted })}
                  className="mt-1 flex-shrink-0 cursor-pointer text-primary-fixed"
                >
                  {exercise.isCompleted ? (
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_box</span>
                  ) : (
                    <span className="material-symbols-outlined text-3xl">check_box_outline_blank</span>
                  )}
                </button>
                <div>
                  <h3 className={`font-headline-sm text-headline-sm uppercase ${exercise.isCompleted ? 'line-through text-on-surface-variant' : 'text-primary'}`}>
                    {exercise.nameSnapshot}
                  </h3>
                  <p className="font-body-sm text-body-sm text-secondary-fixed-dim uppercase tracking-widest">
                    {exercise.setsSnapshot} SÉRIES • {exercise.repsSnapshot} REPETIÇÕES
                  </p>
                </div>
              </div>

              {/* Weight Input */}
              <div className="flex items-center gap-2 bg-surface-container-highest rounded-full px-4 py-2 border border-white/5 w-full md:w-48 justify-end">
                <input
                  type="text"
                  className="bg-transparent border-none text-right font-data-display text-[18px] text-primary focus:outline-none flex-1 min-w-0"
                  placeholder="0"
                  value={exercise.weightUsed || ''}
                  onChange={(e) => {
                    // Update state locally immediately
                    const updatedExercises = history.exercises.map(ex => {
                      if (ex.id === exercise.id) {
                        return { ...ex, weightUsed: e.target.value };
                      }
                      return ex;
                    });
                    setHistory({ ...history, exercises: updatedExercises });
                  }}
                  onBlur={(e) => {
                    // Save on blur
                    handleUpdateExercise(exercise.id, { weightUsed: e.target.value });
                  }}
                />
                <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">KG</span>
              </div>
            </div>
          ))}
        </section>

      </main>

      {/* Floating Action Button for Finish */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background via-background/90 to-transparent flex justify-center pb-8 md:pb-12 pointer-events-none">
        <button 
          onClick={handleFinishWorkout}
          className="pointer-events-auto px-12 py-4 font-headline-md text-headline-md rounded-full transition-all flex justify-center items-center gap-2 bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim shadow-[0_0_20px_rgba(157,255,108,0.3)] min-w-[280px]"
        >
          FINALIZAR TREINO
        </button>
      </div>
    </div>
  );
}
