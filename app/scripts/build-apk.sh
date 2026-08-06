#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ANDROID_DIR="$SCRIPT_DIR"

echo "========================================="
echo "  Playables - Android Build"
echo "========================================="
echo ""

cd "$ANDROID_DIR"

echo "Checking prerequisites..."

if ! command -v java &> /dev/null; then
  echo "ERROR: Java is not installed or not in PATH"
  exit 1
fi

if ! command -v ./gradlew &> /dev/null; then
  echo "ERROR: gradlew not found in $ANDROID_DIR"
  exit 1
fi

echo "Java version: $(java -version 2>&1 | head -n 1)"
echo ""

echo "Cleaning previous builds..."
./gradlew clean

echo ""
echo "Building Release APK..."
echo ""

./gradlew assembleRelease

APK_PATH="app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
  echo ""
  echo "SUCCESS! APK built at: $APK_PATH"
  ls -lh "$APK_PATH"
else
  echo "ERROR: APK not found at expected path: $APK_PATH"
  exit 1
fi

echo ""
echo "Build complete!"

