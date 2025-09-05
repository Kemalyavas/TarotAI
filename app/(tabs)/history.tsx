import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, Eye } from 'lucide-react-native';

const readingHistory = [
  {
    id: 1,
    type: 'Love & Relationships',
    date: '2024-01-15',
    time: '14:30',
    cards: ['The Lovers', 'Two of Cups', 'The Star'],
    summary: 'A beautiful reading about finding harmony in relationships and trusting your heart.',
  },
  {
    id: 2,
    type: 'Career & Success',
    date: '2024-01-12',
    time: '09:15',
    cards: ['The Magician', 'Ace of Pentacles', 'The Sun'],
    summary: 'Success is within reach. Your skills and determination will lead to new opportunities.',
  },
  {
    id: 3,
    type: 'Personal Growth',
    date: '2024-01-10',
    time: '20:45',
    cards: ['The Hermit', 'Death', 'The World'],
    summary: 'A transformative period is ending. Embrace the wisdom gained from your inner journey.',
  },
  {
    id: 4,
    type: 'General Guidance',
    date: '2024-01-08',
    time: '16:20',
    cards: ['The Fool'],
    summary: 'New beginnings await. Trust in your ability to take the first step toward your dreams.',
  },
];

export default function HistoryScreen() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1F1B29', '#2D1B69', '#1F1B29']}
        style={styles.headerGradient}>
        <Text style={styles.title}>Reading History</Text>
        <Text style={styles.subtitle}>Revisit your past insights and wisdom</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {readingHistory.map((reading) => (
          <TouchableOpacity key={reading.id} style={styles.historyCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.cardGradient}>
              
              <View style={styles.cardHeader}>
                <View style={styles.typeContainer}>
                  <Text style={styles.readingType}>{reading.type}</Text>
                </View>
                <TouchableOpacity style={styles.viewButton}>
                  <Eye size={20} color="#F59E0B" />
                </TouchableOpacity>
              </View>

              <View style={styles.dateTimeContainer}>
                <View style={styles.dateTime}>
                  <Calendar size={16} color="#9CA3AF" />
                  <Text style={styles.dateText}>{formatDate(reading.date)}</Text>
                </View>
                <View style={styles.dateTime}>
                  <Clock size={16} color="#9CA3AF" />
                  <Text style={styles.timeText}>{reading.time}</Text>
                </View>
              </View>

              <View style={styles.cardsContainer}>
                {reading.cards.map((card, index) => (
                  <View key={index} style={styles.cardChip}>
                    <Text style={styles.cardChipText}>{card}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.summary}>{reading.summary}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {readingHistory.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No readings yet</Text>
            <Text style={styles.emptyStateText}>
              Your reading history will appear here after you complete your first reading.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
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
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'CrimsonText-SemiBold',
    fontSize: 32,
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  historyCard: {
    marginBottom: 20,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  typeContainer: {
    flex: 1,
  },
  readingType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFF',
  },
  viewButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 20,
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  cardChip: {
    backgroundColor: 'rgba(107, 70, 193, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cardChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#A855F7',
  },
  summary: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#E5E7EB',
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontFamily: 'CrimsonText-SemiBold',
    fontSize: 24,
    color: '#FFF',
    marginBottom: 10,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});