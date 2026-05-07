import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  HeartPulse, 
  ShieldAlert, 
  Droplet, 
  CheckCircle2 
} from 'lucide-react-native';
import { getHealthTips } from '../services/api';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const HealthScreen = ({ onBack }: { onBack: () => void }) => {
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHealthTips();
        setTips(data);
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
        <Text className="text-xl font-bold text-zinc-900">MadaHealth</Text>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <Card className="bg-red-500 border-0 mb-6">
          <Card.Body className="flex-row items-center">
            <View className="bg-white/20 p-3 rounded-2xl mr-4">
              <HeartPulse color="white" size={32} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">Torohevitra momba ny fahasalamana</Text>
              <Text className="text-white/80 text-sm">Miaro ny ainao sy ny ankohonanao</Text>
            </View>
          </Card.Body>
        </Card>

        {loading ? (
          <ActivityIndicator color="#ef4444" size="large" className="mt-10" />
        ) : (
          tips.map((tip, index) => (
            <Card key={index} className="mb-4">
              <Card.Header>
                <View className="flex-row items-center">
                  <View className="bg-red-100 p-2 rounded-xl mr-3">
                    <CheckCircle2 color="#ef4444" size={20} />
                  </View>
                  <Text className="text-lg font-bold text-zinc-900">{tip.title}</Text>
                </View>
              </Card.Header>
              <Card.Body>
                <Text className="text-zinc-600 text-base leading-6">{tip.content}</Text>
              </Card.Body>
            </Card>
          ))
        )}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthScreen;
