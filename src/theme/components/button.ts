import headingTheme from './heading'
import { mode } from '@chakra-ui/theme-tools'

const jBaseStyle = {
    borderRadius: '12px',
    width: 'min-content',
    size: 'normal',
    ...headingTheme?.sizes?.chakra_label_large,
}

const buttonTheme = {
    sizes: {
        normal: {
            h: '48px',
            py: '12px',
            px: '24px',
        },
        small: {
            h: '40px',
            py: '8px',
            px: '24px',
        },
    },
    variants: {
        'j-primary': (props: any) => ({
            ...jBaseStyle,
            backgroundColor: 'primary',
            color: mode('#FFFFFF', 'onPrimary')(props),
            _hover: {
                backgroundColor: mode('primary.40', 'primary.70')(props),
                _disabled: {
                    backgroundColor: mode('neutral.90', 'neutral.90')(props),
                    color: 'neutral.60',
                },
            },
            _focus: {
                backgroundColor: mode('primary.40', 'primary.60')(props),
            },
            _active: {
                backgroundColor: mode('primary.40', 'primary.60')(props),
            },
            _disabled: {
                backgroundColor: mode('neutral.90', 'neutral.90')(props),
                color: 'neutral.60',
            },
        }),
        'j-outline': (props: any) => ({
            ...jBaseStyle,
            backgroundColor: 'transparent',
            color: mode('primary', 'primary')(props),
            borderWidth: '1px',
            borderColor: 'primary',
            _hover: {
                backgroundColor: mode('surfacePlus2', 'surfacePlus2')(props),
                _disabled: {
                    backgroundColor: 'transparent',
                    color: mode('primary', 'primary')(props),
                },
            },
            _focus: {
                backgroundColor: mode('surfacePlus3', 'surfacePlus3')(props),
            },
            _active: {
                backgroundColor: mode('surfacePlus3', 'surfacePlus3')(props),
            },
            _disabled: {
                backgroundColor: 'transparent',
                color: mode('primary', 'primary')(props),
            },
        }),
        'j-text': (props: any) => ({
            ...jBaseStyle,
            backgroundColor: 'transparent',
            color: mode('primary', 'primary')(props),
            _hover: {
                backgroundColor: mode('surfacePlus2', 'surfacePlus2')(props),
                _disabled: {
                    backgroundColor: 'transparent',
                    color: mode('primary', 'primary')(props),
                },
            },
            _focus: {
                backgroundColor: mode('surfacePlus3', 'surfacePlus3')(props),
            },
            _active: {
                backgroundColor: mode('surfacePlus3', 'surfacePlus3')(props),
            },
            _disabled: {
                backgroundColor: 'transparent',
                color: mode('primary', 'primary')(props),
            },
        }),
        'j-tonal': (props: any) => ({
            ...jBaseStyle,
            backgroundColor: mode('primary.90', 'primaryContainer')(props),
            color: mode('primary', '#FFFFFF')(props),
            _hover: {
                backgroundColor: mode('primary.80', 'primary.40')(props),
                _disabled: {
                    backgroundColor: mode('neutral.90', 'neutral.90')(props),
                    color: 'neutral.60',
                },
            },
            _focus: {
                backgroundColor: mode('primary.70', 'primary.50')(props),
            },
            _active: {
                backgroundColor: mode('primary.80', 'primary.50')(props),
            },
            _disabled: {
                backgroundColor: mode('neutral.90', 'neutral.90')(props),
                color: 'neutral.60',
            },
        }),
    },
}

export default buttonTheme
