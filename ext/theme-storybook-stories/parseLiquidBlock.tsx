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
    *render(context: Context, emitter: Emitter) { },
  });
  const tpl = engine.parse(liquid);


  // the react component
  const LiquidBlock: React.FC<any> = ({ id, block }) => {
    // render html
    const html = React.useMemo(() => {
      return engine.renderSync(tpl, {
        block: {
          id,
          settings: block,
        },
      });
    }, [block]);
    // div ref
    const ref = React.useRef(null);
    // set html
    React.useEffect(() => {
      if (!html || !ref.current) throw new Error("html prop cant't be null");
      const slotHtml = document.createRange().createContextualFragment(html);
      ref.current.innerHTML = '';
      ref.current.appendChild(slotHtml);
      return () => {
        if (ref.current) {
          ref.current.innerHTML = '';
        }
      };
    }, [html, ref]);

    return <div ref={ref} id={'shopify-block-' + id} />;
  };

  return { schema, LiquidBlock };
};

export default parseLiquid;
