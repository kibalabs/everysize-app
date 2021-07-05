import React from 'react';
import { ColorSettingView, BackgroundView, Text, Link, TextAlignment, PaddingSize, PaddingView } from '@kibalabs/ui-react';


export const Footer = (): React.ReactElement => {
  return (
    <ColorSettingView variant='inverse'>
      <BackgroundView color='$colors.background'>
        <PaddingView paddingHorizontal={PaddingSize.Wide} paddingVertical={PaddingSize.Default}>
          <Text variant='note' alignment={TextAlignment.Center}>Create beautiful, fully responsive websites with <Link target='https://www.everypagehq.com' text='everypage' /> 👀.
          <br />
          Made by <Link target='https://www.kibalabs.com' text='Kiba Labs' />.</Text>
        </PaddingView>
      </BackgroundView>
    </ColorSettingView>
  );
};
