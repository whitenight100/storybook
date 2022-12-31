/**
 * steroids controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::steroids.steroids', ({ strapi }) => ({
  async get(ctx) {
    // get the service
    const steroidsService = strapi.service('api::steroids.steroids');
    // get the data
    const entity = await steroidsService.get();
    // sanitize the data
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    // return the data
    return this.transformResponse(sanitizedEntity);
  },

  async set(ctx) {
    // get the data from the request
    const { body } = ctx.request;
    // get the service
    const steroidsService = strapi.service('api::steroids.steroids');
    // update the data
    const entity = await steroidsService.set(body);
    // sanitize the data
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    // return the data
    return this.transformResponse(sanitizedEntity);
  },
}));
