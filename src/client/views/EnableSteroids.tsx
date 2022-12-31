import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Page, SettingToggle, SkeletonBodyText, TextStyle } from '@shopify/polaris';
import { useSessionToken, useShop } from '../context';
import { useRedirectLogin } from '../hooks';
import useSWR from 'swr';
import _ from 'lodash';

const EnableSteroids: React.FC = () => {
  const shop = useShop();
  const sessionToken = useSessionToken();
  const redirectLogin = useRedirectLogin();
  const history = useHistory();
  const location = useLocation();

  const { data, mutate } = useSWR(`/api/steroids`, (resourceUrl) =>
    fetch(resourceUrl, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        redirectLogin(shop.domain);
        return;
      } else if (res.status >= 400) {
        res.json().then((error) => {
          console.error('Error fetching steroids', res.status, error);
        });
        return;
      }
      return res.json();
    })
  );

  const handleEnable = async (input: { [k: string]: boolean }) => {
    // mutate inputs to null to show loading state
    const loadingData = _.cloneDeep(data);
    _.forEach(input, (value, key) => {
      _.set(loadingData, `data.attributes.${key}`, null);
    });
    mutate(loadingData, { revalidate: false });
    // write a fetch call to enable the theme extensions
    const response = await fetch(`/api/steroids`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: input,
      }),
    });
    // check if the response is ok
    if (!response.ok) {
      // if not, log the error
      console.error('Error enabling theme extensions.');
      return;
    }
    const result = await response.json();
    // mutate the data
    mutate(result, { revalidate: false });
  };

  return (
    <Page title="Inject Steroids" subtitle="Enable or disable theme extension blocks." divider>
      <Layout>
        <Layout.Section>
          {THEME_EXTENSION_BLOCKS.map((block, id) =>
            !_.isEmpty(data) ? (
              <SettingToggle
                key={id}
                action={{
                  content: _.get(data, `data.attributes.${block.slug}_enabled`, false) ? 'Disable' : 'Enable',
                  onAction: () => {
                    handleEnable({
                      [`${block.slug}_enabled`]: !_.get(data, `data.attributes.${block.slug}_enabled`, false),
                    });
                  },
                  outline: _.isNil(_.get(data, `data.attributes.${block.slug}_enabled`)),
                  loading: _.isNil(_.get(data, `data.attributes.${block.slug}_enabled`)),
                }}
                enabled={_.get(data, `data.attributes.${block.slug}_enabled`, false)}
              >
                {block.name}
                {' is '}
                <TextStyle variation="strong">
                  {_.isNil(_.get(data, `data.attributes.${block.slug}_enabled`))
                    ? 'loading'
                    : _.get(data, `data.attributes.${block.slug}_enabled`)
                    ? 'enabled'
                    : 'disabled'}
                </TextStyle>
              </SettingToggle>
            ) : (
              <SettingToggle
                key={id}
                action={{
                  outline: true,
                  loading: true,
                }}
              >
                <SkeletonBodyText lines={1} />
              </SettingToggle>
            )
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default EnableSteroids;
