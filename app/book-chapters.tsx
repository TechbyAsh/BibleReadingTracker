
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import NeomorphBox from '../components/NeomorphBox';

export default function BookChaptersScreen() {
  const { id, name, chapters } = useLocalSearchParams();
  const router = useRouter();
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  const toggleChapter = (chapterNum: number) => {
    setCompletedChapters(prev => {
      if (prev.includes(chapterNum)) {
        return prev.filter(num => num !== chapterNum);
      } else {
        return [...prev, chapterNum];
      }
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{name}</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.chapterList}>
        {Array.from({ length: Number(chapters) }, (_, i) => i + 1).map(chapter => (
          <NeomorphBox key={chapter} style={styles.chapterCard}>
            <TouchableOpacity 
              style={styles.chapterContent}
              onPress={() => toggleChapter(chapter)}
            >
              <Text style={styles.chapterText}>Chapter {chapter}</Text>
              <Ionicons 
                name={completedChapters.includes(chapter) ? "checkmark-circle" : "circle-outline"} 
                size={24} 
                color={completedChapters.includes(chapter) ? Colors.primary : Colors.textSecondary} 
              />
            </TouchableOpacity>
          </NeomorphBox>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  chapterList: {
    padding: 15,
  },
  chapterCard: {
    marginBottom: 10,
    borderRadius: 10,
  },
  chapterContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterText: {
    fontSize: 16,
    color: Colors.text,
  },
});
