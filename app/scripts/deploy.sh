#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ANDROID_DIR="$(dirname "$SCRIPT_DIR")/android"

echo "========================================="
echo "  Playables - Deploy to Play Store"
echo "========================================="
echo ""

cd "$ANDROID_DIR"

echo "Building Release AAB..."
./gradlew bundleRelease

AAB_PATH="app/build/outputs/bundle/release/app-release.aab"

if [ ! -f "$AAB_PATH" ]; then
  echo "ERROR: AAB not found at $AAB_PATH"
  exit 1
fi

echo ""
echo "AAB ready for upload: $AAB_PATH"
echo ""
echo "Next steps:"
echo "1. Sign in to Google Play Console"
echo "2. Create or select your app"
echo "3. Go to Production > Create new release"
echo "4. Upload the AAB file"
echo "5. Fill in release notes"
echo "6. Review and start rollout"
echo ""

