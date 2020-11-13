'use strict';

const Hotel = require('../../models/Hotel');
const User = require('../../models/User');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hotels = await Hotel.findAll();
    const users = await User.findAll({ where: { isAdmin: false }});

    return queryInterface.bulkInsert('reviews', getReviewsData(hotels, users));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  }
};

function getReviewsData(hotels, users) {
  const userIds = users.map(user => user.id);
  const reviews = [];

  hotels.forEach(hotel => {
    const numberOfReviews = Math.round(Math.random() * 20);

    for (let i = 0; i < numberOfReviews; i ++) {
      const userId = faker.random.arrayElements(userIds, 1);
      reviews.push(getOneReviewData(hotel.id, userId));
    }
  });

  return reviews;
}

function getOneReviewData(hotelId, userId) {
  return {
    hotel_id: hotelId,
    user_id: userId,
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    rating: getRandomRating(),
    created_at: new Date(),
    updated_at: new Date(),
  }
}

function getRandomRating() {
  return Math.min(5, Math.round(Math.random() * 8)); // make it biased towards higher numbers
}
