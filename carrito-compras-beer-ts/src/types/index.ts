export type BeerType = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number
}

export type CartItem = BeerType & {
    quantity: number
}