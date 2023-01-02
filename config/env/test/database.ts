export default ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: '.tmp/test.db',
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
    },
  },
});