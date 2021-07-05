import React from 'react';
import { IconButton, KibaIcon, Box, Image, Direction, Stack, Alignment, PaddingSize, ColorSettingView, Button, SingleLineInput, Form, Spacing } from '@kibalabs/ui-react';


interface INavBarProps {
  url: string;
  onUrlChanged: (url: string) => void;
  onTwitterShareClicked: () => void;
}

export const NavBar = (props: INavBarProps): React.ReactElement => {
  const [url, setUrl] = React.useState<string>(props.url);

  const onUrlChanged = (value: string): void => {
    setUrl(value);
  };
``
  const onTwitterShareClicked = (): void => {
    props.onTwitterShareClicked();
  };

  const onFormSubmitted = (): void => {
    var newUrl = url;
    if (!newUrl.startsWith('http')) {
      newUrl = newUrl.startsWith('localhost') ? `http://${url}` : `https://${url}`;
      setUrl(newUrl);
    }
    props.onUrlChanged(newUrl);
  }

  return (
    <ColorSettingView variant='inverse'>
      <Box variant='navbar' zIndex={100}>
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} paddingVertical={PaddingSize.Default} paddingHorizontal={PaddingSize.Wide}>
          <Stack.Item shrinkFactor={1}>
            <Box height='30px' isFullWidth={false}>
              <Stack direction={Direction.Horizontal} isFullWidth={true} childAlignment={Alignment.Center}>
                <Box width='30px'><Image source='/assets/favicon.svg' alternativeText='logo' isLazyLoadable={false} /></Box>
                <Stack.Item shrinkFactor={1}>
                  <Box maxWidth='170px'><Image source='/assets/everysize-wordmark-dark.svg' alternativeText='everysize' isLazyLoadable={false} /></Box>
                </Stack.Item>
              </Stack>
            </Box>
          </Stack.Item>
          <Stack.Item growthFactor={1}><Spacing /></Stack.Item>
          <Stack.Item growthFactor={1} shrinkFactor={1}>
            <Box maxWidth='500px'>
              <Form onFormSubmitted={onFormSubmitted}>
                <Stack direction={Direction.Horizontal}>
                  <Stack.Item growthFactor={1}>
                    <SingleLineInput
                      value={url || ''}
                      onValueChanged={onUrlChanged}
                    />
                  </Stack.Item>
                  <Button
                    variant='tertiary'
                    buttonType='submit'
                    text='GO'
                  />
                </Stack>
              </Form>
            </Box>
          </Stack.Item>
          <Stack.Item growthFactor={1}><Spacing /></Stack.Item>
          <IconButton
            label='Share'
            variant='tertiary'
            icon={<KibaIcon iconId='ion-logo-twitter' />}
            onClicked={onTwitterShareClicked}
          />
        </Stack>
      </Box>
    </ColorSettingView>
  );
};
