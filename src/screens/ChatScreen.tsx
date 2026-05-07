import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, ArrowLeft, Bot, User, Sparkles } from 'lucide-react-native';
import { sendChatMessage } from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const ChatScreen = ({ onBack }: { onBack: () => void }) => {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Message[]>([
    { role: 'model', content: 'Salama! MadaAssist aho, afaka manampy anao ve?' }
  ]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage('');
    
    const newHistory: Message[] = [...history, { role: 'user', content: userMessage }];
    setHistory(newHistory);
    setLoading(true);

    try {
      // Formater l'historique pour l'API
      const apiHistory = newHistory.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await sendChatMessage(userMessage, apiHistory);
      setHistory([...newHistory, { role: 'model', content: response.response }]);
    } catch (error) {
      console.error("Erreur Chat:", error);
      setHistory([...newHistory, { role: 'model', content: "Miala tsiny, nisy olana kely ny fifandraisana. Andramo indray azafady." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (history.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [history]);

  const renderItem = ({ item }: { item: Message }) => (
    <View className={`mb-6 flex-row ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {item.role === 'model' && (
        <View className="bg-green-100 w-10 h-10 rounded-xl items-center justify-center mr-3 mt-1">
          <Bot size={20} color="#007E3A" />
        </View>
      )}
      <View 
        className={`max-w-[80%] px-5 py-4 rounded-3xl ${
          item.role === 'user' 
            ? 'bg-[#007E3A] rounded-tr-none' 
            : 'bg-white border border-zinc-100 rounded-tl-none shadow-sm'
        }`}
      >
        <Text className={`text-base leading-6 ${item.role === 'user' ? 'text-white font-medium' : 'text-zinc-800'}`}>
          {item.content}
        </Text>
      </View>
      {item.role === 'user' && (
        <View className="bg-zinc-200 w-10 h-10 rounded-xl items-center justify-center ml-3 mt-1">
          <User size={20} color="#52525b" />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar barStyle="dark-content" />
      <View className="px-4 py-4 bg-white border-b border-zinc-100 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onPress={onBack}
            className="mr-2"
          >
            <ArrowLeft color="#18181b" size={24} />
          </Button>
          <View>
            <Text className="text-xl font-bold text-zinc-900">MadaChat</Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              <Text className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Assistant AI</Text>
            </View>
          </View>
        </View>
        <View className="bg-green-50 p-2 rounded-xl">
          <Sparkles size={20} color="#007E3A" />
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <FlatList
          ref={flatListRef}
          data={history}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-20 px-10">
              <View className="bg-green-100 p-6 rounded-[40px] mb-6">
                <Bot size={48} color="#007E3A" />
              </View>
              <Text className="text-2xl font-bold text-zinc-900 text-center mb-3">Salama! Izaho no MadaChat</Text>
              <Text className="text-zinc-500 text-center text-lg leading-6">
                Afaka manampy anao amin'ny fambolena, fahasalamana, na dikan-teny aho. Inona no azo anampiana anao?
              </Text>
            </View>
          )}
        />

        <View className="p-4 bg-white border-t border-zinc-100">
          <View className="flex-row items-end">
            <View className="flex-1 mr-3">
              <Input
                placeholder="Manorata hafatra..."
                value={message}
                onChangeText={setMessage}
                multiline
                containerClassName="bg-zinc-100 border-0 rounded-[28px] px-5 py-3.5"
                className="mb-0"
              />
            </View>
            <Button 
              onPress={handleSend}
              disabled={!message.trim() || loading}
              size="icon"
              className="rounded-[28px] h-[56px] w-[56px]"
              loading={loading}
            >
              <Send color="white" size={22} />
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
