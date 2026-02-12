// aqui se maneja la logica del carrito de compras

import { useEffect, useMemo, useState } from "react";
import type { BeerType, CartItem } from "../types"
import { dbBeer } from "../data/db"; // base de datos simulada
import toast from "react-hot-toast";

const useCart = () => {

    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) :  []
    }

    const [data] = useState(dbBeer);
    const [cart, setCart] = useState(initialCart); 

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])
    
    const addToCart = (item: BeerType) => {
        const itemExists = cart.findIndex((beer) => beer.id === item.id);

        if (itemExists >= 0) { // existe en el carrito

            if (cart[itemExists].quantity >= MAX_ITEMS) return;// para no dejar seleccionar mas de 5

            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
            toast.success('agregado al carrito!')
        }
        else {
            const newItem: CartItem = { ...item, quantity: 1 };
            setCart([...cart, newItem])
            toast.success(`agregado al carrito!`);
        }
    }

    function removeFromCart(id: BeerType['id']) {
        setCart(prevCart => prevCart.filter(beer => beer.id !== id));
        toast.error('eliminado del carrito');
    }

    function increaseQuantity(id: BeerType['id']) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })
        setCart(updatedCart);
    }

    function decreaseQuantity(id: BeerType['id']) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item;
        })
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
        toast('Haz vaciado el carrito!', {
            icon: '🗑️',
        });
    }

    // State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);
    return {
        // properties
        data,
        cart,
        // metodos
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}
export default useCart;