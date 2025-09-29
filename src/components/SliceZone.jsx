import React from 'react';
import { components } from '@/slices';

/**
 * SliceZone personnalisé pour remplacer @prismicio/react SliceZone
 * Rend les slices sans dépendance Prismic
 */
const SliceZone = ({ slices = [] }) => {
  // Vérifications de sécurité robustes
  if (!Array.isArray(slices) || slices.length === 0) {
    return null;
  }

  try {
    return (
      <>
        {slices.map((slice, index) => {
          // Vérifier que slice est un objet valide
          if (!slice || typeof slice !== 'object' || !slice.slice_type) {
            console.warn(`Invalid slice at index ${index}:`, slice);
            return null;
          }

          const SliceComponent = components[slice.slice_type];
          
          if (!SliceComponent) {
            console.warn(`Slice component not found for type: ${slice.slice_type}`);
            return null;
          }

          return (
            <SliceComponent
              key={`${slice.slice_type}-${index}`}
              slice={slice}
              index={index}
            />
          );
        })}
      </>
    );
  } catch (error) {
    console.error('Error rendering SliceZone:', error);
    return null;
  }
};

export default SliceZone; 