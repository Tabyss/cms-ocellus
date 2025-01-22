import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const inputTheme = defineMultiStyleConfig({
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
        })
    }
})

export default inputTheme