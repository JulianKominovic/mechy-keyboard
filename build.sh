# Make sure TAURI_PRIVATE_KEY and TAURI_KEY_PASSWORD exist
if [ -z "$TAURI_PRIVATE_KEY" ]; then
  echo "Please set TAURI_PRIVATE_KEY"
  exit 1
fi



# Build the app
pnpm run tauri build --target universal-apple-darwin