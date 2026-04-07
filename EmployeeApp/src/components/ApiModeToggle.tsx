import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ApiMode } from '../services/employeeApi';

type ApiModeToggleProps = {
  value: ApiMode;
  onChange: (mode: ApiMode) => void;
};

export default function ApiModeToggle({ value, onChange }: ApiModeToggleProps) {
  return (
    <View style={styles.apiRow}>
      <Text style={styles.apiLabel}>API</Text>
      <View style={styles.apiToggle}>
        <Pressable
          style={[styles.apiButton, value === 'rest' && styles.apiButtonActive]}
          onPress={() => onChange('rest')}
        >
          <Text
            style={[
              styles.apiButtonText,
              value === 'rest' && styles.apiButtonTextActive,
            ]}
          >
            REST
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.apiButton,
            value === 'graphql' && styles.apiButtonActive,
          ]}
          onPress={() => onChange('graphql')}
        >
          <Text
            style={[
              styles.apiButtonText,
              value === 'graphql' && styles.apiButtonTextActive,
            ]}
          >
            GraphQL
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  apiRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  apiLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6f645c',
    letterSpacing: 0.6,
  },
  apiToggle: {
    flexDirection: 'row',
    backgroundColor: '#efe7de',
    borderRadius: 14,
    padding: 4,
  },
  apiButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  apiButtonActive: {
    backgroundColor: '#2b2420',
  },
  apiButtonText: {
    color: '#5e5249',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  apiButtonTextActive: {
    color: '#fff8f0',
  },
});
