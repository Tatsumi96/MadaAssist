import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import Dashboard from './src/screens/Dashboard';
import ChatScreen from './src/screens/ChatScreen';
import HealthScreen from './src/screens/HealthScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import AgriScreen from './src/screens/AgriScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import TranslatorScreen from './src/screens/TranslatorScreen';

type Screen = 'dashboard' | 'chat' | 'health' | 'alerts' | 'agri' | 'weather' | 'translator';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <Dashboard 
            onNavigateToChat={() => setCurrentScreen('chat')} 
            onNavigateToHealth={() => setCurrentScreen('health')}
            onNavigateToAlerts={() => setCurrentScreen('alerts')}
            onNavigateToAgri={() => setCurrentScreen('agri')}
            onNavigateToWeather={() => setCurrentScreen('weather')}
            onNavigateToTranslator={() => setCurrentScreen('translator')}
          />
        );
      case 'chat':
        return <ChatScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'health':
        return <HealthScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'alerts':
        return <AlertsScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'agri':
        return <AgriScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'weather':
        return <WeatherScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'translator':
        return <TranslatorScreen onBack={() => setCurrentScreen('dashboard')} />;
      default:
        return <Dashboard 
          onNavigateToChat={() => setCurrentScreen('chat')} 
          onNavigateToHealth={() => setCurrentScreen('health')}
          onNavigateToAlerts={() => setCurrentScreen('alerts')}
          onNavigateToAgri={() => setCurrentScreen('agri')}
          onNavigateToWeather={() => setCurrentScreen('weather')}
          onNavigateToTranslator={() => setCurrentScreen('translator')}
        />;
    }
  };

  return (
    <SafeAreaProvider>
      {renderScreen()}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
