# Funciones dentro del componente `App`

## Función `initialCart`
```js
const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
}
```
Recupera los datos del carrito desde el almacenamiento local del navegador al cargar la aplicación.
-   **Detalle**:
    -   Utiliza `localStorage.getItem('cart')` para obtener los datos del carrito almacenados.
    -   Si hay datos almacenados (`localStorageCart` no es null), los convierte de JSON a un array con `JSON.parse(localStorageCart)`.
    -   Si no hay datos almacenados, devuelve un array vacío `[]`.

## Hook `useEffect`
```js
useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);
```
 Sincroniza el estado del carrito con el almacenamiento local cada vez que el estado del carrito cambia.
-   **Detalle**:
    -   Cada vez que `cart` cambia, el `useEffect` guarda el estado actual del carrito en el almacenamiento local.
    -   `localStorage.setItem('cart', JSON.stringify(cart))` convierte el carrito en una cadena JSON y lo guarda en el almacenamiento local bajo la clave `cart`.
## Función `addToCart`
```js
function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
        if(cart[itemExists].quantity >= MAX_ITEMS) return;
        const updatedCart = [...cart];
        updatedCart[itemExists].quantity++;
        setCart(updatedCart);
    } else {
        item.quantity = 1;
        setCart([...cart, item]);
    }
}
```
Agrega una guitarra al carrito o incrementa su cantidad si ya está en el carrito.
-   **Detalle**:
    -   Busca el índice del artículo en el carrito usando `findIndex`.
    -   Si el artículo ya está en el carrito (`itemExists >= 0`):
        -   Verifica si la cantidad actual es menor que `MAX_ITEMS`.
        -   Si es menor, incrementa la cantidad en 1.
        -   Crea una copia actualizada del carrito con `...cart` y actualiza la cantidad del artículo.
        -   Usa `setCart(updatedCart)` para actualizar el estado del carrito.
    -   Si el artículo no está en el carrito:
        -   Establece `item.quantity` a 1.
        -   Agrega el artículo al carrito usando `setCart([...cart, item])`.

## Función `removeFromCart`
```js
function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
}
```
Elimina una guitarra del carrito por su ID.
-   **Detalle**:
    -   Usa `filter` para crear un nuevo array que excluye el artículo con el ID especificado.
    -   Actualiza el estado del carrito con el nuevo array usando `setCart`.
## Función `increaseQuantity`
```js
function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
        if (item.id === id && item.quantity < MAX_ITEMS) {
            return {
                ...item,
                quantity: item.quantity + 1
            }
        }
        return item;
    });
    setCart(updatedCart);
}
```
Incrementa la cantidad de una guitarra en el carrito si es menor que `MAX_ITEMS`.
-   **Detalle**:
    -   Usa `map` para iterar sobre el carrito y buscar el artículo con el ID especificado.
    -   Si encuentra el artículo y su cantidad es menor que `MAX_ITEMS`, crea una copia del artículo con `...item` y aumenta su cantidad en 1.
    -   Si no se cumple la condición, retorna el artículo sin cambios.
    -   Actualiza el estado del carrito con el nuevo array usando `setCart`.

## Función `decreaseQuantity`
```js
function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
        if (item.id === id && item.quantity > MIN_ITEMS) {
            return {
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item;
    });
    setCart(updatedCart);
}
```
Decrementa la cantidad de una guitarra en el carrito si es mayor que `MIN_ITEMS`.
-   **Detalle**:
    -   Usa `map` para iterar sobre el carrito y buscar el artículo con el ID especificado.
    -   Si encuentra el artículo y su cantidad es mayor que `MIN_ITEMS`, crea una copia del artículo con `...item` y reduce su cantidad en 1.
    -   Si no se cumple la condición, retorna el artículo sin cambios.
    -   Actualiza el estado del carrito con el nuevo array usando `setCart`.

## Función `clearCart`
```js
function clearCart() {
    setCart([]);
}
```
Vacía todos los artículos del carrito.
-   **Detalle**:
    -   Simplemente establece el estado del carrito a un array vacío `[]`.

## Renderizado del Componente
```js
return (
    <>
        <Header
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
        />
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>
            <div className="row mt-5">
                {
                    data.map((guitar) => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            addToCart={addToCart}
                        />
                    ))
                }
            </div>
        </main>
        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
    </>
)
```
 Renderiza la aplicación completa.
-   **Detalle**:
    -   Renderiza el componente `Header`, pasando todas las funciones relacionadas con el carrito como props.
    -   Renderiza el contenido principal (`main`) con una lista de guitarras.
    -   Cada guitarra se renderiza usando el componente `Guitar`, al cual se le pasan los datos de la guitarra y la función `addToCart` como props.
    -   Renderiza un pie de página (`footer`) con un mensaje.

# Componente Header
 ## Importaciones y Definición del Componente.
Aquí importamos `useMemo` de React. `useMemo` es un hook que memoriza el resultado de una función para evitar cálculos costosos en cada renderizado, solo recalcándolo cuando las dependencias cambian.
```js
import { useMemo } from "react";
```
## Propiedades del Componente `Header`
```js
const Header = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) => {
```
El componente `Header` recibe varias propiedades (`props`):
-   `cart`: El estado actual del carrito de compras.
-   `removeFromCart`: Función para eliminar un artículo del carrito.
-   `increaseQuantity`: Función para incrementar la cantidad de un artículo en el carrito.
-   `decreaseQuantity`: Función para disminuir la cantidad de un artículo en el carrito.
-   `clearCart`: Función para vaciar el carrito.
## Estado Derivado con `useMemo`

#### `isEmpty`
```js
const isEmpty = useMemo(() => cart.length === 0, [cart]);
```
Determina si el carrito está vacío.
-   **Detalle**:
    -   `useMemo` memoriza el resultado de `cart.length === 0`.
    -   Solo recalcula cuando `cart` cambia.
    -   `isEmpty` será `true` si `cart` está vacío, y `false` si tiene elementos.

#### `cartTotal`
```js
const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);
```
Calcula el total a pagar basado en los elementos y sus cantidades en el carrito.
-   **Detalle**:
    -   `useMemo` memoriza el resultado de la función de reducción que suma los precios totales de los artículos en el carrito.
    -   `reduce` recorre cada elemento del carrito y suma el producto de `item.quantity` y `item.price` al total acumulado.
    -   Solo recalcula cuando `cart` cambia.
    -   `cartTotal` contiene el total a pagar.

## Renderizado del `Header`
```js
return (
    <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div className="carrito">
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />
                        <div id="carrito" className="bg-white p-3">
                            {isEmpty ? (
                                <p className="text-center">El carrito está vacío</p>
                            ) : (
                                <>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((guitar) => (
                                                <tr key={guitar.id}>
                                                    <td>
                                                        <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                    </td>
                                                    <td>{guitar.name}</td>
                                                    <td className="fw-bold">{guitar.price}</td>
                                                    <td className="flex align-items-start gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => decreaseQuantity(guitar.id)}
                                                        > - </button>
                                                        {guitar.quantity}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => increaseQuantity(guitar.id)}
                                                        > + </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            onClick={() => removeFromCart(guitar.id)}
                                                        > X </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="text-end">Total a pagar: <span className="fw-bold">{cartTotal}</span></p>
                                </>
                            )}
                            <button
                                className="btn btn-dark w-100 mt-3 p-2"
                                onClick={clearCart}
                            >Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
);
```
-   **Estructura General**:
    -   Un `header` contiene el logo y el carrito.
    -   Dentro del carrito (`div.carrito`), mostramos una imagen del carrito y los detalles del contenido.
-   **Condicional `isEmpty`**:
    
    -   Si `isEmpty` es `true`, muestra el mensaje "El carrito está vacío".
    -   Si `isEmpty` es `false`, muestra una tabla con los artículos en el carrito.
-   **Tabla de Artículos del Carrito**:
    -   Muestra la imagen, nombre, precio y cantidad de cada guitarra en el carrito.
    -   Cada artículo tiene botones para aumentar (`increaseQuantity`) y disminuir (`decreaseQuantity`) la cantidad.
    -   Botón `X` para eliminar (`removeFromCart`) el artículo del carrito.
-   **Total del Carrito**:
    -   Muestra el total a pagar calculado por `cartTotal`.
-   **Botón para Vaciar el Carrito**:
    
    -   Botón que llama a `clearCart` para vaciar todos los artículos del carrito.

El componente `Header` maneja la visualización y manipulación del carrito de compras. Utiliza `useMemo` para optimizar el cálculo del estado derivado (`isEmpty` y `cartTotal`) basado en el contenido del carrito. El renderizado condicional y la interacción con las funciones pasadas como props permiten una gestión completa del carrito dentro del componente `Header`.