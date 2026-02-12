import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CartItem, BeerType } from "../types";
import { useState } from "react";

type HeaderProps = {
    cart: CartItem[];
    removeFromCart: (id: BeerType['id']) => void
    increaseQuantity: (id: BeerType['id']) => void
    decreaseQuantity: (id: BeerType['id']) => void
    clearCart: () => void
    isEmpty: boolean
    cartTotal: number
}

const Header = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal }: HeaderProps) => {

    //const {isEmpty, cartTotal } = useCart(); --> esto no funciona, pasamos via props
    
    const [toggle, setIsToggle] = useState(false);

    return (
        <header className="bg-gray-900 sticky top-0 w-full">
            <div className="max-w-7xl px-10 py-4 mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-black uppercase">
                        <span className="bg-yellow-400 rounded px-1 text-black">Cerve</span>
                        <span className="text-white">zería</span>
                    </h1>
                    <nav className="">
                        <div className="">
                            <button
                                className="text-xs relative text-center text-white"
                                onClick={() => setIsToggle(!toggle)}
                            >
                                <ShoppingBagIcon className="w-10" />
                                <><span className="sr-only">Notifications</span>
                                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">{cart.length}</div>
                                </>
                            </button>

                            {
                                toggle && (
                                    <div className="bg-gray-900 border p-3 absolute right-5 rounded-lg">
                                        {
                                            isEmpty ? (
                                                <p className="text-center text-white w-96">El carrito esta vacio</p>
                                            ) : (
                                                <>
                                                        <table className="w-96 text-sm text-left text-gray-50">
                                                        <thead>
                                                            <tr>
                                                                <th>Imagen</th>
                                                                <th>Nombre</th>
                                                                <th>Precio</th>
                                                                <th>Cantidad</th>
                                                            </tr>
                                                        </thead>
                                                            <tbody className="divide-y divide-gray-200">
                                                            {
                                                                cart.map((beer) => (
                                                                    <tr key={beer.id}>
                                                                        <td>
                                                                            <img className="w-10 h-10 object-contain" src={`/img/${beer.image}.png`} alt="imagen guitarra" />
                                                                        </td>
                                                                        <td>{beer.name}</td>
                                                                        <td>{beer.price}</td>
                                                                        <td>
                                                                            <button
                                                                                type="button"
                                                                                className="w-5 h-5 bg-gray-500 rounded-full font-black"
                                                                                onClick={() => decreaseQuantity(beer.id)}
                                                                            > - </button>
                                                                            <span className="px-1">{beer.quantity}</span>
                                                                            <button
                                                                                type="button"
                                                                                className="w-5 h-5 bg-gray-500 rounded-full font-black"
                                                                                onClick={() => increaseQuantity(beer.id)}
                                                                            > + </button>
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                className="w-6 h-6 text-white"
                                                                                type="button"
                                                                                onClick={() => removeFromCart(beer.id)}
                                                                            > <TrashIcon/> </button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                    <p className="text-white mt-5">Total a pagar: <span className="font-bold">$ {cartTotal}</span></p>
                                                </>
                                            )
                                        }
                                        {
                                            cart.length > 0 ? 
                                                <button
                                                    className="bg-gray-700 w-full rounded-sm text-white mt-3 font-bold"
                                                    onClick={clearCart}
                                                >Vaciar Carrito</button>
                                                : <p className="text-white text-center py-5">Agrega tus productos...</p>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </nav>
                </div>
            </div>
        </header>

    );
}
export default Header;