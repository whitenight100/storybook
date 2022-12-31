import _ from 'lodash';
import { getThemeBlocksSync } from '../../../../getThemeBlocks';

const blocks = getThemeBlocksSync();

export default {
  beforeFindOne(event) {
    const ctx = (strapi as any).requestContext.get();
    const shop = _.get(ctx, 'state.shopify.shop', undefined);
    if (shop) {
      _.set(event, 'params.where.shop', shop.id);
    }
    // populate shop
    populateShop(event);
  },

  async afterFindOne(event) {
    if (_.get(event, 'result.shop.id')) {
      const appService = strapi.service('api::shopify.app');
      const ctx = (strapi as any).requestContext.get();
      if (!_.isEmpty(_.get(ctx, 'state.shopify'))) {
        const app = await appService.findAppOnShopify().catch((e) => ({ error: JSON.parse(JSON.stringify(e)) }));
        _.set(event, 'result.shopify_data', app);
      } else {
        const shop = _.get(event, 'result.shop');
        const Shopify = strapi.service('plugin::shopify.shopify').getShopify();
        const session = await Shopify.Utils.loadOfflineSession(shop.domain);
        const app = await appService.findAppOnShopify(session).catch((e) => ({ error: JSON.parse(JSON.stringify(e)) }));
        _.set(event, 'result.shopify_data', app);
      }
      _.set(event, 'result.shop.count', 1);
    }
  },

  beforeFindMany(event) {
    const ctx = (strapi as any).requestContext.get();
    const shop = _.get(ctx, 'state.shopify.shop', undefined);
    if (shop) {
      _.set(event, 'params.where.shop', shop.id);
    }
  },

  beforeCreate(event) {
    const ctx = (strapi as any).requestContext.get();
    const shop = _.get(ctx, 'state.shopify.shop', undefined);
    if (shop) {
      _.set(event, 'params.data.shop', shop.id);
    }
    _.set(event, 'params.data.createdBy', null);
    _.set(event, 'params.data.updatedBy', null);
    // populate shop
    populateShop(event);
  },

  async afterCreate(event) {
    if (_.get(event, 'result.shop.id')) {
      const appService = strapi.service('api::shopify.app');
      const ctx = (strapi as any).requestContext.get();
      const app = _.get(event, 'result.shopify_data');
      const metafields = blocks.map((block) => ({
        key: `${block.slug}_enabled`,
        namespace: 'steroids',
        type: 'boolean',
        value: _.get(event, `result.${block.slug}_enabled`, false).toString(),
        ownerId: _.get(app, 'installation.id'),
      }));
      if (!_.isEmpty(_.get(ctx, 'state.shopify'))) {
        await appService.setMetafields(metafields);
      } else {
        const shop = _.get(event, 'result.shop');
        const Shopify = strapi.service('plugin::shopify.shopify').getShopify();
        const session = await Shopify.Utils.loadOfflineSession(shop.domain);
        await appService.setMetafields(metafields, session);
      }
    }
  },

  beforeUpdate(event) {
    const ctx = (strapi as any).requestContext.get();
    const shop = _.get(ctx, 'state.shopify.shop', undefined);
    if (shop) {
      _.set(event, 'params.data.shop', shop.id);
    }
    _.set(event, 'params.data.updatedBy', null);
    // populate shop
    populateShop(event);
  },

  async afterUpdate(event) {
    if (_.get(event, 'result.shop.id')) {
      const appService = strapi.service('api::shopify.app');
      const ctx = (strapi as any).requestContext.get();
      const app = _.get(event, 'result.shopify_data');
      const metafields = blocks.map((block) => ({
        key: `${block.slug}_enabled`,
        namespace: 'steroids',
        type: 'boolean',
        value: _.get(event, `result.${block.slug}_enabled`, false).toString(),
        ownerId: _.get(app, 'installation.id'),
      }));
      if (!_.isEmpty(_.get(ctx, 'state.shopify'))) {
        await appService.setMetafields(metafields);
      } else {
        const shop = _.get(event, 'result.shop');
        const Shopify = strapi.service('plugin::shopify.shopify').getShopify();
        const session = await Shopify.Utils.loadOfflineSession(shop.domain);
        await appService.setMetafields(metafields, session);
      }
    }
  },
};

function populateShop(event) {
  // if populate is missing add it
  if (_.isNil(_.get(event, 'params.populate'))) {
    _.set(event, 'params.populate', { shop: { populate: ['id', 'domain'] } });
  }
  // if shop is missing add it to populate
  if (_.isObject(_.get(event, 'params.populate')) && _.isNil(_.get(event, 'params.populate.shop'))) {
    _.set(event, 'params.populate.shop.populate', ['id', 'domain']);
  }
  // if shop is object but populate is missing add it
  else if (
    _.isObject(_.get(event, 'params.populate.shop')) &&
    _.isEqual(_.get(event, 'params.populate.shop'), { count: true })
  ) {
    _.set(event, 'params.populate.shop', { populate: ['id', 'domain'] });
  }
}
