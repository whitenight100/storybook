import client from './webpack.client';

export default {
  register() {
    // register client
    client.register();
  },

  async bootstrap({ strapi }) {
    // bootstrap client
    await client.bootstrap({ strapi });
    // initialize steroids
    strapi.service('api::steroids.initialize').initialize();
  },

  async destroy({ strapi }) {
    // destroy client
    await client.destroy({ strapi });
  },
};
