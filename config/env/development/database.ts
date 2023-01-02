export default ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: '.tmp/data.db',
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
    },
  },
});