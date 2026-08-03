#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(dirname "$SCRIPT_DIR")"
ANDROID_DIR="$APP_DIR/android"

echo "========================================="
echo "  YouTube Playables - Generate Keystore"
echo "========================================="
echo ""

KEYSTORE_DIR="$APP_DIR/config"
KEYSTORE_FILE="$KEYSTORE_DIR/keystore.jks"

if [ -f "$KEYSTORE_FILE" ]; then
    echo "Keystore already exists at $KEYSTORE_FILE"
    echo "To regenerate, delete the existing file first."
    exit 0
fi

echo "Generating new keystore..."
echo ""

mkdir -p "$KEYSTORE_DIR"

keytool -genkeypair \
    -v \
    -keystore "$KEYSTORE_FILE" \
    -alias ytplayables \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -storepass "$(openssl rand -base64 32)" \
    -keypass "$(openssl rand -base64 32)" \
    -dname "CN=YouTube Playables, OU=Development, O=YTPlayables, L=City, ST=State, C=US"

echo ""
echo "Keystore generated at: $KEYSTORE_FILE"
echo ""
echo "IMPORTANT: Save the following credentials securely!"
echo "  Store password: (generated above)"
echo "  Key password: (generated above)"
echo "  Alias: ytplayables"
echo ""
echo "To use these in CI/CD, set these environment variables:"
echo "  KEYSTORE_FILE"
echo "  KEYSTORE_PASSWORD"
echo "  KEY_ALIAS"
echo "  KEY_PASSWORD"
echo ""