import { Product } from '../product/types'
export const calculateTotalPriceProducts = (products: Product[]): number => {
    let total = 0
    products.forEach(product => {
        total = total + parseInt(product.price.toString())
    })
    return total
}

export const buildMessageToSend = (products: Product[]): string => {
    let message: string = ''
    products.forEach(product => {
        message += `* ${product.title} - $${product.price}\n`
    })
    message += `Total: $${calculateTotalPriceProducts(products)}`
    return message
}
