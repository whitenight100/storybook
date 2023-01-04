import { getThemeBlocksSync } from '../../../getThemeBlocks';

const blocks = getThemeBlocksSync();

export default ({ strapi }) => ({
  initialize() {
    strapi.service('plugin::shopify.lifecycles').subscribe({
      async afterInstall(shopDomain) {
        const shopifyShopService = strapi.service('plugin::shopify.shop');
        const shop = await shopifyShopService.findByDomain(shopDomain);
        const steroidsService = strapi.service('api::steroids.steroids');
        steroidsService.set({
          data: {
            ...blocks.reduce((acc, block) => {
              acc[block.slug + '_enabled'] = false;
              return acc;
            }, {}),
            shop: shop.id,
          },
        });
      },
    });
  },
});
