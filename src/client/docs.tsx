// ddd
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from '@shopify/app-bridge-react';
import { AppProvider } from '@shopify/polaris';
import { SessionProvider, ShopProvider, SubscriptionProvider } from './context';
import { DocsSteroids } from './views';
import { AppFooter, AppLink } from './components';

import translationsEn from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

const Docs = () => {
  const apiKey = process.env.SHOPIFY_API_KEY;
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (!apiKey || !params.host) {
    return null;
  }

  const config = {
    apiKey,
    host: params.host,
    forceRedirect: true,
  };

  return (
    <Provider config={config}>
      <AppProvider i18n={translationsEn} linkComponent={AppLink}>
        <BrowserRouter>
          <ShopProvider>
            <SessionProvider>
              <Route exact path="/">
                <DocsSteroids />
              </Route>
              <AppFooter />
            </SessionProvider>
          </ShopProvider>
        </BrowserRouter>
      </AppProvider>
    </Provider>
  );
};

ReactDOM.render(<Docs />, document.getElementById('root'));
