import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import ApiModeToggle from '../src/components/ApiModeToggle';
import { useApiMode } from '../src/context/ApiModeContext';
import {
  deleteEmployee,
  Employee,
  getEmployeeById,
  listEmployees,
} from '../src/services/employeeApi';

const EmptyAvatar = 'https://dummyimage.com/96x96/efece6/615e57.png&text=EMP';

export default function ShowAllEmployeeScreen() {
  const { apiMode, setApiMode } = useApiMode();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const loadEmployees = useCallback(
    async (query: string) => {
      setLoading(true);
      setError(null);
      try {
        const trimmed = query.trim();
        if (trimmed && /^\d+$/.test(trimmed)) {
          const employee = await getEmployeeById(apiMode, Number(trimmed));
          setEmployees(employee ? [employee] : []);
        } else {
          const list = await listEmployees(apiMode, {
            search: trimmed,
            page: 1,
            limit: 50,
          });
          setEmployees(list);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load employees',
        );
      } finally {
        setLoading(false);
      }
    },
    [apiMode],
  );

  useFocusEffect(
    useCallback(() => {
      loadEmployees('');
    }, [loadEmployees]),
  );

  const handleSearch = () => {
    loadEmployees(search);
  };

  const handleDelete = (id: number) => {
    Alert.alert('Delete employee', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteEmployee(apiMode, id);
            loadEmployees(search);
          } catch (err) {
            setError(
              err instanceof Error ? err.message : 'Failed to delete employee',
            );
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Employee }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image || EmptyAvatar }}
        style={styles.avatar}
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardDetail}>{item.email}</Text>
        <Text style={styles.cardDetail}>{item.mobile}</Text>
      </View>
      <Pressable
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Employees</Text>
        <Text style={styles.subtitle}>Search by ID or name.</Text>

        <ApiModeToggle value={apiMode} onChange={setApiMode} />

        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search by ID or name"
            placeholderTextColor="#8a847c"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <Pressable style={styles.primaryButton} onPress={handleSearch}>
            <Text style={styles.primaryButtonText}>Search</Text>
          </Pressable>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>All Employees</Text>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => loadEmployees(search)}
          >
            <Text style={styles.secondaryButtonText}>Refresh</Text>
          </Pressable>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" color="#a35b2f" />
        ) : (
          <FlatList
            data={employees}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No employees found.</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f1ea',
  },
  container: {
    flex: 1,
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
  searchRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fffaf4',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e1d8cc',
    color: '#2b2420',
  },
  listHeader: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2b2420',
  },
  primaryButton: {
    backgroundColor: '#a35b2f',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  primaryButtonText: {
    color: '#fff8f0',
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#a35b2f',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: '#a35b2f',
    fontWeight: '600',
  },
  errorText: {
    marginTop: 12,
    color: '#b03a2e',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 80,
  },
  card: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0e6da',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#efe7de',
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2b2420',
  },
  cardDetail: {
    color: '#6f645c',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#f6e1d4',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  deleteButtonText: {
    color: '#a1362f',
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#7d746b',
  },
});
