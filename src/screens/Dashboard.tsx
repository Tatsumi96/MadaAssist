import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Mic, 
  CloudRain, 
  Sprout, 
  HeartPulse, 
  Languages, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react-native';
import { getWeather, getAgriTips } from '../services/api';
import { Card } from '../components/ui/Card';

const features = [
  { name: 'MadaChat', icon: Mic, color: 'bg-[#007E3A]', iconColor: '#FFFFFF', description: 'Assistant Vocal' },
  { name: 'Meteo', icon: CloudRain, color: 'bg-blue-500/10', iconColor: '#3b82f6', description: 'Météo & Cyclones' },
  { name: 'MadaAgri', icon: Sprout, color: 'bg-green-600/10', iconColor: '#16a34a', description: 'Agriculture' },
  { name: 'MadaHealth', icon: HeartPulse, color: 'bg-red-500/10', iconColor: '#ef4444', description: 'Santé' },
  { name: 'Traduction', icon: Languages, color: 'bg-orange-500/10', iconColor: '#f97316', description: 'Traducteur' },
  { name: 'Alertes', icon: AlertTriangle, color: 'bg-yellow-500/10', iconColor: '#eab308', description: 'Urgences' },
];

const Dashboard = ({ 
  onNavigateToChat,
  onNavigateToHealth,
  onNavigateToAlerts,
  onNavigateToAgri,
  onNavigateToWeather,
  onNavigateToTranslator
}: { 
  onNavigateToChat: () => void,
  onNavigateToHealth: () => void,
  onNavigateToAlerts: () => void,
  onNavigateToAgri: () => void,
  onNavigateToWeather: () => void,
  onNavigateToTranslator: () => void
}) => {
  const [weather, setWeather] = useState<any>(null);
  const [agriTip, setAgriTip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const weatherData = await getWeather();
        const agriData = await getAgriTips();
        setWeather(weatherData);
        if (agriData && agriData.length > 0) setAgriTip(agriData[0]);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des données:", err);
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePress = (name: string) => {
    switch (name) {
      case 'MadaChat': onNavigateToChat(); break;
      case 'MadaHealth': onNavigateToHealth(); break;
      case 'Alertes': onNavigateToAlerts(); break;
      case 'Meteo': onNavigateToWeather(); break;
      case 'MadaAgri': onNavigateToAgri(); break;
      case 'Traduction': onNavigateToTranslator(); break;
      default: break;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar barStyle="dark-content" />
      <View className="px-6 py-6 bg-white flex-row justify-between items-center">
        <View>
          <Text className="text-3xl font-extrabold text-zinc-900 tracking-tight">MadaAssist</Text>
          <Text className="text-zinc-500 font-medium">Iray ihany ny hery</Text>
        </View>
        {weather && (
          <TouchableOpacity 
            onPress={onNavigateToWeather}
            className="items-end bg-zinc-100 px-4 py-2 rounded-2xl"
          >
            <Text className="text-xl font-bold text-zinc-900">{Math.round(weather.main?.temp || 0)}°C</Text>
            <Text className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{weather.weather?.[0]?.description || ''}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {error && (
          <View className="bg-red-50 p-4 rounded-3xl mb-6 border border-red-100 flex-row items-center">
            <AlertTriangle color="#ef4444" size={20} />
            <Text className="text-red-600 ml-3 font-semibold">{error}</Text>
          </View>
        )}

        <View className="flex-row flex-wrap justify-between">
          {features.map((item, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => handlePress(item.name)}
              activeOpacity={0.7}
              className="w-[48%] mb-4"
            >
              <Card className="h-40">
                <Card.Body className="justify-between">
                  <View className={`${item.color} w-12 h-12 rounded-2xl items-center justify-center`}>
                    <item.icon color={item.iconColor} size={24} />
                  </View>
                  <View>
                    <Text className="text-lg font-bold text-zinc-900">{item.name}</Text>
                    <Text className="text-xs text-zinc-500 font-medium">{item.description}</Text>
                  </View>
                </Card.Body>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {agriTip && (
          <TouchableOpacity onPress={onNavigateToAgri} activeOpacity={0.9}>
            <Card className="bg-[#007E3A] border-0 mt-2 mb-10">
              <Card.Header>
                <View className="flex-row items-center">
                  <View className="bg-white/20 p-2 rounded-xl">
                    <Sprout color="white" size={20} />
                  </View>
                  <Text className="text-white text-xl font-bold ml-3">MadaAgri Tips</Text>
                </View>
              </Card.Header>
              <Card.Body>
                <Text className="text-white text-lg font-bold mb-1">{agriTip.title}</Text>
                <Text className="text-white/80 text-sm italic mb-3">Période: {agriTip.period}</Text>
                <Text className="text-white text-base leading-6">
                  "{agriTip.tips}"
                </Text>
              </Card.Body>
              <Card.Footer>
                <Text className="text-white/60 text-xs font-medium">Source: MadaAssist Agri</Text>
                <View className="bg-white/20 px-4 py-2 rounded-xl">
                  <Text className="text-white font-bold text-xs">Voir plus</Text>
                </View>
              </Card.Footer>
            </Card>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
