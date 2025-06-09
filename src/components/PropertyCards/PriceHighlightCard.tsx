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

interface PriceHighlightCardProps {
  title: string;
  location: string;
  price: string;
  deposit?: string;
  isForRent?: boolean;
  is_verified?: boolean;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  primaryLabel: string;
  secondaryLabel: string;
}

const PriceHighlightCard: React.FC<PriceHighlightCardProps> = ({
  title,
  location,
  price,
  deposit = 'N/A',
  isForRent = true,
  is_verified = false,
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel,
  secondaryLabel,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.88;

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      {/* Image Section with Status and Verification */}
      <ImageBackground
        style={styles.banner}
        source={images.defaultHome}
        resizeMode="contain"
        imageStyle={styles.bannerImage}
      >

        {/* {is_verified && (
          <View style={styles.verifiedBadge}>
            <FontAwesome name="check-circle" size={14} color="#10b981" />
            <Text style={styles.verifiedText}>VERIFIED</Text>
          </View>
        )} */}
        <TouchableOpacity style={styles.heart}>
          <FontAwesome name="heart-o" size={20} color="#000" />
        </TouchableOpacity>
      </ImageBackground>

      {/* Price Info */}
      <View style={styles.content}>
        <View style={styles.titleLocation}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.location}>
            <FontAwesome name="map-marker" size={14} color="#ef4444" /> {location}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            <FontAwesome name="rupee" size={12} /> {price}
          </Text>
          {isForRent && (
            <Text style={styles.depositText}>
              <FontAwesome name="lock" size={10} /> Deposit: ₹{deposit}
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        {/* <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onSecondaryAction}>
            <FontAwesome name="eye" size={14} color={Colors.primary} />
            <Text style={styles.secondaryButtonText}>{secondaryLabel}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={onPrimaryAction}>
            <FontAwesome name="phone" size={14} color="#fff" />
            <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default PriceHighlightCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 8,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  banner: {
    height: 160,
    padding: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bannerImage: {
    opacity: 0.85,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#34d399',
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
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
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  content: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleLocation: {
    width: '70%',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  priceRow: {
    marginBottom: 16,
    width: '30%',
  },
  priceText: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '700',
  },
  depositText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    borderColor: Colors.primary,
    borderWidth: 1.5,
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});
