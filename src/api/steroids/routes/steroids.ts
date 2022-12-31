/**
 * steroids router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/steroids',
      handler: 'steroids.get',
      config: {
        policies: ['plugin::shopify.is-authenticated'],
      },
    },
    {
      method: 'POST',
      path: '/steroids',
      handler: 'steroids.set',
      config: {
        policies: ['plugin::shopify.is-authenticated'],
      },
    },
  ],
};
