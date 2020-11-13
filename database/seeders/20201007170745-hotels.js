'use strict';

const User = require('../../models/User');
const Photo = require('../../models/Photo');
const Address = require('../../models/Address');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const admin = await User.findOne({
      where: { isAdmin: true },
    });

    const photos = await Photo.findAll();
    const addresses = await Address.findAll();

    return queryInterface.bulkInsert('hotels', [
      {
        name: 'Holiday Inn Toronto Downtown Centre',
        phone: '(416) 977-6655',
        website: 'https://www.ihg.com/holidayinn/hotels/us/en/toronto/yyzct/hoteldetail',
        description: 'Featuring an indoor pool and full-service spa, this hotel is located next door to Maple Leaf Gardens in downtown Toronto. Guest rooms offer free WiFi. A flat-screen TV and a mini-fridge are equipped in all rooms at Holiday Inn Toronto Downtown Center. Additional amenities include a work desk, an in-room safe and a coffee maker.',
        thumbnail_photo_id: photos[0].id,
        address_id: addresses[0].id,
        creator_id: admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'InterContinental Toronto Centre',
        phone: '(416) 597-1400',
        website: 'https://www.ihg.com/intercontinental/hotels/us/en/toronto/yyztc/hoteldetail',
        description: 'Just 111 m from the Metro Toronto Convention Center, steps from the CN Tower, this hotel in downtown Toronto offers relaxing spa services, an indoor pool and an on-site restaurant. The Harbourfront Center is within 651 m. Modernly furnished, all the rooms come with a flat-screen TV, a safety deposit box, a mini-bar and ironing facilities. A hairdryer, free toiletries and bathrobes can be found in the bathroom. Some offer a city or lake view, while others have a separate seating area. This hotel is accredited as "China Ready": An in-room kettle, green tea and slippers are available upon request.',
        thumbnail_photo_id: photos[1].id,
        address_id: addresses[1].id,
        creator_id: admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'The Beverley Hotel',
        phone: '(416) 493-2786',
        website: 'https://www.beverleyhotels.com/toronto/',
        description: 'Surrounded by shops and restaurants on trendy Queen Street West in Toronto, this boutique hotel offers rooms with minimalist décor and free WiFi. A bar, restaurant, roof top patio, and retail shop are on site. Fitted with a mounted flat-screen TV, each room at The Beverley Hotel has a safe, small refrigerator, and iPad. The modern bathrooms are equipped with a spacious shower. Select rooms overlook Queen Street West.',
        thumbnail_photo_id: photos[2].id,
        address_id: addresses[2].id,
        creator_id: admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'White Oaks Resort & Spa',
        phone: '(416) 977-6655',
        website: 'https://www.ihg.com/holidayinn/hotels/us/en/toronto/yyzct/hoteldetail',
        description: 'Featuring an indoor pool and full-service spa, this hotel is located next door to Maple Leaf Gardens in downtown Toronto. Guest rooms offer free WiFi. A flat-screen TV and a mini-fridge are equipped in all rooms at Holiday Inn Toronto Downtown Center. Additional amenities include a work desk, an in-room safe and a coffee maker.',
        thumbnail_photo_id: photos[3].id,
        address_id: addresses[3].id,
        creator_id: admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Best Western Colonel Butler Inn',
        phone: '(416) 597-1400',
        website: 'https://www.ihg.com/intercontinental/hotels/us/en/toronto/yyztc/hoteldetail',
        description: 'Just 111 m from the Metro Toronto Convention Center, steps from the CN Tower, this hotel in downtown Toronto offers relaxing spa services, an indoor pool and an on-site restaurant. The Harbourfront Center is within 651 m. Modernly furnished, all the rooms come with a flat-screen TV, a safety deposit box, a mini-bar and ironing facilities. A hairdryer, free toiletries and bathrobes can be found in the bathroom. Some offer a city or lake view, while others have a separate seating area. This hotel is accredited as "China Ready": An in-room kettle, green tea and slippers are available upon request.',
        thumbnail_photo_id: photos[4].id,
        address_id: addresses[4].id,
        creator_id: admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Canterbury Inn',
        phone: '(416) 493-2786',
        website: 'https://www.beverleyhotels.com/toronto/',
        description: 'Surrounded by shops and restaurants on trendy Queen Street West in Toronto, this boutique hotel offers rooms with minimalist décor and free WiFi. A bar, restaurant, roof top patio, and retail shop are on site. Fitted with a mounted flat-screen TV, each room at The Beverley Hotel has a safe, small refrigerator, and iPad. The modern bathrooms are equipped with a spacious shower. Select rooms overlook Queen Street West.',
        thumbnail_photo_id: photos[5].id,
        address_id: addresses[5].id,
        creator_id: admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sterling Inn & Spa',
        phone: '(416) 493-2786',
        website: 'https://www.beverleyhotels.com/toronto/',
        description: 'Surrounded by shops and restaurants on trendy Queen Street West in Toronto, this boutique hotel offers rooms with minimalist décor and free WiFi. A bar, restaurant, roof top patio, and retail shop are on site. Fitted with a mounted flat-screen TV, each room at The Beverley Hotel has a safe, small refrigerator, and iPad. The modern bathrooms are equipped with a spacious shower. Select rooms overlook Queen Street West.',
        thumbnail_photo_id: photos[6].id,
        address_id: addresses[6].id,
        creator_id: admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'The Walper Hotel',
        phone: '(416) 977-6655',
        website: 'https://www.ihg.com/holidayinn/hotels/us/en/toronto/yyzct/hoteldetail',
        description: 'Featuring an indoor pool and full-service spa, this hotel is located next door to Maple Leaf Gardens in downtown Toronto. Guest rooms offer free WiFi. A flat-screen TV and a mini-fridge are equipped in all rooms at Holiday Inn Toronto Downtown Center. Additional amenities include a work desk, an in-room safe and a coffee maker.',
        thumbnail_photo_id: photos[7].id,
        address_id: addresses[7].id,
        creator_id: admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Quality Inn',
        phone: '(416) 597-1400',
        website: 'https://www.ihg.com/intercontinental/hotels/us/en/toronto/yyztc/hoteldetail',
        description: 'Just 111 m from the Metro Toronto Convention Center, steps from the CN Tower, this hotel in downtown Toronto offers relaxing spa services, an indoor pool and an on-site restaurant. The Harbourfront Center is within 651 m. Modernly furnished, all the rooms come with a flat-screen TV, a safety deposit box, a mini-bar and ironing facilities. A hairdryer, free toiletries and bathrobes can be found in the bathroom. Some offer a city or lake view, while others have a separate seating area. This hotel is accredited as "China Ready": An in-room kettle, green tea and slippers are available upon request.',
        thumbnail_photo_id: photos[8].id,
        address_id: addresses[8].id,
        creator_id: admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'DoubleTree by Hilton',
        phone: '(416) 493-2786',
        website: 'https://www.beverleyhotels.com/toronto/',
        description: 'Surrounded by shops and restaurants on trendy Queen Street West in Toronto, this boutique hotel offers rooms with minimalist décor and free WiFi. A bar, restaurant, roof top patio, and retail shop are on site. Fitted with a mounted flat-screen TV, each room at The Beverley Hotel has a safe, small refrigerator, and iPad. The modern bathrooms are equipped with a spacious shower. Select rooms overlook Queen Street West.',
        thumbnail_photo_id: photos[9].id,
        address_id: addresses[9].id,
        creator_id: admin.id,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('hotels', null, {})
  }
};
