import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CloudRain, Thermometer, Droplets, MapPin, Wind } from 'lucide-react-native';
import { getWeather } from '../services/api';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const WeatherScreen = ({ onBack }: { onBack: () => void }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeather('Antananarivo');
        setWeather(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar barStyle="dark-content" />
      <View className="px-4 py-4 bg-white border-b border-zinc-100 flex-row items-center">
        <Button variant="ghost" size="icon" onPress={onBack} className="mr-2">
          <ArrowLeft color="#18181b" size={24} />
        </Button>
        <Text className="text-xl font-bold text-zinc-900">Meteo</Text>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator color="#3b82f6" size="large" className="mt-10" />
        ) : weather && (
          <>
            <Card className="bg-blue-500 border-0 mb-6">
              <Card.Body className="items-center py-8">
                <View className="flex-row items-center mb-2">
                  <MapPin color="white" size={16} className="mr-1" />
                  <Text className="text-white text-lg font-bold">{weather.name}</Text>
                </View>
                <Text className="text-white text-6xl font-extrabold mb-2">{Math.round(weather.main?.temp || 0)}°C</Text>
                <Text className="text-white/90 text-xl font-medium capitalize">{weather.weather?.[0]?.description}</Text>
              </Card.Body>
            </Card>

            <View className="flex-row justify-between mb-6">
              <Card className="w-[48%] py-4">
                <Card.Body className="items-center">
                  <Thermometer color="#3b82f6" size={24} className="mb-2" />
                  <Text className="text-zinc-500 text-xs font-bold uppercase mb-1">Humidité</Text>
                  <Text className="text-zinc-900 text-lg font-bold">{weather.main?.humidity}%</Text>
                </Card.Body>
              </Card>
              <Card className="w-[48%] py-4">
                <Card.Body className="items-center">
                  <Wind color="#3b82f6" size={24} className="mb-2" />
                  <Text className="text-zinc-500 text-xs font-bold uppercase mb-1">Vent</Text>
                  <Text className="text-zinc-900 text-lg font-bold">12 km/h</Text>
                </Card.Body>
              </Card>
            </View>

            <Card className="mb-6">
              <Card.Header>
                <Text className="font-bold text-zinc-900">Mombamomba ny andro</Text>
              </Card.Header>
              <Card.Body>
                <View className="flex-row items-center justify-between py-3 border-b border-zinc-50">
                  <Text className="text-zinc-500">Maripana farany ambany</Text>
                  <Text className="text-zinc-900 font-bold">{Math.round(weather.main?.temp - 3)}°C</Text>
                </View>
                <View className="flex-row items-center justify-between py-3 border-b border-zinc-50">
                  <Text className="text-zinc-500">Maripana farany ambony</Text>
                  <Text className="text-zinc-900 font-bold">{Math.round(weather.main?.temp + 4)}°C</Text>
                </View>
                <View className="flex-row items-center justify-between py-3">
                  <Text className="text-zinc-500">Tsindrin'ny rivotra</Text>
                  <Text className="text-zinc-900 font-bold">1015 hPa</Text>
                </View>
              </Card.Body>
            </Card>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherScreen;
