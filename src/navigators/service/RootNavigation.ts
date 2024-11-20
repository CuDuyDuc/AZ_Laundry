
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: string, params?: Record<string, any>): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}