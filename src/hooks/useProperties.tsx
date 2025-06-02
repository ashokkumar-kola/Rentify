// import { useState, useEffect } from 'react';
// import { PropertyApi } from '../api/propertyApi';
// import { Property } from '../api/types/property.d';

// export const useProperties = () => {
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const data = await PropertyApi.getAll();
//         setProperties(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   return { properties, isLoading, error };
// };
