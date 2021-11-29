import { extendTheme, theme } from '@chakra-ui/react'
import { INFORMATION } from './constants'
export default extendTheme({
    colors: {
        primary: theme.colors[INFORMATION.color]
    },
    styles: {
        global: {
            body: {
                backgroundColor: 'primary.50'
            }
        }
    }
})
