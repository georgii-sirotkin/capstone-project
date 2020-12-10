'use strict';

const Hotel = require('../../models/Hotel');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hotels = await Hotel.findAll();
    return queryInterface.bulkInsert('rooms', getRoomsData(hotels));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rooms', null, {});
  }
};

function getRoomsData(hotels) {
  const rooms = [];

  hotels.forEach(hotel => {
    const numberOfRooms = Math.round(Math.random() * 3) + 1;
    for (let i = 0; i < numberOfRooms; i ++) {
      rooms.push(getOneRoomData(hotel.id));
    }
  });

  return rooms;
}

const categoryCodes = ['A', 'C'];
const bedTypes = ['K', 'Q', 'D', 'S'];

function getOneRoomData(hotelId) {
  const categoryCode = faker.random.arrayElements(categoryCodes, 1);
  const bedType = faker.random.arrayElements(bedTypes, 1);
  const numberOfBeds = Math.ceil(Math.random() * 3);
  const type = `${categoryCode}${numberOfBeds}${bedType}`;
  const price = Math.round(Math.random() * 150) + 75;

  return {
    price,
    type,
    hotel_id: hotelId,
    created_at: new Date(),
    updated_at: new Date(),
  };
}
