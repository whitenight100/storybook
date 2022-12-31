/**
 * steroids service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService<any>('api::steroids.steroids', ({ strapi }) => ({
  async get() {
    const { results } = await super.find();
    if (results.length === 0) {
      return null;
    } else {
      return results[0];
    }
  },

  async set(params: any) {
    const { results } = await this.find();
    if (results.length === 0) {
      return await super.create(params);
    } else {
      return await super.update(results[0].id, params);
    }
  },
}));
