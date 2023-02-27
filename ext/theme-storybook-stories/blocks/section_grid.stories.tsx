import React from 'react';
import parseLiquid from '../parseLiquidBlock';
import schemaToArgTypes from '../schemaToArgTypes';
import SectionGrid from '../../theme-app-extension/blocks/section_grid.liquid';

const { schema, LiquidBlock } = parseLiquid(SectionGrid);

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
  'item1Rows': 1,
  'item1Columns': 2,
  'item2Rows': 2,
  'item2Columns': 1,
  'item3Rows': 1,
  'item3Columns': 1,
  'item4Rows': 1,
  'item4Columns': 1,
  'item5Rows': 1,
  'item5Columns': 3,
};
