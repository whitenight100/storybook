import React from 'react';
import parseLiquid from '../parseLiquidBlock';
import schemaToArgTypes from '../schemaToArgTypes';
import SectionStyle from '../../theme-app-extension/blocks/section_style.liquid';

const { schema, LiquidBlock } = parseLiquid(SectionStyle);

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

const Template: React.FC = (args) => <LiquidBlock id="000001" block={args} />;

export const Title = Template.bind({});

Title.args = {
  background_color: '#fff',
  background_image: '<img src="https://www.w3schools.com/css/img_5terre.jpg" />',
  top_padding: 5,
  bottom_padding: 5,
};
