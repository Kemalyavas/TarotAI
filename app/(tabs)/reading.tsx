import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const tarotCards = [
  { id: 1, name: 'The Fool', meaning: 'New beginnings, innocence, spontaneity' },
  { id: 2, name: 'The Magician', meaning: 'Manifestation, resourcefulness, power' },
  { id: 3, name: 'The High Priestess', meaning: 'Intuition, sacred knowledge, divine feminine' },
  { id: 4, name: 'The Empress', meaning: 'Femininity, beauty, nature, abundance' },
  { id: 5, name: 'The Emperor', meaning: 'Authority, establishment, structure, father figure' },
  { id: 6, name: 'The Hierophant', meaning: 'Spiritual wisdom, religious beliefs, conformity' },
  { id: 7, name: 'The Lovers', meaning: 'Love, harmony, relationships, values alignment' },
  { id: 8, name: 'The Chariot', meaning: 'Control, willpower, success, determination' },
  { id: 9, name: 'Strength', meaning: 'Strength, courage, persuasion, influence' },
  { id: 10, name: 'The Hermit', meaning: 'Soul searching, introspection, inner guidance' },
];

export default function ReadingScreen() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [cardAnimations] = useState(
    tarotCards.map(() => new Animated.Value(0))
  );
  const [flipAnimations] = useState(
    tarotCards.map(() => new Animated.Value(0))
  );

  useEffect(() => {
    // Animate cards entrance
    const animations = cardAnimations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      })
    );
    Animated.parallel(animations).start();
  }, []);

  const handleCardPress = (cardIndex: number) => {
    if (selectedCards.length >= 3 || selectedCards.includes(cardIndex)) return;

    // Flip animation
    Animated.timing(flipAnimations[cardIndex], {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    setSelectedCards([...selectedCards, cardIndex]);
  };

  const generateReading = () => {
    if (selectedCards.length < 3) return;
    
    setIsReading(true);
    setTimeout(() => {
      setIsReading(false);
      setShowReading(true);
    }, 2000);
  };

  const resetReading = () => {
    setSelectedCards([]);
    setShowReading(false);
    setIsReading(false);
    
    // Reset all animations
    cardAnimations.forEach(anim => anim.setValue(0));
    flipAnimations.forEach(anim => anim.setValue(0));
    
    // Re-animate cards
    const animations = cardAnimations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      })
    );
    Animated.parallel(animations).start();
  };

  if (showReading) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#1F1B29', '#2D1B69', '#1F1B29']}
          style={styles.readingContainer}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={resetReading} style={styles.backButton}>
              <ArrowLeft size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.readingTitle}>Your Reading</Text>
            <TouchableOpacity onPress={resetReading}>
              <RotateCcw size={24} color="#F59E0B" />
            </TouchableOpacity>
          </View>

          <View style={styles.selectedCardsContainer}>
            {selectedCards.map((cardIndex, index) => (
              <View key={cardIndex} style={styles.readingCard}>
                <LinearGradient
                  colors={['#6B46C1', '#8B5CF6']}
                  style={styles.readingCardGradient}>
                  <Text style={styles.cardPosition}>
                    {index === 0 ? 'Past' : index === 1 ? 'Present' : 'Future'}
                  </Text>
                  <Text style={styles.cardName}>{tarotCards[cardIndex].name}</Text>
                </LinearGradient>
                <Text style={styles.cardMeaning}>
                  {tarotCards[cardIndex].meaning}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.interpretation}>
            <Text style={styles.interpretationTitle}>AI Interpretation</Text>
            <Text style={styles.interpretationText}>
              The cards reveal a powerful message about your journey. Your past experiences have laid 
              the foundation for transformation. In the present moment, you're being called to embrace 
              your inner wisdom and trust your intuition. The future holds promise of new beginnings 
              and spiritual growth. Remember that you have the strength to overcome any challenges 
              and create the life you desire.
            </Text>
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Reading</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  if (isReading) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#1F1B29', '#2D1B69', '#1F1B29']}
          style={styles.loadingContainer}>
          <Animated.View style={{ transform: [{ rotate: '360deg' }] }}>
            <Sparkles size={48} color="#F59E0B" />
          </Animated.View>
          <Text style={styles.loadingText}>Reading your cards...</Text>
          <Text style={styles.loadingSubtext}>The universe is aligning your message</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1F1B29', '#2D1B69', '#1F1B29']}
        style={styles.cardSelectionContainer}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Choose 3 Cards</Text>
          <Text style={styles.subtitle}>
            Trust your intuition and select the cards that call to you
          </Text>
        </View>

        <View style={styles.progressIndicator}>
          <Text style={styles.progressText}>
            {selectedCards.length}/3 cards selected
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(selectedCards.length / 3) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.cardsGrid}>
          {tarotCards.map((card, index) => {
            const isSelected = selectedCards.includes(index);
            const scale = cardAnimations[index];
            const rotateY = flipAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg'],
            });

            return (
              <TouchableOpacity
                key={card.id}
                onPress={() => handleCardPress(index)}
                disabled={selectedCards.length >= 3 && !isSelected}
                style={styles.cardWrapper}>
                <Animated.View
                  style={[
                    styles.cardContainer,
                    {
                      transform: [{ scale }, { rotateY }],
                      opacity: selectedCards.length >= 3 && !isSelected ? 0.3 : 1,
                    },
                  ]}>
                  <LinearGradient
                    colors={
                      isSelected 
                        ? ['#F59E0B', '#D97706'] 
                        : ['#374151', '#4B5563']
                    }
                    style={[
                      styles.card,
                      isSelected && styles.selectedCard,
                    ]}>
                    {isSelected ? (
                      <View style={styles.selectedCardContent}>
                        <Text style={styles.selectedCardName}>{card.name}</Text>
                        <Sparkles size={20} color="#FFF" />
                      </View>
                    ) : (
                      <View style={styles.cardBack}>
                        <Text style={styles.cardBackText}>?</Text>
                      </View>
                    )}
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedCards.length === 3 && (
          <TouchableOpacity 
            style={styles.readButton}
            onPress={generateReading}>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.readButtonGradient}>
              <Text style={styles.readButtonText}>Reveal Your Reading</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0C19',
  },
  cardSelectionContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontFamily: 'CrimsonText-SemiBold',
    fontSize: 32,
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  progressIndicator: {
    marginBottom: 30,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#F59E0B',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 2,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  cardWrapper: {
    width: (width - 60) / 3,
    marginBottom: 15,
  },
  cardContainer: {
    width: '100%',
    aspectRatio: 2/3,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    elevation: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardBack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBackText: {
    fontSize: 40,
    color: '#9CA3AF',
    fontFamily: 'CrimsonText-SemiBold',
  },
  selectedCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCardName: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  readButton: {
    marginTop: 'auto',
  },
  readButtonGradient: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  readButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Inter-SemiBold',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 24,
    color: '#FFF',
    fontFamily: 'CrimsonText-SemiBold',
    marginTop: 20,
  },
  loadingSubtext: {
    fontSize: 16,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
    marginTop: 10,
    textAlign: 'center',
  },
  readingContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
  },
  readingTitle: {
    fontSize: 28,
    color: '#FFF',
    fontFamily: 'CrimsonText-SemiBold',
  },
  selectedCardsContainer: {
    marginBottom: 30,
  },
  readingCard: {
    marginBottom: 20,
  },
  readingCardGradient: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 10,
  },
  cardPosition: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Inter-Medium',
    marginBottom: 5,
  },
  cardName: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'CrimsonText-SemiBold',
  },
  cardMeaning: {
    fontSize: 16,
    color: '#D1D5DB',
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  interpretation: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  interpretationTitle: {
    fontSize: 20,
    color: '#F59E0B',
    fontFamily: 'CrimsonText-SemiBold',
    marginBottom: 15,
  },
  interpretationText: {
    fontSize: 16,
    color: '#E5E7EB',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  saveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Inter-SemiBold',
  },
});