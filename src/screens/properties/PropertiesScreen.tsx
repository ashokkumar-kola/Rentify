import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';

import { api } from '../../api/apiClient';

import { Property } from '../../api/types/property';

import { Colors } from '../../constants';

import BuyPropertyCard from '../../components/BuyPropertyCard';
import TopNavBar from '../../components/TopNavBar';

const PropertiesScreen = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getProperties = async () => {
        try {
        setIsLoading(true);
        setError(null);

        const response = await api.get('/properties');

        if (!response.data || !response.data.data) {
            throw new Error('Invalid response structure');
        }

        const { success, data, message, errors } = response.data;

        const propertiesData = data;

        if (!Array.isArray(propertiesData)) {
            throw new Error('Expected array of properties');
        }

        setProperties(propertiesData);
        } catch (err) {
            console.error('Error fetching properties:', error);
            setError(err instanceof Error ? err.message : 'Failed to fetch properties');
            setProperties([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProperties();
    }, []);

    const renderPropertyItem = ({ item }: { item: Property }) => (
        <BuyPropertyCard
            title={item.title}
            location={item.location.city + ', ' + item.location.locality}
            tags= {item.amenities.map((amenity) => ({
                label: amenity,
                color: Colors.primary, // Default color, can be customized
            }))}
            type= { item.property_type }
            bedrooms={item.bedrooms}
            bathrooms={item.bathrooms}
            area={item.area}
            price={item.price}
            priceType="mo"
            extraLabelLeft={{ label: 'Security Deposit', value: item.deposit }} // {item.extraLabelLeft}
            extraLabelRight={{ label: 'Available From', value: ' ' }} // {item.extraLabelRight}
            primaryLabel="Schedule Visit"
            secondaryLabel="Contact Owner"
            onPrimaryAction={() => console.log('Schedule Visit')}
            onSecondaryAction={() => console.log('Contact Owner')}
        />
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
                // keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        );
    };

    return (
        <View style={styles.container}>
            <TopNavBar />
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
    color: Colors.primary,
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
