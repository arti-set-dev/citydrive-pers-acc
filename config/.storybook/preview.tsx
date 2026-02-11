import type { Preview } from '@storybook/react-webpack5';
import { MemoryRouter } from 'react-router-dom';
import { withThemeByClassName } from '@storybook/addon-themes';
import { Theme } from '@citydrive/shared/lib/context/ThemeContext';
import '@citydrive/shared/styles/global.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, { parameters }) => {
      const { router = {} } = parameters;
      const { initialEntries = ['/'] } = router;

      return (
        <MemoryRouter initialEntries={initialEntries}>
          <Story />
        </MemoryRouter>
      );
    },
    withThemeByClassName({
      themes: {
        light: Theme.LIGHT,
        dark: Theme.DARK,
      },
      defaultTheme: 'light',
      parentSelector: 'body',
    }),
  ],
};

export default preview;
