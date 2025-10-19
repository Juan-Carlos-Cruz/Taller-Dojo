# Backend dev image
FROM node:20-alpine

WORKDIR /app

# Install deps (cached by package*.json)
COPY package*.json ./
RUN npm ci

# Copy source (will be overridden by volume in dev)
COPY . .

ENV NODE_ENV=development
ENV PORT=5000

EXPOSE 5000

# nodemon is in devDependencies, use script "dev"
CMD ["npm", "run", "dev"]
