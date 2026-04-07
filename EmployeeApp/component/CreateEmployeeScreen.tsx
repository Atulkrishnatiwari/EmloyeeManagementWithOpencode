import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ApiModeToggle from '../src/components/ApiModeToggle';
import { useApiMode } from '../src/context/ApiModeContext';
import { createEmployee } from '../src/services/employeeApi';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function CreateEmployeeScreen() {
  const { apiMode, setApiMode } = useApiMode();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [image, setImage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setEmail('');
    setMobile('');
    setImage('');
  };

  const handleCreate = async () => {
    const payload = {
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      image: image.trim() || null,
    };

    if (!payload.name || !payload.email || !payload.mobile) {
      Alert.alert('Missing info', 'Name, email, and mobile are required.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await createEmployee(apiMode, payload);
      resetForm();
      Alert.alert('Saved', 'Employee created successfully.');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create employee',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add Employee</Text>
        <Text style={styles.subtitle}>Create a new team member.</Text>

        <ApiModeToggle value={apiMode} onChange={setApiMode} />

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Details</Text>
          <TextInput
            placeholder="Full name"
            placeholderTextColor="#8a847c"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#8a847c"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="Mobile"
            placeholderTextColor="#8a847c"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            placeholder="Image URL (optional)"
            placeholderTextColor="#8a847c"
            value={image}
            onChangeText={setImage}
            autoCapitalize="none"
            style={styles.input}
          />
          <Pressable
            style={[styles.primaryButton, styles.formButton]}
            onPress={handleCreate}
            disabled={submitting}
          >
            <Text style={styles.primaryButtonText}>
              {submitting ? 'Saving...' : 'Create'}
            </Text>
          </Pressable>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f1ea',
  },
  container: {
    padding: 20,
    backgroundColor: '#f6f1ea',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2b2420',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: '#6f645c',
  },
  formCard: {
    marginTop: 20,
    backgroundColor: '#fffaf4',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eadfd3',
    shadowColor: '#2b2420',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2b2420',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e1d8cc',
    marginBottom: 10,
    color: '#2b2420',
  },
  formButton: {
    marginTop: 6,
  },
  primaryButton: {
    backgroundColor: '#a35b2f',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff8f0',
    fontWeight: '600',
  },
  errorText: {
    marginTop: 12,
    color: '#b03a2e',
    fontWeight: '500',
  },
});
