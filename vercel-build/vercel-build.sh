#!/bin/bash
set -e

echo "--- Installing dependencies ---"
npm install

echo "--- Running build ---"
npm run build

echo "--- Verifying build output ---"
if [ ! -d "public" ]; then
  echo "Error: Build failed - public directory not found"
  exit 1
fi

echo "Build completed successfully!"
