import _ from 'lodash';

type SetMetafield = {
  ownerId: string;
  namespace: string;
  key: string;
  type: string;
  value: string;
};

export default async (client: any, metafields: SetMetafield[]) => {
  const variables = {
    metafieldsSetInput: metafields,
  };
  const { body } = await client.query({
    data: {
      query,
      variables,
    },
  });
  // check graphql client errors
  const clientErrors = _.get(body, 'errors', []);
  if (clientErrors.length > 0) {
    clientErrors.forEach((e) => strapi.log.error(e.message));
    throw new Error('Failed to set metafields');
  }
  // check graphql user errors
  const userErrors = _.get(body, 'data.metafieldsSet.userErrors', []);
  if (userErrors.length > 0) {
    userErrors.forEach((e) => strapi.log.error(e.message));
    throw new Error('Failed to set metafields');
  }
  // log succes for store id
  strapi.log.info(`Successfully set metafields for store ${client.domain}`);
  // get metafields ids
  const metafieldsIds = _.map(_.get(body, 'data.metafieldsSet.metafields', []), (metafield: any) => metafield.id);
  // return values
  return { metafieldsIds };
};

const query = `
mutation setMetafields($metafieldsSetInput: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafieldsSetInput) {
    metafields {
      id
    }
    userErrors {
      field
      message
    }
  }
}`;
