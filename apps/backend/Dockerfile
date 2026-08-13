# Build Stage
FROM node:20-slim AS builder
WORKDIR /app

# Instalar OpenSSL para o Prisma (necessário no Debian slim)
RUN apt-get update -y && apt-get install -y openssl

# Copiar package.json e dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar todas as dependências (incluindo devDependencies como typescript)
RUN npm install

# Gerar cliente do Prisma
RUN npx prisma generate

# Copiar o código fonte e fazer o build
COPY . .
RUN npm run build

# Remover devDependencies para deixar a imagem final mais leve
RUN npm prune --omit=dev

# Production Stage
FROM node:20-slim
WORKDIR /app

# Instalar OpenSSL para o Prisma no runtime
RUN apt-get update -y && apt-get install -y openssl

# Copiar apenas os artefatos necessários da etapa de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Variável de ambiente esperada pelo Cloud Run
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
