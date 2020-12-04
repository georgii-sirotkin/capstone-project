import React from 'react';
import Amenity from '../Amenity';

export default function HotelOfferAmenities({ allAmenities, amenityCodes }) {
  const displayedAmenities = allAmenities.filter(
    amenity => amenityCodes.includes(amenity.code)
  );

  return (
    <>
      {displayedAmenities.map(amenity => (
        <Amenity key={amenity.id} amenity={amenity} />
      ))}
    </>
  )
}
