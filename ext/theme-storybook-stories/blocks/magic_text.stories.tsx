import React from 'react';
import parseLiquid from '../parseLiquidBlock';
import schemaToArgTypes from '../schemaToArgTypes';
import MagicText from '../../theme-app-extension/blocks/magic_text.liquid';

const { schema, LiquidBlock } = parseLiquid(MagicText);

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
  text: 'Magic <strong>Text</strong>',
  tag: 'h1',
  id: 'magic-text-001',
  class: 'magic-text',
  tcolor: '#0f172a',
  bcolor: '#34d399',
  bweight: false,
  size_mobile: '3xl',
  weight_mobile: 'bold',
  align_mobile: 'center',
  size_tablet: '6xl',
  weight_tablet: 'bold',
  align_tablet: 'center',
  size_desktop: '9xl',
  weight_desktop: 'bold',
  align_desktop: 'center',
};
