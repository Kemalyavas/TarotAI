import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, Moon, Star, Heart } from 'lucide-react-native';
import { useFonts, CrimsonText_400Regular, CrimsonText_600SemiBold } from '@expo-google-fonts/crimson-text';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    'CrimsonText-Regular': CrimsonText_400Regular,
    'CrimsonText-SemiBold': CrimsonText_600SemiBold,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  const [sparkleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1F1B29', '#2D1B69', '#1F1B29']}
        style={styles.headerGradient}>
        
        <View style={styles.header}>
          <Animated.View style={[styles.sparkleIcon, { opacity: sparkleOpacity }]}>
            <Sparkles size={32} color="#F59E0B" />
          </Animated.View>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appTitle}>TarotAI</Text>
          <Text style={styles.subtitle}>Discover Your Path Through Ancient Wisdom</Text>
        </View>

        <View style={styles.dailyCard}>
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={['#6B46C1', '#8B5CF6', '#A855F7']}
              style={styles.card}>
              <Star size={40} color="#FFF" strokeWidth={1.5} />
            </LinearGradient>
          </View>
          <View style={styles.dailyCardText}>
            <Text style={styles.dailyCardTitle}>Card of the Day</Text>
            <Text style={styles.dailyCardSubtitle}>The Star</Text>
            <Text style={styles.dailyCardDescription}>
              Hope, inspiration, and spiritual guidance illuminate your path today.
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Choose Your Reading</Text>
        
        <View style={styles.readingTypes}>
          <TouchableOpacity style={styles.readingCard}>
            <LinearGradient
              colors={['#EC4899', '#F97316']}
              style={styles.readingCardGradient}>
              <Heart size={24} color="#FFF" />
            </LinearGradient>
            <Text style={styles.readingCardTitle}>Love & Relationships</Text>
            <Text style={styles.readingCardDesc}>3 Cards • 5 min</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.readingCard}>
            <LinearGradient
              colors={['#3B82F6', '#1D4ED8']}
              style={styles.readingCardGradient}>
              <Sparkles size={24} color="#FFF" />
            </LinearGradient>
            <Text style={styles.readingCardTitle}>Career & Success</Text>
            <Text style={styles.readingCardDesc}>5 Cards • 8 min</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.readingCard}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.readingCardGradient}>
              <Moon size={24} color="#FFF" />
            </LinearGradient>
            <Text style={styles.readingCardTitle}>Personal Growth</Text>
            <Text style={styles.readingCardDesc}>7 Cards • 12 min</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.readingCard}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.readingCardGradient}>
              <Star size={24} color="#FFF" />
            </LinearGradient>
            <Text style={styles.readingCardTitle}>General Guidance</Text>
            <Text style={styles.readingCardDesc}>1 Card • 2 min</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionText}>Free Daily Reading</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.quickActionButton, styles.premiumButton]}>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.premiumGradient}>
              <Text style={styles.premiumButtonText}>Unlock Premium Readings</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0C19',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sparkleIcon: {
    marginBottom: 10,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 5,
  },
  appTitle: {
    fontFamily: 'CrimsonText-SemiBold',
    fontSize: 42,
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  dailyCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardContainer: {
    marginRight: 15,
  },
  card: {
    width: 60,
    height: 90,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyCardText: {
    flex: 1,
  },
  dailyCardTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#F59E0B',
    marginBottom: 4,
  },
  dailyCardSubtitle: {
    fontFamily: 'CrimsonText-SemiBold',
    fontSize: 20,
    color: '#FFF',
    marginBottom: 8,
  },
  dailyCardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'CrimsonText-SemiBold',
    fontSize: 28,
    color: '#FFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  readingTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  readingCard: {
    width: (width - 50) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  readingCardGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  readingCardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 6,
  },
  readingCardDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  quickActions: {
    gap: 15,
  },
  quickActionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickActionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
  premiumButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  premiumGradient: {
    width: '100%',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  premiumButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
});