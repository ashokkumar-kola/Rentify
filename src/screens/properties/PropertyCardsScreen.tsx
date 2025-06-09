import React, { useState, useEffect, useCallback } from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { api } from '../../api/apiClient';
import { Colors, Fonts } from '../../constants';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import PropertyOverviewCard from '../../components/PropertyCards/PropertyOverviewCard';
import PriceHighlightCard from '../../components/PropertyCards/PriceHighlightCard';

type Property = {
  _id: string;
  title: string;
  location: any;
  price: string;
  deposit: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnishing?: string;
  amenities?: Array<{ label: string; color: string; icon: string }>;
  status?: 'available' | 'sold' | 'rented';
  is_verified?: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
  is_deleted?: boolean;
  isForRent?: boolean;
  [key: string]: any;
};

const PropertyCardsScreen = ({ navigation }: { navigation: any }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      setError(null);
      const response = await api.get('/users/683a90f8f6efc4411a486d34/properties');

      if (response?.data?.data) {
        const formattedProperties = response.data.data.map((prop: Property) => ({
          ...prop,
          id: prop._id,
          amenities: prop.amenities || [],
          isForRent: prop.status === 'available',
        }));

        setProperties(formattedProperties);
        // console.log('Fetched properties:', properties);
      } else {
        setError('No properties found');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleViewDetails = (propertyId: string) => {
    navigation.navigate('PropertyDetails', { propertyId });
  };

  const handleContactAgent = (propertyId: string) => {
    navigation.navigate('ContactAgent', { propertyId });
  };

  const renderPriceHighlightCard = ({ item }: { item: Property }) => (
    <PriceHighlightCard
      title={item.title}
      location={item.location.locality + ', ' + item.location.city}
      price={item.price}
      deposit={item.deposit}
      is_verified={item.is_verified || false}
      isForRent={item.isForRent || false}
      onPrimaryAction={() => handleContactAgent(item._id)}
      onSecondaryAction={() => handleViewDetails(item._id)}
      primaryLabel="Contact"
      secondaryLabel="View Details"
    />
  );

  const renderPropertyCard = ({ item }: { item: Property }) => (
    <PropertyOverviewCard
      id={item._id}
      title={item.title}
      location={item.location}
      price={item.price}
      deposit={item.deposit}
      property_type={item.property_type}
      bedrooms={item.bedrooms}
      bathrooms={item.bathrooms}
      area={item.area}
      furnishing={item.furnishing || 'Not specified'}
      amenities={item.amenities || []}
      status={item.status || 'available'}
      is_verified={item.is_verified || false}
      description={item.description || ''}
      createdAt={item.createdAt}
      updatedAt={item.updatedAt}
      is_deleted={item.is_deleted || false}
      isForRent={item.isForRent || false}
      onPrimaryAction={() => handleContactAgent(item._id)}
      onSecondaryAction={() => handleViewDetails(item._id)}
      primaryLabel="Contact"
      secondaryLabel="View Details"
      extraLabelLeft={{
        label: 'Listed',
        value: new Date(item.createdAt).toLocaleDateString(),
      }}
      extraLabelRight={{
        label: 'Updated',
        value: new Date(item.updatedAt).toLocaleDateString(),
      }}
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      {error ? (
        <>
          <FontAwesome name="exclamation-triangle" size={48} color={Colors.warning} />
          <Text style={styles.emptyText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchProperties}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <FontAwesome name="home" size={48} color={Colors.grey400} />
          <Text style={styles.emptyText}>No properties found</Text>
        </>
      )}
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading properties...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
      <View style={styles.header}>
        <Text style={styles.heading}>Available Properties</Text>
        <Text style={styles.subHeading}>
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>All Property Details Cards</Text>
        <FlatList
          data={properties}
          keyExtractor={(item) => item._id}
          renderItem={renderPropertyCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
            />
          }
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>Price Highlight Property Cards</Text>
        <FlatList
          data={properties}
          keyExtractor={(item) => item._id}
          renderItem={renderPriceHighlightCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
            />
          }
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white100,
  },
  container: {
    backgroundColor: '#fafafa',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    color: Colors.grey900,
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: Colors.grey500,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.grey600,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.grey600,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PropertyCardsScreen;

// import React, { useState, useEffect, useCallback } from 'react';
// import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, ScrollView } from 'react-native';
// import { api } from '../../api/apiClient';
// import { Colors, Fonts } from '../../constants';
// import PropertyOverviewCard from '../../components/PropertyCards/PropertyOverviewCard';

// type Property = {
//   id: string;
//   title: string;

//   [key: string]: any;
// };

// const PropertyCardsScreen = ({ navigation }: { navigation: any }) => {
//   // const [user, setUser] = useState<any>(null);
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProperties = useCallback(async () => {
//     try {
//       const response = await api.get('/users/683a90f8f6efc4411a486d34/properties');
//       if (response?.data?.data) {
//         setProperties(response.data.data);
//         console.log('Fetched properties:', properties.length);
//       }

//       // let userData = {full_name: response.data.data.full_name, email: response.data.data.email};
//       // setUser( userData || null);
//       // console.log('Fetched user:', user);

//     } catch (error) {
//       console.error('Error fetching properties:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, []); // properties

//   useEffect(() => {
//     fetchProperties();
//   }, []); // fetchProperties navigation

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white100 }}>

//       <View style={styles.propertyOverViewContainer}>
//         <Text style={styles.heading}>Property Overview Cards {properties.length}</Text>

//         {/* <FlatList
//           data={properties}
//           // keyExtractor={(item) => item._id}
//           renderItem={({ item }) => <PropertyOverviewCard {...item} />}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           // showsVerticalScrollIndicator={false}
//           // contentContainerStyle={styles.propertyOverViewContentContainer}
//           // scrollEnabled={false}
//         /> */}

//         <FlatList
//           data={properties}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) =>
//             <PropertyOverviewCard
//               id={item._id}
//               title={item.title}
//               location={item.location}
//               // priceType={item.priceType}
//               price={item.price}
//               deposit={item.deposit}
//               // property_images={item.images || []}
//               property_type={item.property_type}
//               bedrooms={item.bedrooms}
//               bathrooms={item.bathrooms}
//               area={item.area}
//               furnishing={item.furnishing}
//               amenities={item.amenities}
//               status={item.status}
//               is_verified={item.is_verified}
//               description={item.description}
//               createdAt={item.createdAt}
//               updatedAt={item.updatedAt}
//               is_deleted={item.is_deleted}
//               extraLabelLeft={item.extraLabelLeft}
//               extraLabelRight={item.extraLabelRight}
//               onPrimaryAction={item.onPrimaryAction}
//               onSecondaryAction={item.onSecondaryAction}
//               primaryLabel={item.primaryLabel}
//               secondaryLabel={item.secondaryLabel}
//             />}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//         />

//       </View>
//     </SafeAreaView>
//   );
// };

// export default PropertyCardsScreen;

// const styles = StyleSheet.create({
//   propertyOverViewContainer: {
//     // flex: 1,
//     // flexDirection: 'row',
//     // flexWrap: 'wrap',
//     // paddingHorizontal: 16,
//     // backgroundColor: Colors.white100,
//   },
//   propertyOverViewContentContainer: {
//     // paddingHorizontal: 8,
//     paddingRight: 16,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     fontFamily: Fonts.Bold,
//     paddingHorizontal: 16,
//     marginVertical: 8,
//     // marginBottom: 8,
//     color: '#333',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.white100,
//   },
// });
