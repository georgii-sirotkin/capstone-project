'use strict';

const faker = require('faker');
const Amenity = require('../../models/Amenity');
const Hotel = require('../../models/Hotel');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const amenities = await Amenity.findAll();
    const amenityIds = amenities.map(amenity => amenity.id);
    const hotels = await Hotel.findAll();
    
    const promises = hotels.map(hotel => {
      const numberOfAmenities = Math.round(Math.random() * 4) + 1;
      return hotel.setAmenities(faker.random.arrayElements(amenityIds, numberOfAmenities))
    });

    await Promise.all(promises);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('hotel_amenities', null, {});
  }
};
