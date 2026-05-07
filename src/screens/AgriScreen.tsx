import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Sprout, Calendar, Lightbulb } from 'lucide-react-native';
import { getAgriTips } from '../services/api';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AgriScreen = ({ onBack }: { onBack: () => void }) => {
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAgriTips();
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
        <Text className="text-xl font-bold text-zinc-900">MadaAgri</Text>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <Card className="bg-green-600 border-0 mb-6">
          <Card.Body className="flex-row items-center">
            <View className="bg-white/20 p-3 rounded-2xl mr-4">
              <Sprout color="white" size={32} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">Agriculture & Elevage</Text>
              <Text className="text-white/80 text-sm">Vokatra tsara, ho avy mamiratra</Text>
            </View>
          </Card.Body>
        </Card>

        {loading ? (
          <ActivityIndicator color="#16a34a" size="large" className="mt-10" />
        ) : (
          tips.map((tip, index) => (
            <Card key={index} className="mb-4">
              <Card.Header>
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-zinc-900">{tip.title}</Text>
                  <View className="bg-green-100 px-3 py-1 rounded-full flex-row items-center">
                    <Calendar color="#16a34a" size={12} className="mr-1" />
                    <Text className="text-green-700 text-[10px] font-bold uppercase">{tip.period}</Text>
                  </View>
                </View>
              </Card.Header>
              <Card.Body>
                <View className="flex-row items-start">
                  <Lightbulb color="#16a34a" size={18} className="mr-2 mt-1" />
                  <Text className="text-zinc-600 text-base leading-6 flex-1">{tip.tips}</Text>
                </View>
              </Card.Body>
            </Card>
          ))
        )}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AgriScreen;
