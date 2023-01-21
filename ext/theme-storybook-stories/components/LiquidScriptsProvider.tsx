import React from 'react';
import { Liquid } from 'liquidjs';

const engine = new Liquid();

type Props = {
  scripts?: string[];
  children?: React.ReactNode;
};

const LiquidScriptsProvider: React.FC<Props> = ({ scripts = [], children }) => {
  const divRef = React.useRef(null);
  const [loaded, setLoaded] = React.useState(false);
  // load script
  React.useEffect(() => {
    if (window && document) {
      if (scripts.length === 0) {
        setLoaded(true);
        return;
      }
      // get body
      const body = document.querySelector('body');
      // dom scripts
      const domScripts: HTMLScriptElement[] = [];
      // loaded promises
      const loadedPromises: Promise<any>[] = [];
      // load scripts
      for (const scriptUrl of scripts) {
        const script = document.createElement('script');
        script.src = '/' + scriptUrl;
        script.type = 'text/javascript';
        script.async = true;
        body.appendChild(script);
        loadedPromises.push(
          new Promise<void>((resolve, reject) => {
            script.onload = () => {
              domScripts.push(script);
              resolve();
            };
            script.onerror = () => {
              console.error(`Error loading script ${scriptUrl}`);
              reject();
            };
          })
        );
      }
      // wait for all scripts to load
      Promise.all(loadedPromises).then(() => {
        setLoaded(true);
      });
      // return cleanup
      return () => {
        domScripts.forEach((script) => body.removeChild(script));
      };
    }
  }, [scripts]);

  React.useEffect(() => {
    if (divRef && divRef.current) {
      document.dispatchEvent(
        new Event('DOMContentLoaded', {
          bubbles: true,
          cancelable: true,
        })
      );
    }
  }, [loaded]);

  // return
  return loaded ? <main ref={divRef}>{children}</main> : null;
};

export default LiquidScriptsProvider;
