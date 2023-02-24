import React from 'react';
import parseLiquid from '../parseLiquidBlock';
import schemaToArgTypes from '../schemaToArgTypes';
import SectionColumns from '../../theme-app-extension/blocks/section_columns.liquid';

const { schema, LiquidBlock } = parseLiquid(SectionColumns);

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
  desktop_columns: 3,
  desktop_gap: 20,
};
