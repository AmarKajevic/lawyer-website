'use client';

import { useEffect, useState } from 'react';
import { Results } from './Results/Results';

export const PropertySearch = () => {
    const [properties, setProperties] = useState([]);
  useEffect(() => {
    const search = async () => {
      try {
        const res = await fetch(`/api/search`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
        const data = await res.json();
        console.log('search data:', data);
        setProperties(data.properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
      
    };

    search(); // ✅ poziv funkcije unutar useEffect
  }, []); // ✅ prazan dependency array da se izvrši samo jednom
    

  return <div>
    <Results properties={properties}/>
  </div>;
};
