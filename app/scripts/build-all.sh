#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ANDROID_DIR="$(dirname "$SCRIPT_DIR")/android"

echo "========================================="
echo "  YouTube Playables - One-Command Build"
echo "========================================="
echo ""

cd "$ANDROID_DIR"

echo "Cleaning previous builds..."
./gradlew clean

echo ""
echo "Building Debug APK..."
./gradlew assembleDebug
echo "Debug APK: app/build/outputs/apk/debug/app-debug.apk"

echo ""
echo "Building Release APK..."
./gradlew assembleRelease
echo "Release APK: app/build/outputs/apk/release/app-release.apk"

echo ""
echo "Building Release AAB..."
./gradlew bundleRelease
echo "Release AAB: app/build/outputs/bundle/release/app-release.aab"

echo ""
echo "========================================="
echo "  All builds complete!"
echo "========================================="