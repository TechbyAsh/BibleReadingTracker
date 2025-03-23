
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import NeomorphBox from '../components/NeomorphBox';

const bibleBooks = [
  { id: '1', name: 'Genesis', testament: 'Old', chapters: 50, completed: 10 },
  { id: '2', name: 'Exodus', testament: 'Old', chapters: 40, completed: 5 },
  { id: '3', name: 'Matthew', testament: 'New', chapters: 28, completed: 15 },
  { id: '4', name: 'Mark', testament: 'New', chapters: 16, completed: 8 },
  // Add more books...
];

export default function BooksAndChaptersScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, unread
  const router = useRouter();

  const filteredBooks = bibleBooks.filter(book => {
    const matchesSearch = book.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'completed' ? book.completed === book.chapters :
      filter === 'unread' ? book.completed === 0 : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Bible Reading</Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <View style={styles.filterButtons}>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
            onPress={() => setFilter('all')}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
            onPress={() => setFilter('completed')}
          >
            <Text style={styles.filterText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'unread' && styles.activeFilter]}
            onPress={() => setFilter('unread')}
          >
            <Text style={styles.filterText}>Unread</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.bookList}>
        {['Old', 'New'].map(testament => (
          <View key={testament}>
            <Text style={styles.testamentTitle}>{testament} Testament</Text>
            {filteredBooks
              .filter(book => book.testament === testament)
              .map(book => (
                <NeomorphBox key={book.id} style={styles.bookCard}>
                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle}>{book.name}</Text>
                    <Text style={styles.chaptersInfo}>
                      {book.completed}/{book.chapters} chapters
                    </Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar,
                        { width: `${(book.completed / book.chapters) * 100}%` }
                      ]} 
                    />
                  </View>
                </NeomorphBox>
              ))}
          </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: Colors.text,
  },
  bookList: {
    padding: 15,
  },
  testamentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.text,
  },
  bookCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  bookInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  chaptersInfo: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
});
