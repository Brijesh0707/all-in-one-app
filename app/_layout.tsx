import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to splash screen on app start
    router.replace('/splash');
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="services" />
    </Stack>
  );
}
