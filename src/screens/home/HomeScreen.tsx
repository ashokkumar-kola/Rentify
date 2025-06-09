import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import { Colors } from '../../constants';
import { api } from '../../api/apiClient';

import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import PropertyCard from '../../components/PropertyCard';

import PopularCard from '../../components/PropertyCards/PopularCard';
import NewArrivalCard from '../../components/PropertyCards/NewArrivalCard';

import ExploreMoreCard from '../../components/ExploreMoreCard';

const HomeScreen = ({navigation} : {navigation: any}) => {
    // const navigation = useNavigation();
    // const route = useRoute();
    // const filterParams = route.params || {};

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newArrivals, setNewArrivals] = useState([]);
    const [popularProperties, setPopularProperties] = useState([]);
    // const [filteredProperties, setFilteredProperties] = useState([]);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {setUser(JSON.parse(userData));}
            } catch (error) {
                console.error('Error getting user data:', error);
            }
        };

    const fetchProperties = async () => {
        try {
            setLoading(true);

            // Fetch New Arrivals
            const arrivalsRes = await api.get('/properties/filter/?sort_by=createdAt');
            setNewArrivals(arrivalsRes.data.data);

            // Fetch Popular Properties
            const popularRes = await api.get('/properties/filter?is_popular=true');
            setPopularProperties(popularRes.data.data);

            // Fetch Filtered Properties (if filters exist)
            // if (Object.keys(filterParams).length > 0) {
            //   const filterRes = await api.get('/properties/filter', {
            //     params: filterParams,
            //   });
            //   setFilteredProperties(filterRes.data.data);
            // }

        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
        };

        getUserData();
        fetchProperties();
    }, [navigation]); // filterParams navigation

    if (loading) {
        return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Banner />

            {/* <View style={styles.filterContainer}>
                <View style={styles.filterHeader}>
                    <Text style={styles.filterTitle}>
                        Filter properties tailored to your needs
                    </Text>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => navigation.navigate('Filters')}
                    >
                        <FontAwesome name="sliders" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View> */}

            {/* If filters are applied, show filtered section */}
            {/* {filteredProperties.length > 0 && (
            <View style={styles.propertySection}>
                <Text style={styles.sectionTitle}>Filtered Results</Text>
                <FlatList
                data={filteredProperties}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <PropertyCard {...item} />}
                scrollEnabled={false}
                />
            </View>
            )} */}

            <View style={styles.main}>

              {/* Popular Properties */}
              {popularProperties.length > 0 && (
                  <View style={styles.propertySection}>
                      <Text style={styles.sectionTitle}>Popular Properties</Text>
                      <FlatList
                          data={popularProperties}
                          horizontal
                          keyExtractor={(item) => item._id}
                          renderItem={({ item }) => <PopularCard {...item} />}
                          contentContainerStyle={styles.horizontalList}
                          // scrollEnabled={false}
                      />
                  </View>
              )}

              {/* New Arrivals */}
              {newArrivals.length > 0 && (
                  <View style={styles.propertySection}>
                      <Text style={styles.sectionTitle}>New Arrivals</Text>
                      <FlatList
                          data={newArrivals}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(item) => item._id}
                          renderItem={({ item }) => <NewArrivalCard {...item} />}
                          contentContainerStyle={styles.horizontalList}
                      />
                  </View>
              )}

              <ExploreMoreCard />
            </View>

        </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import { useNavigation } from '@react-navigation/native';

// import { Colors } from '../../constants';
// import { api } from '../../api/apiClient';

// import Banner from '../../components/Banner';
// import Footer from '../../components/Footer';
// import PropertyCard from '../../components/PropertyCard';
// import ExploreMoreCard from '../../components/ExploreMoreCard';

// const dummyProperties = [
//   {
//     id: 1,
//     title: 'Modern 2BHK Apartment in Downtown',
//     location: 'PQR, Near by abc',
//     price: '1500.00',
//     deposit: '3000.00',
//     property_type: 'flat',
//     bhk_type: '2BHK',
//     bathrooms: 2,
//     size_sqft: 950,
//     image: require('../../assets/images/simple-home.png'),
//   },
//   {
//     id: 2,
//     title: 'Modern 2BHK Apartment in Downtown',
//     location: 'PQR, Near by abc',
//     price: '1500.00',
//     deposit: '3000.00',
//     property_type: 'flat',
//     bhk_type: '2BHK',
//     bathrooms: 2,
//     size_sqft: 950,
//     image: require('../../assets/images/simple-home.png'),
//   },
//   {
//     id: 3,
//     title: 'Modern 2BHK Apartment in Downtown',
//     location: 'PQR, Near by abc',
//     price: '1500.00',
//     deposit: '3000.00',
//     property_type: 'flat',
//     bhk_type: '2BHK',
//     bathrooms: 2,
//     size_sqft: 950,
//     image: require('../../assets/images/simple-home.png'),
//   },
// ];

// const HomeScreen = () => {
//     const navigation = useNavigation();
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [properties, setProperties] = useState(dummyProperties);

//     useEffect(() => {
//         const getUserData = async () => {
//         try {
//             const userData = await AsyncStorage.getItem('userData');
//             if (userData) {
//             setUser(JSON.parse(userData));
//             }
//         } catch (error) {
//             console.error('Error getting user data:', error);
//         } finally {
//             setLoading(false);
//         }
//         };

//         getUserData();
//     }, []);

//     if (loading) {
//         return (
//         <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color={Colors.primary} />
//         </View>
//         );
//     }

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//             <Banner />

//             <View style={styles.filterContainer}>
//             <View style={styles.filterHeader}>
//                 <Text style={styles.filterTitle}>
//                 Filter properties tailored to your needs
//                 </Text>
//                 <TouchableOpacity
//                 style={styles.filterButton}
//                 onPress={() => navigation.navigate('Filters')}
//                 >
//                 <FontAwesome name="sliders" size={20} color="#fff" />
//                 </TouchableOpacity>
//             </View>
//             </View>

//             <View style={styles.propertyList}>
//             <FlatList
//                 data={properties}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => <PropertyCard {...item} />}
//                 scrollEnabled={false}
//             />
//             </View>

//             <ExploreMoreCard />
//             <Footer />
//         </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   filterContainer: {
//     padding: 20,
//     backgroundColor: Colors.blue50,
//     borderRadius: 20,
//     margin: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//     justifyContent: 'center',
//   },
//   filterHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   filterTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: Colors.primary,
//     flex: 1,
//     paddingRight: 12,
//   },
//   filterButton: {
//     backgroundColor: Colors.primary,
//     padding: 10,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   propertyList: {
//     paddingHorizontal: 16,
//     paddingBottom: 8,
//   },
// });


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
// import ExploreMoreCard from '../../components/ExploreMoreCard';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { api } from '../../api/apiClient';

// import Banner from '../../components/Banner';
// import Footer from '../../components/Footer';
// import PropertyCard from '../../components/PropertyCard';
// import CustomButton from '../../components/common/Button';

// import { useNavigation } from '@react-navigation/native';
// import { Colors } from '../../constants';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const properties = [
//   {
//     id: 1,
//     title: 'Modern 2BHK Apartment in Downtown',
//     location: 'PQR, Near by abc',
//     price: '1500.00',
//     deposit: '3000.00',
//     property_type: 'flat',
//     bhk_type: '2BHK',
//     bathrooms: 2,
//     size_sqft: 950,
//     image: require('../../assets/images/simple-home.png'),
//   },
//   {
//     id: 2,
//     title: 'Modern 2BHK Apartment in Downtown',
//     location: 'PQR, Near by abc',
//     price: '1500.00',
//     deposit: '3000.00',
//     property_type: 'flat',
//     bhk_type: '2BHK',
//     bathrooms: 2,
//     size_sqft: 950,
//     image: require('../../assets/images/simple-home.png'),
//   },
//   {
//     id: 3,
//     title: 'Modern 2BHK Apartment in Downtown',
//     location: 'PQR, Near by abc',
//     price: '1500.00',
//     deposit: '3000.00',
//     property_type: 'flat',
//     bhk_type: '2BHK',
//     bathrooms: 2,
//     size_sqft: 950,
//     image: require('../../assets/images/simple-home.png'),
//   },
// ];



// const HomeScreen = () => {
//     const navigation = useNavigation();
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
// useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const userData = await AsyncStorage.getItem('userData');
//         if (userData) {
//           setUser(JSON.parse(userData));
//         }
//       } catch (error) {
//         console.error('Error getting user data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUserData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//     return (
//         <View>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 {/* Banner */}
//                 <Banner />

//                     <View style={styles.filterContainer}>
//                         <View style={styles.filterHeader}>
//                             <Text style={styles.filterTitle}>
//                             Filter Properties tailored to your needs
//                             </Text>
//                             <TouchableOpacity
//                             style={styles.filterButton}
//                             onPress={() => navigation.navigate('Filters')}
//                             >
//                             <FontAwesome name="sliders" size={20} color="#fff" />
//                             </TouchableOpacity>
//                         </View>
//                     </View>


//                 {/* Properties */}
//                 <View style = { styles.container }>
//                     {properties.map((property) => (
//                         <PropertyCard key={property.id} {...property} />
//                     ))}
//                 </View>

//                 {/*  */}

//                 <ExploreMoreCard />

//                 {/* Footer */}
//                 <Footer />
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     header: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginBottom: 16,
//         textAlign: 'center',
//         color: '#2c3e50',
//     },
//     subHeader: {
//         fontSize: 20,
//         marginVertical: 10,
//         color: '#34495e',
//     },
//     card: {
//         marginBottom: 16,
//         padding: 10,
//         borderRadius: 8,
//         backgroundColor: '#f2f2f2',
//     },
//     image: {
//         width: '100%',
//         height: 150,
//         borderRadius: 6,
//     },
//     title: {
//         fontSize: 16,
//         marginTop: 8,
//         fontWeight: '600',
//     },
//     price: {
//         fontSize: 14,
//         color: '#2ecc71',
//     },
//     filterContainer: {
//   flex: 1,
//   padding: 20,
//   backgroundColor: Colors.blue50,
//   borderRadius: 20,
//   margin: 16,
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.1,
//   shadowRadius: 8,
//   elevation: 4,
//   justifyContent: 'center',
// },

// filterHeader: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// },

// filterTitle: {
//   fontSize: 18,
//   fontWeight: '600',
//   color: Colors.primary,
//   flex: 1,
//   paddingRight: 12,
// },

// filterButton: {
//   backgroundColor: Colors.primary,
//   padding: 10,
//   borderRadius: 12,
//   justifyContent: 'center',
//   alignItems: 'center',
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 1 },
//   shadowOpacity: 0.2,
//   shadowRadius: 2,
//   elevation: 3,
// },

// });

// export default HomeScreen;
