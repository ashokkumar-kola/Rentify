import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts } from '../../constants/Colors';
import images from '../../assets/images';

import AppText from '../../components/common/AppText'

const screenWidth = Dimensions.get('window').width;

type Props = {
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image?: ImageSourcePropType;
};

const NewArrivalCard: React.FC<Props> = ({
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  image = images.defaultHome,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.propertyImage} resizeMode="cover" />
        <View style={styles.newTag}>
          <Text style={styles.newTagText}>New</Text>
        </View>
      </View>

      <View style={styles.content}>
        <>
          <AppText weight="Medium" style={{ fontSize: 12, color: Colors.black100 }} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </AppText>
          <AppText style={{ fontSize: 12, color: Colors.black400 }}>
            <MaterialIcons name="location-on" size={12} color={Colors.primary} /> {location}
          </AppText>

          <AppText weight="SemiBold" style={styles.price}>
            ₹{price.toLocaleString()}
          </AppText>
        </>

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <MaterialIcons name="king-bed" size={18} color={Colors.primary} />
            <AppText style={styles.infoText}>{bedrooms} BHK</AppText>
          </View>
          <View style={styles.infoBox}>
            <MaterialIcons name="bathtub" size={18} color={Colors.primary} />
            <AppText style={styles.infoText}>{bathrooms} Baths</AppText>
          </View>
          <View style={styles.infoBox}>
            <MaterialIcons name="square-foot" size={18} color={Colors.primary} />
            <AppText style={styles.infoText}>{area} sqft</AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.725,
    // minHeight: 300,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 12,
    marginHorizontal: 8,
    alignSelf: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  imageContainer: {
    position: 'relative',
    height: 150,
    backgroundColor: Colors.grey100,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  newTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ff4757',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  newTagText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: Colors.grey600,
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    alignItems: 'center',
    backgroundColor: '#e8f7ff',
    paddingVertical: 6,
    borderRadius: 10,
    width: '32%',
  },
  infoText: {
    fontSize: 12,
    // marginTop: 4,
    color: Colors.black,
  },
});

export default NewArrivalCard;
