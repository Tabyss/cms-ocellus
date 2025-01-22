import headingTheme from './heading'

const tableTheme = {
    variants: {
        'j-simple': () => ({
            th: {
                ...headingTheme?.sizes?.chakra_title_small,
                backgroundColor: '#FFC6C9',
                padding: '16px',
                textAlign: 'left',
                color: 'onSurfaceVariant',
                textTransform: 'capitalize',
                "&:first-of-type": {
                    borderTopLeftRadius: '16px',
                },
                "&:last-of-type": {
                    borderTopRightRadius: '16px',
                }
            },
            td: {
                ...headingTheme?.sizes?.chakra_body_medium,
                backgroundColor: '#FFF1F2',
                padding: '22px 16px',
                textAlign: 'left',
                color: 'onSurface',
            },
        })
    },
}

export default tableTheme