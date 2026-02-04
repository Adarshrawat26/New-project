#!/bin/bash
set -e

# Render build script - optimized for Render environment
echo "Building HRMS API Backend..."

# Update pip, setuptools, and wheel
pip install --upgrade pip setuptools wheel

# Try to install with only binary wheels first
echo "Installing dependencies (binary wheels only)..."
pip install --only-binary=:all: -r requirements.txt 2>/dev/null || \
pip install --prefer-binary -r requirements.txt || \
pip install -r requirements.txt

echo "✅ Build completed successfully!"
