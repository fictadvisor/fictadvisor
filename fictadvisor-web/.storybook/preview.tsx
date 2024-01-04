import { Preview, Story } from '@storybook/react';

import { ThemeProvider } from '@mui/system';
import theme from "@/styles/theme";
import '@/styles/reset.scss';
import '@/styles/typography.scss';
import '@/styles/global-styles.scss';

const preview: Preview = {
    parameters: {
        actions: {argTypesRegex: '^on[A-Z].*'},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export const withMuiTheme = (Story:Story) => (
    <ThemeProvider theme={theme}>
        <Story />
    </ThemeProvider>
);

export const decorators = [withMuiTheme];
export default preview;
