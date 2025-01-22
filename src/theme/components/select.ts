import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys)

const selectTheme = defineMultiStyleConfig({
    variants: {
        'j-underline': definePartsStyle({
            field: {
                backgroundColor: 'transparent',
                borderWidth: '0px 0px 1px 0px',
                borderRadius: '0px',
                paddingX: '0px',
                borderBottomColor: 'netral.50',
                paddingY: '10px',
            },
            icon: {
                color: 'primary',
                right: '0px',
            }
        })
    }
})

export default selectTheme