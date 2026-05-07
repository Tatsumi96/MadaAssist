import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import './global.css';
import Dashboard from './src/screens/Dashboard';
import ChatScreen from './src/screens/ChatScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'chat'>('dashboard');

  return (
    <>
      {currentScreen === 'dashboard' ? (
        <Dashboard onNavigateToChat={() => setCurrentScreen('chat')} />
      ) : (
        <ChatScreen onBack={() => setCurrentScreen('dashboard')} />
      )}
      <StatusBar style="auto" />
    </>
  );
}
