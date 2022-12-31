import React from 'react';
import PolarisMarkdown from '@shop3/polaris-markdown';

const DocsSteroids: React.FC = () => {
  const docs = ['# Inject Steroids', '---', 'Enable or disable theme extension blocks.'];
  return <PolarisMarkdown>{docs.join('\n')}</PolarisMarkdown>;
};

export default DocsSteroids;
