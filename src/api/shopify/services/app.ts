/**
 * app service.
 */

import Shopify from '@shopify/shopify-api';
import graphql from './graphql';
import _ from 'lodash';

export default ({ strapi }) => ({
  async findAppOnShopify(session?: any) {
    if (!session) {
      const ctx = strapi.requestContext.get();
      session = _.get(ctx, 'state.shopify.session');
      if (!session) {
        throw new Error('No shopify session found');
      }
    }
    const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
    const app = await graphql.findCurrentApp(client);
    return app;
  },

  async setMetafields(metafields: any[], session?: any) {
    if (!session) {
      const ctx = strapi.requestContext.get();
      session = _.get(ctx, 'state.shopify.session');
      if (!session) {
        throw new Error('No shopify session found');
      }
    }
    const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
    const result = await graphql.setMetafields(client, metafields);
    return result;
  },
});
