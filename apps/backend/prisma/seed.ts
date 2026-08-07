import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/gym_coach?schema=public'
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Starting seed...')

  // 1. Create a dummy user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashed_password_123', // In a real app, this should be hashed
    },
  })
  console.log(`Created user with id: ${user.id}`)

  // 2. Create a Workout
  const workout = await prisma.workout.create({
    data: {
      userId: user.id,
      order: 1,
      description: 'Peito e Tríceps',
      exercises: {
        create: [
          {
            name: 'Supino Reto',
            order: 1,
            sets: '4',
            reps: '10-10-8-8',
            restTimeSeconds: 90,
            lastWeight: '20kg cada lado',
          },
          {
            name: 'Supino Inclinado com Halteres',
            order: 2,
            sets: '3',
            reps: '10',
            restTimeSeconds: 60,
            lastWeight: '18kg',
          },
          {
            name: 'Tríceps Polia',
            order: 3,
            sets: '3',
            reps: 'falha',
            restTimeSeconds: 45,
            lastWeight: '10 placas',
          },
        ],
      },
    },
    include: {
      exercises: true,
    },
  })
  console.log(`Created workout with id: ${workout.id}`)

  // 3. Create a Workout History
  const history = await prisma.workoutHistory.create({
    data: {
      userId: user.id,
      workoutId: workout.id,
      workoutDescriptionSnapshot: workout.description,
      executedAt: new Date(),
      durationSeconds: 3600, // 1 hour
      exercises: {
        create: workout.exercises.map((exercise) => ({
          exerciseId: exercise.id,
          nameSnapshot: exercise.name,
          setsSnapshot: exercise.sets,
          repsSnapshot: exercise.reps,
          weightUsed: exercise.lastWeight, // Using last weight as the weight used for seed
          isCompleted: true,
          order: exercise.order,
        })),
      },
    },
  })
  console.log(`Created workout history with id: ${history.id}`)

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
