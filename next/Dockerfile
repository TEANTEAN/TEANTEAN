# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
ARG GDRIVE_PRIVATE_KEY_ID_TEMP
ARG GDRIVE_PRIVATE_KEY_TEMP
RUN echo GDRIVE_PRIVATE_KEY_ID = ${GDRIVE_PRIVATE_KEY_ID_TEMP} >> ./.env.local 
RUN echo GDRIVE_PRIVATE_KEY = ${GDRIVE_PRIVATE_KEY_TEMP} >> ./.env.local 
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ENV NODE_ENV production
ENV NEXT_PUBLIC_BACKEND_URL "https://genyus-backend-strapi.herokuapp.com"
ENV NEXTAUTH_URL "https://gn-frontend.vercel.app"

RUN yarn build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

ENV NODE_ENV production
ENV NEXT_PUBLIC_BACKEND_URL "https://genyus-backend-strapi.herokuapp.com"
ENV NEXTAUTH_URL "https://gn-frontend.vercel.app"

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# RUN npx next telemetry disable

CMD ["yarn", "start"]
