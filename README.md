# .env.dev.local

EXPO_PUBLIC_ENV=
EXPO_PUBLIC_EAS_PROJECT_ID=
EXPO_PUBLIC_GOOGLE_SERVICES_JSON=
EXPO_PUBLIC_GOOGLE_SERVICES_PLIST=

# deeplink

xcrun simctl openurl booted "exp+app-justo-courier-dev://"
xcrun simctl openurl booted "https://dev.appjusto.com.br/"
adb shell am start -a android.intent.action.VIEW -d "exp+app-justo-courier-dev://"
adb shell am start -a android.intent.action.VIEW -d "https://dev.appjusto.com.br/"