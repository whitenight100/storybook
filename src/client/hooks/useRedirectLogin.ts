import { useCallback } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';

const useRedirectLogin = () => {
  const appBridge = useAppBridge();

  return useCallback(
    (shop: string) => {
      const redirect = Redirect.create(appBridge);
      redirect.dispatch(Redirect.Action.REMOTE, `${window.location.origin}/api/shopify?shop=${shop}`);
    },
    [appBridge]
  );
};

export default useRedirectLogin;
