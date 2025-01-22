import headingTheme from './heading'

const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)"
}

const formTheme = {
    variants: {
        floating: {
            container: {
                _focusWithin: {
                    label: {
                        ...activeLabelStyles
                    }
                },
                "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                    ...activeLabelStyles
                },
                label: {
                    top: '3px',
                    left: 0,
                    zIndex: 2,
                    position: "absolute",
                    backgroundColor: "background",
                    pointerEvents: "none",
                    mx: 3,
                    px: 1,
                    my: 2,
                    transformOrigin: "left top",
                    ...headingTheme?.sizes?.chakra_label_large,
                    color: 'onSurfaceVariant',
                }
            }
        }
    }
}

export default formTheme