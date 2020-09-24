import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fb3841',
            main: '#fa0712',
            dark: '#af040c',
            contrastText: '#fff'
        },
        secondary: {
            light: '#a1cc33',
            main: '#8ac000',
            dark: '#608600',
            contrastText: '#000'
        },
    },
    status: {
        danger: 'orange',
    },
});