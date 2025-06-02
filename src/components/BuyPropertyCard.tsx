import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants';

const PropertyCard = ({
  title,
  location,
  tags = [],
  bhk_type,
  bedrooms,
  bathrooms,
  area,
  price,
  priceType,
  extraLabelLeft,
  extraLabelRight,
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel,
  secondaryLabel,
  isForRent = true,
}) => {
  return (
    <View style={styles.card}>
      {/* Banner */}
      <ImageBackground style={styles.banner} source={require('../assets/images/Home_SVG.png')} resizeMode="contain">
        <View style={[styles.tag, { backgroundColor: isForRent ? '#34d399' : '#3b82f6' }]}>
          <Text style={styles.tagText}>{isForRent ? 'For Rent' : 'For Sale'}</Text>
        </View>
        <TouchableOpacity style={styles.heart}>
          <FontAwesome name="heart-o" size={20} color="#888" />
        </TouchableOpacity>
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </ImageBackground>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.location}>
          <MaterialIcons name="location-pin" size={16} color="#555" />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsRow}>
          {tags.map((tag, index) => (
            <View key={index} style={[styles.labelTag, { backgroundColor: tag.color }]}>
              <Text style={styles.labelTagText}>{tag.label}</Text>
            </View>
          ))}
        </View>

        {/* Features */}
        <View style={styles.featuresRow}>
          <Text style={styles.featureText}>🏘 {bhk_type}</Text>
          <Text style={styles.featureText}>🛏 {bedrooms} BHK</Text>
        </View>
        <View style={styles.featuresRow}>
          <Text style={styles.featureText}>🛁 {bathrooms} Bathrooms</Text>
          <Text style={styles.featureText}>📐 {area}</Text>
        </View>

        {/* Extra Info */}
        <View style={styles.extraRow}>
          <Text style={styles.extraLeft}>{extraLabelLeft.label}: <Text style={styles.bold}>{extraLabelLeft.value}</Text></Text>
          <Text style={styles.extraRight}>{extraLabelRight.label}: <Text style={styles.bold}>{extraLabelRight.value}</Text></Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onSecondaryAction}>
            <Text style={styles.secondaryButtonText}>{secondaryLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={onPrimaryAction}>
            <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  banner: {
    height: 140,
    backgroundColor: '#e5e7eb',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  tag: {
    height: 24,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  heart: {
    height: 32,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
  },
  priceBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  priceText: {
    color: '#10b981',
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 13,
    color: '#555',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  labelTag: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  labelTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 13,
    color: '#444',
  },
  extraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  extraLeft: {
    color: '#777',
    fontSize: 12,
  },
  extraRight: {
    color: '#777',
    fontSize: 12,
  },
  bold: {
    fontWeight: '700',
    color: '#111',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
