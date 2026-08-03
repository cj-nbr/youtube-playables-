#!/bin/bash

APP_NAME="ytplayables-android"
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
ANDROID_DIR="$APP_DIR/android"

echo "========================================="
echo "  $APP_NAME - Setup Script"
echo "========================================="
echo ""

cd "$ANDROID_DIR"

echo "1. Checking Android Studio..."
if ! command -v studio &> /dev/null; then
    echo "   Android Studio not found in PATH"
    echo "   Please install Android Studio or add it to PATH"
fi

echo "2. Checking Java..."
if ! command -v java &> /dev/null; then
    echo "   ERROR: Java is not installed"
    exit 1
fi
echo "   Java found: $(java -version 2>&1 | head -n 1)"

echo "3. Checking Gradle wrapper..."
if [ ! -f "gradlew" ]; then
    echo "   Gradle wrapper not found. Generating..."
    echo "   Please run: ./gradlew wrapper"
    echo "   Or use Android Studio to generate the wrapper"
fi

echo "4. Checking Android SDK..."
if [ -z "$ANDROID_HOME" ]; then
    echo "   ANDROID_HOME not set"
    echo "   Please set ANDROID_HOME environment variable"
else
    echo "   ANDROID_HOME: $ANDROID_HOME"
fi

echo ""
echo "5. Installing dependencies..."
npm install

echo ""
echo "6. Syncing Capacitor..."
npx cap sync

echo ""
echo "========================================="
echo "  Setup complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "  1. Open Android Studio: npx cap open android"
echo "  2. Build: ./scripts/build-all.sh"
echo "  3. Deploy: ./scripts/deploy.sh"
echo ""