#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ANDROID_DIR="$(dirname "$SCRIPT_DIR")/android"

echo "========================================="
echo "  YouTube Playables - Debug APK Build"
echo "========================================="
echo ""

cd "$ANDROID_DIR"

echo "Building Debug APK..."
echo ""

./gradlew assembleDebug

APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    echo ""
    echo "SUCCESS! Debug APK built at: $APK_PATH"
    ls -lh "$APK_PATH"
else
    echo "ERROR: Debug APK not found at expected path: $APK_PATH"
    exit 1
fi

echo ""
echo "Build complete!"