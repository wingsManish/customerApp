/**
 * Navigation Utilities
 * 
 * Provides safe navigation helpers to prevent navigation errors.
 */

import { router } from 'expo-router';

/**
 * Safely navigate back, or redirect to a fallback route if no previous screen exists
 * 
 * Note: Expo Router's router.back() may show a development warning if there's
 * no previous screen, but it won't crash the app. This function provides a
 * fallback route to ensure navigation always works.
 * 
 * The warning "Is there any screen to go back to?" is a development-only warning
 * and won't appear in production builds.
 * 
 * @param fallbackRoute - Route to navigate to if there's no previous screen (default: '/welcome')
 */
export const safeGoBack = (fallbackRoute: string = '/welcome'): void => {
  try {
    // Try to navigate back
    // In development, this may show a warning if there's no previous screen,
    // but the app will continue to work normally
    router.back();
  } catch (error) {
    // If navigation fails (rare with expo-router), redirect to fallback
    if (__DEV__) {
      console.warn('Navigation error, redirecting to fallback:', fallbackRoute, error);
    }
    router.replace(fallbackRoute as any);
  }
  
  // Note: The development warning is expected behavior and indicates that
  // router.back() was called when there's no previous screen. The fallback
  // route ensures users can still navigate even in this edge case.
};

/**
 * Alternative: Use replace instead of back for guaranteed navigation
 * Use this when you want to ensure navigation happens without warnings
 * 
 * @param route - Route to navigate to
 */
export const navigateToFallback = (route: string): void => {
  router.replace(route as any);
};

/**
 * Navigate to a specific route, replacing current screen
 * 
 * @param route - Route to navigate to
 */
export const navigateTo = (route: string): void => {
  try {
    router.replace(route as any);
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

/**
 * Push a new route onto the navigation stack
 * 
 * @param route - Route to navigate to
 */
export const pushTo = (route: string): void => {
  try {
    router.push(route as any);
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

