export interface Exercise {
  id: string;
  name: string;
  order: number;
  sets: string;
  reps: string;
  restTimeSeconds: number;
  lastWeight?: string | null;
}

export interface Workout {
  id: string;
  order: number;
  description: string;
  tags: string[];
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
}
