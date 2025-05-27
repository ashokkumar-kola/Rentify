import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../utils/Colors';

const PropertyCard = (
    {
        title,
        location,
        price,
        deposit,
        property_type,
        bhk_type,
        bathrooms,
        size_sqft,
        image,
    }
) => {
    return (
        <View style={styles.card}>
            {/* <Image source={image} style={styles.image} resizeMode="contain" /> */}

            <ImageBackground
                source={require('../assets/images/simple-home.png')}
                style={styles.image}
                resizeMode="contain"
                // imageStyle={{ borderRadius: 16 }}
            >
                <View style={ styles.propertyImgOverlay }>
                    <Text style={ styles.propertyImgText }>
                        ! {property_type} available
                    </Text>
                    {/*
                        <TouchableOpacity
                                // onPress={() => setIsFavorite(!isFavorite)}
                                // style={styles.heartIcon}
                        >
                                <Ionicons
                                    name= "heart" // {isFavorite ? 'heart' : 'heart-outline'}
                                    size={28}
                                    color= "red" //{isFavorite ? 'red' : 'white'}
                                />
                        </TouchableOpacity>
                        <Ionicons name="heart" size={28} color="red" />
                    */}
                </View>
            </ImageBackground>

            <View style={[styles.row, styles.propertyInfo1]}>
                <View style={[styles.column, styles.propertyTitleLoc]}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.location}>{location}</Text>
                </View>
                <View style={[styles.column, styles.priceTag]}>
                    <Text style={styles.price}>${price}</Text>
                    <Text style={styles.deposit}>${deposit}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={[styles.row, styles.propertyInfoContainer]}>
                <View style={styles.infoBox}>
                    <MaterialIcons name="king-bed" size={24} color={Colors.primary} />
                    <Text style={styles.infoLabel}>{bhk_type}</Text>
                </View>

                <View style={styles.infoBox}>
                    <MaterialIcons name="square-foot" size={24} color={Colors.primary} />
                    <Text style={styles.infoLabel}>{size_sqft} sqft</Text>
                </View>

                <View style={styles.infoBox}>
                    <MaterialIcons name="bathtub" size={24} color={Colors.primary} />
                    <Text style={styles.infoLabel}>
                        {bathrooms} Baths
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View>
                <Text style={{textAlign: 'center',}}>!Available for bought</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.detailsButton]} onPress={() => console.log('Property details')}>
                    <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Owner Details')}>
                    <Text style={styles.buttonText, styles.ContactButton}>Contact Owner</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fafafa',
        padding: 4,
        paddingBottom: 10,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 3,
    },

    image: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        marginBottom: 8,
    },

    divider: {
        flex: 1,
        height: 1,
        marginVertical: 8,
        marginHorizontal: 8,
        backgroundColor: Colors.grey100,
    },

    propertyImgOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1 )',
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 8,
    },

    propertyImgText: {
        padding: 8,
    },

    row: {
        flexDirection: 'row',
        // margin: 1,
        // marginBottom: 4,
    },

    column: {
        flexDirection: 'column',
        // flex: 1,
        // maxWidth: '80%',
    },

    propertyInfo1: {
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    propertyTitleLoc: {
        width: '75%',
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 2,
    },

    location: {
        fontSize: 14,
        color: '#555',
        // marginBottom: 2,
    },

    priceTag: {
        width: '25%',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#2ecc71',
        padding: 8,
        borderRadius: 8,
        // backgroundColor: '#eafaf1',
        // marginTop: 8,
        // marginBottom: 8,
        // maxWidth: 220,
        // flexShrink: 1,
        alignItems: 'flex-end',
    },

    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27ae60',
        marginBottom: 2,
    },

    deposit: {
        fontSize: 14,
        color: '#555',
    },

    label: {
        fontWeight: '600',
        width: 90,
    },

    propertyinfo2: {
        justifyContent: 'space-evenly',
    },

    propertyInfoContainer: {
        justifyContent: 'space-evenly',
    },

    value: {
        width: 120,
        height: 60,
        backgroundColor: 'skyblue',
        color: '#333',
        padding: 8,
        borderRadius: 8,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    infoBox: {
        backgroundColor: '#dff6ff',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 12,
        alignItems: 'center',
        width: 110,
        // elevation: 3,
        // shadowColor: '#000',
        // shadowOpacity: 0.1,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 4,
    },

    buttonRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#2b5fc0', // Blue primary
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 16,
        // elevation: 3,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 16,
    },
    ContactButton: {
        color: '#fff',
    },
    detailsButton: {
        backgroundColor: 'transparent', // Slightly darker blue for variation 'rgba(120, 120, 220, 0.7)'
        borderWidth: 1,
        borderColor: '#000',
        color: '#000',
    },

});

export default PropertyCard;
