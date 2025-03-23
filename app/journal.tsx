import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const initialEntries = [
  { id: '1', date: 'May 10, 2023', passage: 'Genesis 1:1-3', content: 'Reflection on God\'s creation and the power of His word.', mood: 'inspired' },
  { id: '2', date: 'May 9, 2023', passage: 'Psalm 23', content: 'The Lord is my shepherd - feeling grateful for His guidance.', mood: 'peaceful' },
];

export default function JournalScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [newEntry, setNewEntry] = useState('');
  const [passage, setPassage] = useState('');

  const addEntry = () => {
    if (newEntry.trim() === '') return;

    const today = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    const newJournalEntry = {
      id: Date.now().toString(),
      date: formattedDate,
      passage: passage,
      content: newEntry,
      mood: 'inspired'
    };

    setEntries([newJournalEntry, ...entries]);
    setNewEntry('');
    setPassage('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryDate}>{item.date}</Text>
        <Text style={styles.passageText}>{item.passage}</Text>
      </View>
      <Text style={styles.entryContent}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.gradient}
      >
        <Text style={styles.headerTitle}>Bible Study Journal</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.passageInput}
            placeholder="Bible Passage (e.g., John 3:16)"
            placeholderTextColor="#999"
            value={passage}
            onChangeText={setPassage}
          />
          <TextInput
            style={styles.input}
            placeholder="Write your reflections..."
            placeholderTextColor="#999"
            multiline
            value={newEntry}
            onChangeText={setNewEntry}
          />
          <TouchableOpacity style={styles.addButton} onPress={addEntry}>
            <Text style={styles.addButtonText}>Add Entry</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.entriesList}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  passageInput: {
    backgroundColor: Colors.cardHighlight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    backgroundColor: Colors.cardHighlight,
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    color: '#fff',
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  entriesList: {
    flex: 1,
  },
  entryCard: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  entryDate: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  passageText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '600',
  },
  entryContent: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
});