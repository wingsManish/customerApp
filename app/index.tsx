import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

import { getSession, getNextRoute, hasValidSession } from '@/services/sessionService';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const navigateFromSession = async () => {
      try {
        const isValid = await hasValidSession();
        if (!isMounted) return;

        const nextRoute = isValid ? getNextRoute(await getSession()) : '/welcome';
        const delay = isValid ? 1500 : 2000;

        setTimeout(() => {
          if (!isMounted) return;
          router.replace(nextRoute);
          SplashScreen.hideAsync().catch(() => {});
        }, delay);
      } catch (error) {
        console.error('Error determining initial route:', error);
        setTimeout(() => {
          if (!isMounted) return;
          router.replace('/welcome');
          SplashScreen.hideAsync().catch(() => {});
        }, 2000);
      }
    };

    navigateFromSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return null;
}

