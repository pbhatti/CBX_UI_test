#!/bin/bash
# Push this project to https://github.com/pbhatti/CBX_UI_test.git
set -e
cd "$(dirname "$0")"

REMOTE="https://github.com/pbhatti/CBX_UI_test.git"
BRANCH="main"

# Init repo if needed
if [ ! -d .git ]; then
  git init
  echo "Initialized git repository."
fi

# Add remote if not already configured
if ! git remote get-url origin 2>/dev/null; then
  git remote add origin "$REMOTE"
  echo "Added remote 'origin' -> $REMOTE"
elif [ "$(git remote get-url origin)" != "$REMOTE" ]; then
  git remote set-url origin "$REMOTE"
  echo "Updated remote 'origin' -> $REMOTE"
fi

# Ensure we're on main (create if missing)
if ! git rev-parse --verify "$BRANCH" 2>/dev/null; then
  git branch -M main 2>/dev/null || true
fi
git checkout -B main 2>/dev/null || git checkout main

# Stage all changes, commit if needed, push
git add -A
if git diff --staged --quiet; then
  echo "Nothing to commit. Pushing existing commits..."
else
  git commit -m "Update: Initiative Prototype build"
  echo "Committed changes."
fi

git push -u origin main
echo "Done! Pushed to $REMOTE (branch: $BRANCH)"
