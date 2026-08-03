#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ANDROID_DIR="$(dirname "$SCRIPT_DIR")/android"

echo "========================================="
echo "  YouTube Playables - AAB Build"
echo "========================================="
echo ""

cd "$ANDROID_DIR"

echo "Building Release AAB..."
echo ""

./gradlew bundleRelease

AAB_PATH="app/build/outputs/bundle/release/app-release.aab"
if [ -f "$AAB_PATH" ]; then
    echo ""
    echo "SUCCESS! AAB built at: $AAB_PATH"
    ls -lh "$AAB_PATH"
else
    echo "ERROR: AAB not found at expected path: $AAB_PATH"
    exit 1
fi

echo ""
echo "Build complete!"