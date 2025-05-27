import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Constants should be in uppercase and preferably in a separate config file
const API_BASE_URL = 'http://10.0.2.2:3000';

// Create axios instance with better configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

type Property = {
  id: string;
  title: string;
  // Add other property fields as needed
};

const PropertiesScreen = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

  const getProperties = async () => {
    try {
      setIsLoading(true);
    //   setError(null);

      const response = await api.get('/api/properties');

      // Validate response structure
      if (!response.data || !response.data.properties) {
        throw new Error('Invalid response structure');
      }

      const propertiesData = response.data.properties;

      // Ensure we have an array
      if (!Array.isArray(propertiesData)) {
        throw new Error('Expected array of properties');
      }

      setProperties(propertiesData);
    } catch (error) {
        console.error('Error fetching properties:', error);
        // setError(error instanceof Error ? error.message : 'Failed to fetch properties');
        setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const renderPropertyItem = ({ item }: { item: Property }) => (
    <View style={styles.propertyItem}>
      <Text style={styles.propertyTitle}>{item.title}</Text>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" style={styles.loader} />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (properties.length === 0) {
      return <Text style={styles.emptyText}>No properties found</Text>;
    }

    return (
      <FlatList
        data={properties}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Properties</Text>
      {renderContent()}
    </View>
  );
};

export default PropertiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  propertyItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  propertyTitle: {
    fontSize: 16,
    color: '#444',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});