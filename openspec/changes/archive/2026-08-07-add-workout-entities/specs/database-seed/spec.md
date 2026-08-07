## ADDED Requirements

### Requirement: Database Seed Script
O sistema DEVE conter um script de *seed* (ex: `prisma/seed.ts`) capaz de popular o banco de dados com dados falsos. Ele deve criar um Usuário de teste e vincular instâncias das entidades de Treino e Histórico de Treino a ele.

#### Scenario: Running the database seed
- **WHEN** the developer executes the seed script (`npx prisma db seed`)
- **THEN** the database should be populated with at least one mock User, one Workout template with exercises, and one Workout History entry
