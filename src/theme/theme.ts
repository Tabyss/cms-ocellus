import { extendTheme } from '@chakra-ui/react'
import {
    background,
    chakra,
    error,
    onSurfaceVariant,
    outline,
    palette,
    primary,
    secondary,
    success,
    surface,
    surfacePlus,
    tertiary,
    warning,
} from './colors'
import fonts from './fonts'
import fontSizes from './fontSizes'
import { 
    buttonTheme, 
    drawerTheme, 
    headingTheme, 
    formTheme,
    tableTheme,
    inputTheme,
    selectTheme,
} from './components'

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    shadows: {
        normal: "0 0 6px 3px rgba(0, 0, 0, 0.05)",
    },
    colors: {
        ...palette,
    },
    semanticTokens: {
        colors: {
            ...primary,
            ...secondary,
            ...tertiary,
            ...error,
            ...background,
            ...surface,
            ...onSurfaceVariant,
            ...outline,
            ...success,
            ...warning,
            ...surfacePlus,
            ...chakra,
        },
    },
    fonts: fonts,
    fontSizes: fontSizes,
    components: {
        Button: buttonTheme,
        Heading: headingTheme,
        Drawer: drawerTheme,
        Form: formTheme,
        Table: tableTheme,
        Input: inputTheme,
        Select: selectTheme,
    },
})

export default theme
