#!/bin/bash
# Deploy this project to Vercel: https://cbx-ui-test.vercel.app
set -e
cd "$(dirname "$0")"

echo "Building..."
npm run build

echo "Deploying to Vercel (production)..."
npx vercel --prod

echo "Done! Check your Vercel dashboard for the deployment URL."
