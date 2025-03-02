import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Button from '../components/Button';

// Sample journal entries
const initialEntries = [
  { id: '1', date: 'May 10, 2023', content: 'Completed my morning walk and felt great. Need to increase duration tomorrow.', mood: 'happy' },
  { id: '2', date: 'May 9, 2023', content: 'Missed my cycling session today. Will make up for it tomorrow.', mood: 'sad' },
  { id: '3', date: 'May 8, 2023', content: 'Great progress with my sleep schedule. Slept for 8 hours straight.', mood: 'happy' },
];

export default function JournalScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [newEntry, setNewEntry] = useState('');
  const [mood, setMood] = useState('neutral');

  const addEntry = () => {
    if (newEntry.trim() === '') return;

    const today = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    const newJournalEntry = {
      id: Date.now().toString(),
      date: formattedDate,
      content: newEntry,
      mood: mood
    };

    setEntries([newJournalEntry, ...entries]);
    setNewEntry('');
    setMood('neutral');
  };

  const renderMoodIcon = (mood) => {
    switch(mood) {
      case 'happy':
        return <Ionicons name="happy-outline" size={24} color={Colors.primary} />;
      case 'sad':
        return <Ionicons name="sad-outline" size={24} color="#FF6B6B" />;
      default:
        return <Ionicons name="happy-outline" size={24} color={Colors.textSecondary} />;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryDate}>{item.date}</Text>
        <View style={styles.moodIcon}>
          {renderMoodIcon(item.mood)}
        </View>
      </View>
      <Text style={styles.entryContent}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Journal</Text>
      </LinearGradient>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="How was your habit journey today?"
          placeholderTextColor="#999"
          multiline
          value={newEntry}
          onChangeText={setNewEntry}
        />

        <View style={styles.moodSelector}>
          <Text style={styles.moodLabel}>How do you feel?</Text>
          <View style={styles.moodOptions}>
            <TouchableOpacity 
              style={[styles.moodOption, mood === 'happy' && styles.selectedMood]} 
              onPress={() => setMood('happy')}
            >
              <Ionicons name="happy-outline" size={28} color={mood === 'happy' ? Colors.primary : Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.moodOption, mood === 'neutral' && styles.selectedMood]} 
              onPress={() => setMood('neutral')}
            >
              <Ionicons name="happy-outline" size={28} color={mood === 'neutral' ? Colors.primary : Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.moodOption, mood === 'sad' && styles.selectedMood]} 
              onPress={() => setMood('sad')}
            >
              <Ionicons name="sad-outline" size={28} color={mood === 'sad' ? Colors.primary : Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <Button 
          title="Add Journal Entry" 
          onPress={addEntry}
          style={styles.addButton}
        />
      </View>

      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.entriesList}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/dashboard')}
        >
          <Ionicons name="grid-outline" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/journal')}
        >
          <Ionicons name="book-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/add-habit')}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  moodSelector: {
    marginTop: 15,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodOption: {
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#eee',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMood: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(0, 96, 214, 0.1)',
  },
  addButton: {
    marginTop: 15,
  },
  entriesList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  entryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  entryDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  moodIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryContent: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navButton: {
    padding: 10,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});