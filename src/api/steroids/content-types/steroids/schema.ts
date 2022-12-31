import { getThemeBlocksSync } from '../../../../getThemeBlocks';

const blocks = getThemeBlocksSync();

export default {
  kind: 'collectionType',
  collectionName: 'theme_steroids',
  info: {
    singularName: 'steroids',
    pluralName: 'theme-steroids',
    displayName: 'Steroids',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {},
  attributes: {
    ...blocks.reduce((acc, block) => {
      acc[block.slug + '_enabled'] = {
        type: 'boolean',
        required: false,
        default: false,
        configurable: false,
      };
      return acc;
    }, {}),
    shop: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'plugin::shopify.shop',
      required: true,
      unique: true,
      configurable: false,
    },
    shopify_data: {
      type: 'json',
      configurable: false,
    },
  },
};
