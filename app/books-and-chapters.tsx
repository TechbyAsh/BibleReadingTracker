
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import NeomorphBox from '../components/NeomorphBox';
import NavigationBar from '../components/NavigationBar';

const BIBLE_BOOKS = [
  { id: '1', name: 'Genesis', chapters: 50 },
  { id: '2', name: 'Exodus', chapters: 40 },
  { id: '3', name: 'Leviticus', chapters: 27 },
  { id: '4', name: 'Matthew', chapters: 28 },
  { id: '5', name: 'Mark', chapters: 16 },
  { id: '6', name: 'Luke', chapters: 24 },
  { id: '7', name: 'John', chapters: 21 },
  // Add more books as needed
];

export default function BooksAndChaptersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bible Books</Text>
        </View>

        <ScrollView style={styles.bookList}>
          {BIBLE_BOOKS.map((book) => (
            <TouchableOpacity
              key={book.id}
              onPress={() => router.push({
                pathname: '/book-chapters',
                params: { id: book.id, name: book.name, chapters: book.chapters }
              })}
            >
              <NeomorphBox style={styles.bookCard}>
                <View style={styles.bookContent}>
                  <Text style={styles.bookTitle}>{book.name}</Text>
                  <View style={styles.chaptersInfo}>
                    <Text style={styles.chaptersText}>{book.chapters} chapters</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
                  </View>
                </View>
              </NeomorphBox>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bookList: {
    flex: 1,
  },
  bookCard: {
    marginBottom: 12,
    borderRadius: 12,
  },
  bookContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  chaptersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chaptersText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
});
