import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, AlertTriangle, Info, Bell } from 'lucide-react-native';
import { getAlerts } from '../services/api';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AlertsScreen = ({ onBack }: { onBack: () => void }) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAlerts();
        setAlerts(data);
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
        <Text className="text-xl font-bold text-zinc-900">Alertes & Urgences</Text>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <Card className="bg-yellow-500 border-0 mb-6">
          <Card.Body className="flex-row items-center">
            <View className="bg-white/20 p-3 rounded-2xl mr-4">
              <Bell color="white" size={32} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">Fampandrenesana</Text>
              <Text className="text-white/80 text-sm">Vao vao farany sy fanairana</Text>
            </View>
          </Card.Body>
        </Card>

        {loading ? (
          <ActivityIndicator color="#f5a524" size="large" className="mt-10" />
        ) : alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <Card key={index} className="mb-4 border-l-4 border-l-yellow-500">
              <Card.Header>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <AlertTriangle color="#f5a524" size={20} className="mr-2" />
                    <Text className="text-lg font-bold text-zinc-900">{alert.title}</Text>
                  </View>
                  <Text className="text-[10px] font-bold text-zinc-400">{alert.date}</Text>
                </View>
              </Card.Header>
              <Card.Body>
                <Text className="text-zinc-600 text-base leading-6">{alert.description}</Text>
              </Card.Body>
              <Card.Footer>
                <View className="bg-yellow-100 px-3 py-1 rounded-full">
                  <Text className="text-yellow-700 text-xs font-bold uppercase">{alert.severity}</Text>
                </View>
              </Card.Footer>
            </Card>
          ))
        ) : (
          <View className="items-center justify-center py-20">
            <Info color="#a1a1aa" size={48} />
            <Text className="text-zinc-400 mt-4 font-medium">Tsy misy alerte amin'izao fotoana izao</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertsScreen;
