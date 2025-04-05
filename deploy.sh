#!/bin/bash
set -e

# Navigate to the project directory
cd ~/event-webapp

# Configure git pull strategy
git config pull.rebase false

# Reset any local changes to avoid conflicts
git reset --hard HEAD

# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Set up environment variables
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/event_app_prod" > .env

# Generate Prisma client
npx prisma generate

# Build the application
npm run build


# Restart the application with PM2
pm2 restart event-webapp || pm2 start npm --name "event-webapp" -- start

# Save PM2 state
pm2 save