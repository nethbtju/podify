#!/bin/bash

# Podify - Run Script
# Usage: sh run.sh

set -e

echo "🎵 Starting Podify..."

# Try to load nvm if it exists
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Try to add common node paths
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    echo ""
    echo "Please install Node.js using one of these methods:"
    echo ""
    echo "  Option 1 - Homebrew (recommended for macOS):"
    echo "    brew install node"
    echo ""
    echo "  Option 2 - Download from nodejs.org:"
    echo "    https://nodejs.org/en/download/"
    echo ""
    echo "  Option 3 - Using nvm:"
    echo "    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "    nvm install node"
    echo ""
    exit 1
fi

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🚀 Launching development server..."
npm start
