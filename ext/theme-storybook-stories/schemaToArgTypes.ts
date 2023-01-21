const schemaToArgTypes = (schema: any) => {
  return schema.settings.reduce((acc: any, setting: any) => {
    let argType = {};
    switch (setting.type) {
      case 'text':
        argType = {
          control: { type: 'text' },
        };
        break;
      case 'inline_richtext':
        argType = {
          control: { type: 'text' },
        };
        break;
      case 'select':
        argType = {
          options: setting.options.map((option: any) => option.label),
          mapping: setting.options.reduce((acc: any, option: any) => ({ ...acc, [option.label]: option.value }), {}),
          control: {
            type: 'select',
          },
        };
        break;
      case 'checkbox':
        argType = {
          control: { type: 'boolean' },
        };
        break;
      case 'range':
        argType = {
          control: { type: 'range', min: setting.min, max: setting.max, step: setting.step },
        };
        break;
      case 'color':
        argType = {
          control: { type: 'color' },
        };
        break;
      case 'color_background':
        argType = {
          control: { type: 'color' },
        };
        break;
      case 'header':
      case 'paragraph':
        return acc;
      default:
        console.warn('Unknown type', setting.type);
        break;
    }
    return {
      ...acc,
      [setting.id]: argType,
    };
  }, {});
};

export default schemaToArgTypes;
