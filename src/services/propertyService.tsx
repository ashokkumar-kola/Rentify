import axios from 'axios';

const API_BASE_URL = 'https://your-api-endpoint.com/api'; // Replace with your actual API URL

export const PropertyService = {
  async getFilteredProperties(filters) {
    try {
      // Convert filters to query parameters
      const params = new URLSearchParams();

      // Add all filter parameters
      if (filters.searchQuery) {params.append('search', filters.searchQuery);}
      if (filters.propertyTypes?.length) {params.append('propertyTypes', filters.propertyTypes.join(','));}
      if (filters.bedrooms !== 'Any') {params.append('bedrooms', filters.bedrooms);}
      if (filters.bathrooms !== 'Any') {params.append('bathrooms', filters.bathrooms);}
      if (filters.amenities?.length) {params.append('amenities', filters.amenities.join(','));}
      if (filters.priceRange) {
        params.append('minPrice', filters.priceRange[0].toString());
        params.append('maxPrice', filters.priceRange[1].toString());
      }
      if (filters.furnishing !== 'Any') {params.append('furnishing', filters.furnishing);}
      if (filters.sortBy) {params.append('sortBy', filters.sortBy);}
      if (filters.petPolicy !== 'Any') {params.append('petPolicy', filters.petPolicy);}

      const response = await axios.get(`${API_BASE_URL}/properties`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching filtered properties:', error);
      throw error;
    }
  },
};
