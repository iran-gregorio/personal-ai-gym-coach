'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Workout } from '../../../../types/workout';
import { useParams } from 'next/navigation';
import { ExerciseVideoModal } from '../../../../components/ExerciseVideoModal';

export default function WorkoutPreviewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Video Modal State
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedVideoName, setSelectedVideoName] = useState<string>('');

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${apiUrl}/api/workouts/${id}`, {
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

        if (res.status === 404) {
          throw new Error('Treino não encontrado');
        }

        if (!res.ok) {
          throw new Error('Falha ao buscar detalhes do treino');
        }

        const result = await res.json();
        setWorkout(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkout();
    }
  }, [id, router]);

  const openVideo = (url: string, name: string) => {
    setSelectedVideoUrl(url);
    setSelectedVideoName(name);
  };

  const closeVideo = () => {
    setSelectedVideoUrl(null);
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-32">
      <ExerciseVideoModal 
        isOpen={!!selectedVideoUrl}
        onClose={closeVideo}
        videoUrl={selectedVideoUrl}
        exerciseName={selectedVideoName}
      />
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
          Detalhes do Treino
        </div>
        <div className="w-8 md:w-20"></div> {/* Spacer to center the title */}
      </header>

      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto space-y-md">
        {loading ? (
          <div className="flex justify-center p-8">
            <p className="text-on-surface-variant font-body-md">Carregando detalhes do treino...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-8 bg-surface-container rounded-xl border border-error/20">
            <p className="text-error mb-4 font-body-md">{error}</p>
            <button onClick={() => router.back()} className="text-primary-fixed underline font-body-md">Voltar</button>
          </div>
        ) : workout ? (
          <>
            <section className="mb-6">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg uppercase">{workout.description}</h1>
              
              <div className="flex gap-sm flex-wrap mt-4">
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
            </section>

            <section className="space-y-4">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">list</span>
                Exercícios ({workout.exercises.length})
              </h2>

              {workout.exercises.length === 0 ? (
                <p className="text-on-surface-variant font-body-md">Nenhum exercício cadastrado neste treino.</p>
              ) : (
                <div className="flex flex-col gap-sm">
                  {workout.exercises.map((exercise, index) => (
                    <div key={exercise.id} className="bg-surface-container rounded-xl p-4 border border-white/10 flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-headline-md text-headline-md font-bold text-white uppercase">{index + 1}. {exercise.name}</h3>
                        {exercise.videoUrl && (
                          <button 
                            onClick={() => openVideo(exercise.videoUrl!, exercise.name)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-bold uppercase tracking-wider shrink-0"
                          >
                            <span className="material-symbols-outlined text-[16px]">play_circle</span>
                            <span className="hidden sm:inline">Ver Execução</span>
                            <span className="inline sm:hidden">Vídeo</span>
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                        <div className="bg-surface-container-high p-2 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-xs text-on-surface-variant uppercase font-label-caps">Séries</span>
                          <span className="font-bold text-primary-fixed">{exercise.sets}</span>
                        </div>
                        <div className="bg-surface-container-high p-2 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-xs text-on-surface-variant uppercase font-label-caps">Reps</span>
                          <span className="font-bold text-primary-fixed">{exercise.reps}</span>
                        </div>
                        <div className="bg-surface-container-high p-2 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-xs text-on-surface-variant uppercase font-label-caps">Descanso</span>
                          <span className="font-bold text-primary-fixed">{exercise.restTimeSeconds}s</span>
                        </div>
                        <div className="bg-surface-container-high p-2 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-xs text-on-surface-variant uppercase font-label-caps">Carga Anterior</span>
                          <span className="font-bold text-primary-fixed">{exercise.lastWeight || '-'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-background/80 backdrop-blur-xl border-t border-white/10 z-40">
              <button 
                onClick={() => router.push(`/dashboard/execute/${workout.id}`)}
                className="w-full h-14 rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                Iniciar Treino
              </button>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
