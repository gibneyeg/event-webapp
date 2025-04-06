#!/bin/bash
# Enable basic error handling
set -e


# Navigate to the project directory
cd ~/event-webapp


git reset --hard origin/main

# Pull latest changes
git pull origin main

# Check if package.json changed
if [ "$BEFORE_PULL" != "$AFTER_PULL" ] && git diff --name-only $BEFORE_PULL $AFTER_PULL | grep -q "package.json"; then
  npm install --production --no-audit --no-fund
else
  echo "DEPLOY: No package changes, skipping npm install"
fi

npm run build


# Restart the application with PM2
pm2 restart event-webapp || pm2 start npm --name "event-webapp" -- start
