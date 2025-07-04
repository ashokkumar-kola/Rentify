import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants';
import images from '../../assets/images';

interface Tag {
  label: string;
  color: string;
  icon: string;
}

const formatAddress = (location: any): string => {
  if (!location || typeof location !== 'object') return '';
  const { street, locality, nearby, city, district, state, zip } = location;
  return [street, locality, nearby, city, district, state, zip].filter(Boolean).join(', ');
};

interface PropertyCardProps {
  id: string;
  title: string;
  location: string | object;
  priceType?: string;
  price: string;
  deposit: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnishing?: string;
  amenities?: Tag[];
  status?: 'available' | 'sold' | 'rented';
  is_verified?: boolean;
  description?: string;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  primaryLabel: string;
  secondaryLabel: string;
  isForRent?: boolean;
}

const PropertyOverviewCard: React.FC<PropertyCardProps> = ({
  title,
  location,
  priceType = '₹',
  price,
  deposit,
  property_type,
  bedrooms,
  bathrooms,
  area,
  furnishing = 'Not specified',
  amenities = [],
  status = 'available',
  is_verified = false,
  description = '',
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel,
  secondaryLabel,
  isForRent = true,
}) => {
  const locationText = typeof location === 'string' ? location : formatAddress(location);
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.85;

  console.log(amenities);

  // Default amenities if none provided
  // const defaultAmenities: Tag[] = [
  //   { label: property_type, color: '#4f46e5', icon: 'home' },
  //   { label: `${bedrooms} Beds`, color: '#ec4899', icon: 'bed' },
  //   { label: `${bathrooms} Baths`, color: '#14b8a6', icon: 'bath' },
  //   { label: `${area} sqft`, color: '#f97316', icon: 'expand' },
  // ];

  // const displayAmenities = amenities.length > 0 ? amenities : defaultAmenities;

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      {/* Property Image Section */}
      <ImageBackground
        style={styles.banner}
        source={images.defaultHome}
        resizeMode="cover"
        imageStyle={styles.bannerImage}
      >
        <View style={[styles.tag, { backgroundColor: isForRent ? '#34d399' : '#3b82f6' }]}>
          <FontAwesome 
            name={isForRent ? 'exchange' : 'tags'} 
            size={12} 
            color="#fff" 
            style={styles.tagIcon}
          />
          <Text style={styles.tagText}>{isForRent ? 'FOR RENT' : 'FOR SALE'}</Text>
        </View>

        {is_verified && (
          <View style={styles.verifiedBadge}>
            <FontAwesome name="check-circle" size={14} color="#10b981" />
            <Text style={styles.verifiedText}>VERIFIED</Text>
          </View>
        )}

        <TouchableOpacity style={styles.heart}>
          <FontAwesome name="heart-o" size={20} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      {/* Price Badge */}
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>
          <FontAwesome name="rupee" size={12} /> {price}
        </Text>
        {isForRent && (
          <Text style={styles.depositText}>
            <FontAwesome name="lock" size={10} /> Deposit: {priceType}{deposit}
          </Text>
        )}
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          <FontAwesome name="building" size={14} color="#6b7280" /> {title}
        </Text>

        <View style={styles.location}>
          <FontAwesome name="map-marker" size={14} color="#ef4444" />
          <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
            {locationText}
          </Text>
        </View>

        {/* Amenities Tags */}
        <View style={styles.tagsRow}>
          {amenities.map((tag, index) => ( // defaultAmenities
            <View key={index} style={styles.labelTag}>
              {/* <FontAwesome name={tag.icon} size={10} color="#000" style={styles.tagIcon} /> */}
              <Text style={styles.labelTagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Property Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <FontAwesome name="home" size={14} color="#6b7280" />
            <Text style={styles.featureText}>{property_type}</Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome name="bed" size={14} color="#6b7280" />
            <Text style={styles.featureText}>{bedrooms} Beds</Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome name="bath" size={14} color="#6b7280" />
            <Text style={styles.featureText}>{bathrooms} Baths</Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome name="expand" size={14} color="#6b7280" />
            <Text style={styles.featureText}>{area} sqft</Text>
          </View>
        </View>

        {/* Description */}
        {description && (
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            <FontAwesome name="align-left" size={12} color="#6b7280" /> {description}
          </Text>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={onSecondaryAction}
            activeOpacity={0.8}
          >
            <FontAwesome name="eye" size={14} color={Colors.primary} />
            <Text style={styles.secondaryButtonText}>{secondaryLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={onPrimaryAction}
            activeOpacity={0.8}
          >
            <FontAwesome name="phone" size={14} color="#fff" />
            <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PropertyOverviewCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  banner: {
    height: 160,
    backgroundColor: '#e5e7eb',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
  },
  bannerImage: {
    opacity: 0.9,
  },
  tag: {
    // color: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // elevation: 2,
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heart: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  priceBadge: {
    position: 'absolute',
    right: 16,
    top: 140,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  priceText: {
    color: '#10b981',
    fontWeight: '700',
    fontSize: 14,
  },
  depositText: {
    color: '#6b7280',
    fontSize: 10,
    marginTop: 2,
  },
  content: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 6,
    flex: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  labelTag: {
    backgroundColor: Colors.primary,
    // color: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    // alignSelf: 'center',
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 1 },
    // shadowRadius: 2,
    // elevation: 1,
  },
  labelTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    // marginLeft: 4,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blue50, // '#f9fafb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: '48%',
  },
  featureText: {
    fontSize: 12,
    color: '#4b5563',
    marginLeft: 6,
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    marginLeft: 8,
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
    borderWidth: 1.5,
    padding: 12,
    borderRadius: 10,
    marginRight: 8,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  verifiedText: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
});
