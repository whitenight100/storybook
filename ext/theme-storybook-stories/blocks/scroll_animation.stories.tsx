import React from 'react';
import parseLiquid from '../parseLiquidBlock';
import schemaToArgTypes from '../schemaToArgTypes';
import { LiquidScriptsProvider } from '../components';
import ScrollAnimation from '../../theme-app-extension/blocks/scroll_animation.liquid';

const { schema, LiquidBlock } = parseLiquid(ScrollAnimation);

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

const Template: React.FC<any> = (args) => {
  return (
    <LiquidScriptsProvider scripts={[schema.javascript]}>
      <section>
        <div id="test-text-001">Test Text</div>
        <LiquidBlock id={'000001'} block={args} />
      </section>
    </LiquidScriptsProvider>
  );
};

export const Example = Template.bind({});

Example.args = {
  animation_target: '#test-text-001',
  animation_start: 20,
  animation_end: 100,
  animation_translate_x: '200px',
  animation_translate_y: '',
  animation_initial_scale: 100,
  animation_final_scale: 100,
  animation_initial_rotation: 0,
  animation_final_rotation: 0,
  animation_initial_transparency: 0,
  animation_final_transparency: 0,
  animation_initial_blur: 0,
  animation_final_blur: 0,
  animation_initial_background_color: '#000',
  animation_final_background_color: '',
};
