import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Languages, ArrowRightLeft, Copy, Trash2, Volume2 } from 'lucide-react-native';
import { translateText } from '../services/api';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const TranslatorScreen = ({ onBack }: { onBack: () => void }) => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('Français');
  const [targetLang, setTargetLang] = useState('Malagasy');

  const handleTranslate = async () => {
    if (!inputText.trim() || loading) return;

    setLoading(true);
    try {
      const data = await translateText(inputText, targetLang);
      setTranslatedText(data.translated_text);
    } catch (error) {
      console.error(error);
      setTranslatedText("Miala tsiny, nisy olana kely tamin'ny dikan-teny.");
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar barStyle="dark-content" />
      <View className="px-4 py-4 bg-white border-b border-zinc-100 flex-row items-center">
        <Button variant="ghost" size="icon" onPress={onBack} className="mr-2">
          <ArrowLeft color="#18181b" size={24} />
        </Button>
        <Text className="text-xl font-bold text-zinc-900">Traducteur</Text>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <Card className="bg-[#f97316] border-0 mb-6">
          <Card.Body className="flex-row items-center">
            <View className="bg-white/20 p-3 rounded-2xl mr-4">
              <Languages color="white" size={32} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">Dikan-teny AI</Text>
              <Text className="text-white/80 text-sm">Mandika teny amin'ny fomba tsotra</Text>
            </View>
          </Card.Body>
        </Card>

        <View className="flex-row items-center justify-center bg-white rounded-2xl p-4 mb-6 border border-zinc-100 shadow-sm">
          <Text className="flex-1 text-center font-bold text-zinc-900">{sourceLang}</Text>
          <TouchableOpacity onPress={swapLanguages} className="bg-orange-50 p-2 rounded-full mx-4">
            <ArrowRightLeft color="#f97316" size={20} />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-bold text-zinc-900">{targetLang}</Text>
        </View>

        <Card className="mb-4">
          <Card.Body className="p-0">
            <Input
              placeholder="Ampidiro ny lahatsoratra..."
              value={inputText}
              onChangeText={setInputText}
              multiline
              numberOfLines={4}
              containerClassName="bg-transparent border-0 px-5 py-4 min-h-[120px]"
              className="mb-0"
              textAlignVertical="top"
            />
          </Card.Body>
          <Card.Footer className="border-t border-zinc-50 bg-zinc-50/50">
            <TouchableOpacity onPress={() => setInputText('')} className="p-2">
              <Trash2 color="#a1a1aa" size={18} />
            </TouchableOpacity>
            <Button 
              label="Handika" 
              size="sm" 
              onPress={handleTranslate} 
              loading={loading}
              className="bg-[#f97316]"
            />
          </Card.Footer>
        </Card>

        {translatedText ? (
          <Card className="mb-10 border-l-4 border-l-[#f97316]">
            <Card.Header className="pb-0">
              <Text className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{targetLang}</Text>
            </Card.Header>
            <Card.Body>
              <Text className="text-zinc-900 text-lg leading-7">{translatedText}</Text>
            </Card.Body>
            <Card.Footer className="bg-zinc-50/50">
              <View className="flex-row">
                <TouchableOpacity className="p-2 mr-2">
                  <Volume2 color="#a1a1aa" size={18} />
                </TouchableOpacity>
                <TouchableOpacity className="p-2">
                  <Copy color="#a1a1aa" size={18} />
                </TouchableOpacity>
              </View>
            </Card.Footer>
          </Card>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TranslatorScreen;
