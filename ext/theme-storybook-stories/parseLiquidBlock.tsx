import React from 'react';
import { TagToken, Context, Emitter, TopLevelToken, Liquid } from 'liquidjs';

type RemainToken = TopLevelToken & { name: string };

const parseLiquid = (liquid: string) => {
  const engine = new Liquid();
  let schema: any = {};
  engine.registerTag('schema', {
    parse(tagToken: TagToken, remainTokens: RemainToken[]) {
      this.tpls = [];
      let closed = false;
      while (remainTokens.length) {
        const token = remainTokens.shift();
        if (token.name === 'endschema') {
          closed = true;
          break;
        }
        const tpl: any = this.liquid.parser.parseToken(token, remainTokens);
        schema = JSON.parse(tpl.str);
        this.tpls.push(tpl);
      }
      if (!closed) throw new Error(`tag ${tagToken.getText()} not closed`);
    },
    *render(context: Context, emitter: Emitter) {},
  });
  const tpl = engine.parse(liquid);

  // the react component
  const LiquidBlock: React.FC = (props: any) => {
    // random id
    const id = Math.random().toString(36).substring(2, 9);
    return (
      <div
        id={'shopify-block-' + id}
        dangerouslySetInnerHTML={{
          __html: engine.renderSync(tpl, {
            block: {
              id,
              settings: props,
            },
          } as any),
        }}
      />
    );
  };

  return { schema, LiquidBlock };
};

export default parseLiquid;
