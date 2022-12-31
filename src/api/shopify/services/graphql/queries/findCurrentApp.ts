import _ from 'lodash';

export default async (client: any) => {
  const { body } = await client.query({
    data: {
      query,
    },
  });
  // check graphql client errors
  const clientErrors = _.get(body, 'errors', []);
  if (clientErrors.length > 0) {
    clientErrors.forEach((e) => strapi.log.error(e.message));
    throw new Error('Failed to get current app');
  }
  // get app data
  const app = _.get(body, 'data.app');
  _.set(
    app,
    'installation.metafields',
    _.map(_.get(app, 'installation.metafields.edges', []), (edge: any) => edge.node)
  );
  return app;
};

const query = `
query findCurrentApp {
  app {
    id
    installation {
      id
      metafields (first: 100) {
        edges {
          node {
            id
            namespace
            key
            value
          }
        }
      }
    }
  }
}`;
