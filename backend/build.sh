# Render build script
set -e

# Install dependencies with binary preference
pip install --prefer-binary --upgrade pip
pip install --prefer-binary -r requirements.txt

echo "Build completed successfully!"
