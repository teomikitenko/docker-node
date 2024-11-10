FROM node:23-alpine
WORKDIR /app
COPY package*.json ./
RUN ["npm install","prisma generate"]
COPY . .
ENV DATABASE_URL="postgresql://neondb_owner:Py5GvjY1BUmK@ep-dry-dawn-a5quk94u.us-east-2.aws.neon.tech/neondb?sslmode=require"
EXPOSE 3000
RUN ["npm run build","prisma generate"]
CMD ["npm", "start"]
