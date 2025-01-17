import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { StyleSheet } from 'react-native';

const CalendarRecordSection = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>식단 0</ThemedText>
      <ThemedText>운동 0</ThemedText>
      <ThemedText>신체 0</ThemedText>
    </ThemedView>
  );
};

export default CalendarRecordSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
});
