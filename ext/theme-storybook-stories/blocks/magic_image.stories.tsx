import React from 'react';
import parseLiquid from '../parseLiquidBlock';
import schemaToArgTypes from '../schemaToArgTypes';
import MagicImage from '../../theme-app-extension/blocks/magic_image.liquid';

const { schema, LiquidBlock } = parseLiquid(MagicImage);

export default {
  title: schema.name,
  argTypes: schemaToArgTypes(schema),
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
};

const Template: React.FC = (args) => <LiquidBlock id="000002" block={args} />;

export const Title = Template.bind({});

Title.args = {
  image: '<img src="https://www.w3schools.com/css/img_5terre.jpg" />',
  id: 'column-grid-001',
  class: 'column-grid',
};
