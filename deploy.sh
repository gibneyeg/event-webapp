#!/bin/bash
# Enable basic error handling
set -e


# Navigate to the project directory
cd ~/event-webapp

# Track the current HEAD before pulling
BEFORE_PULL=$(git rev-parse HEAD)

# Configure git pull strategy
git config pull.rebase false

# Reset any local changes to avoid conflictsa
git reset --hard HEAD

# Pull latest changes
git pull origin main

# Track the new HEAD after pulling
AFTER_PULL=$(git rev-parse HEAD)

# Check if package.json changed
if [ "$BEFORE_PULL" != "$AFTER_PULL" ] && git diff --name-only $BEFORE_PULL $AFTER_PULL | grep -q "package.json"; then
  npm install --production --no-audit --no-fund
else
  echo "DEPLOY: No package changes, skipping npm install"
fi

npm run build


# Restart the application with PM2
pm2 restart event-webapp || pm2 start npm --name "event-webapp" -- start
