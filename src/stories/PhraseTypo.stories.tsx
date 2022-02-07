import React from 'react';
import { PhraseTypo } from 'components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'PhraseTypo',
  component: PhraseTypo,
} as ComponentMeta<typeof PhraseTypo>;

export const Template: ComponentStory<typeof PhraseTypo> = () => <PhraseTypo />;
