
import BeerCard from "./components/BeerCard";
import Header from "./components/Header";
import useCart from "./hooks/userCart";
import { Toaster } from "react-hot-toast";

function App() {


    const { data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal } = useCart();
  
    return (
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
                isEmpty={isEmpty}
                cartTotal={cartTotal}
            />
            <main>
                <section className="bg-cover bg-no-repeat h-screen" style={{ backgroundImage: "url('bg-hero.png')" }}>
                    <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center p-4">
                        <h1 className="text-white text-5xl md:text-7xl font-bold mb-4">Bienvenidos a La Cervezería</h1>
                        <p className="text-white text-lg md:text-2xl mb-8">
                            Descubre las mejores cervezas de todo el mundo.
                        </p>
                        <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:bg-yellow-600 transition duration-300">
                            Explora Nuestra Colección
                        </button>
                    </div>
                </section>
                <h2 className="text-4xl font-black text-center my-10">Nuestras Cervezas</h2>
                <section className="grid grid-cols-4 gap-5 px-10 py-6 max-w-7xl mx-auto">
                    {
                        data.map((beer) => (
                            <BeerCard
                                key={beer.id}
                                beer={beer}
                                addToCart={addToCart}
                            />
                        ))
                    }
                    
                </section>
            </main>
            <Toaster position="bottom-right" />
        </>
    )
}
export default App;
