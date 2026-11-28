# The image tag must match the @playwright/test version in package-lock.json (1.65.1)
FROM mcr.microsoft.com/playwright:v1.65.1-noble

WORKDIR /app

# Copy dependency manifests first so this layer is cached until they change
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]