import axios from 'axios'
import papa from 'papaparse'
import { INFORMATION } from '../app/constants'

import { Product } from './types'

export default {
    list: async (): Promise<Array<Product>> => {
        return axios
            .get(
                INFORMATION.sheet,
                {
                    responseType: 'blob'
                }
            )
            .then(response => {
                return new Promise<Array<Product>>((resolve, reject) => {
                    papa.parse(response.data, {
                        // first element are headers
                        header: true,
                        complete: results => {
                            const products = results.data as Product[]

                            const newProducts = products.map(product => ({
                                ...product,
                                price: Number(product.price)
                            }))

                            return resolve(newProducts)
                        },
                        error: err => reject(err.message)
                    })
                })
            })
    }
}
