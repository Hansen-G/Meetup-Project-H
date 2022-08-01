'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Venues', [
    {
      address: 'Online',
      groupId: 1,
      city: 'Online',
      state: 'Online',
      lat: 0,
      lng: 0,
        html: '<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>',
    },
    {
      address: '217 Broadway, New York, NY 10007',
      groupId: 2,
      city: 'New York',
      state: 'NY',
      lat: 40.7128,
      lng: -74.0060,
      html: '<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=217%20Broadway,%20New%20York,%20NY%2010007&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>'
    },
    {
      address: '1300 S Linn White Dr, Chicago, IL 60605',
      groupId: 3,
      city: 'Chicago',
      state: 'IL',
      lat: 41.8781,
      lng: -87.6298,
      html: '<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=1300%20S%20Linn%20White%20Dr,%20Chicago,%20IL%2060605&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>'
    },
    {
      address: '6000 Santa Monica Blvd, Los Angeles, CA 90038',
      groupId: 1,
      city: 'LA',
      state: 'CA',
      lat: 34.0522,
      lng: -118.2437,
      html: '<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=6000%20Santa%20Monica%20Blvd,%20Los%20Angeles,%20CA%2090038&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>'
    },
    {
      address: 'Johns Hopkins University',
      groupId: 1,
      city: 'Balitmore',
      state: 'MD',
      lat: 39.2904,
      lng: -76.6122,
      html: '<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Johns%20Hopkins%20University&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>'
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      city: { [Op.in]: ['Baltimore', 'New York', 'Chicago'] }
    }, {});
  }
};
