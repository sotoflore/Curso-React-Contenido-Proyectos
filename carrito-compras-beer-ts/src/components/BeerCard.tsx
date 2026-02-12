import {ShoppingCartIcon } from '@heroicons/react/24/outline';
import { BeerType } from '../types';

type BeerCardProps = {
    beer: BeerType;
    addToCart: (item: BeerType) => void
}

const BeerCard = ({ beer, addToCart }: BeerCardProps) => {
    
    const { name, image, description, price } = beer;

    return (
        <div className="bg-white shadow px-5 flex flex-col items-center justify-between rounded-lg">
            <div className='pt-3'>
                <img className="w-40 h-40 object-contain" src={`/img/${image}.png`} alt="imagen de cerveza" />
            </div>
            <div>
                <h3 className="text-2xl font-black text-gray-800">Cerveza {name}</h3>
                <p>{description}</p>
                <div className='flex justify-between items-center py-3'>
                    <p className="text-xl font-bold">${price}</p>
                    <button
                        type="button"
                        className="text-xs bg-gray-900 text-white px-3 py-1 rounded"
                        onClick={() => addToCart(beer)}
                    ><ShoppingCartIcon className='w-6'/></button>
                </div>
            </div>
        </div>
    )
}
export default BeerCard;