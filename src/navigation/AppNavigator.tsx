import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import BottomNavBar from '../components/BottomNavBar';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../store/store';

function getActiveRouteName(state: any): string {
  let route = state?.routes?.[state.index];
  while (route?.state) {
    route = route.state.routes[route.state.index];
  }
  return route?.name ?? '';
}

export default function AppNavigator() {
  const loading = useSelector((state: RootState) => state.account.loading, shallowEqual);

  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = React.useState<string>('Splash');
  const hiddenBars = ['Splash', 'Login', 'Signup', 'Rest'];

  React.useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', () => {
      const routeName = getActiveRouteName(navigationRef.getRootState());
      setCurrentRoute(routeName);
    });
    return unsubscribe;
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
      {(!hiddenBars.includes(currentRoute) && !loading) && <BottomNavBar />}
    </NavigationContainer>
  );
}
