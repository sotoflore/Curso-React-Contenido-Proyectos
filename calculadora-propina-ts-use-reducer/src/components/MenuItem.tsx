import { Dispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";
import type { MenuItem } from "../types";

type MenuItemProps = {
    item: MenuItem
    dispatch: Dispatch<OrderActions>
}

const MenuItem = ({item, dispatch}: MenuItemProps) => {
    return (
        <button
            onClick={() => dispatch({type: 'add-item', payload:{item}})}
            className="border border-teal-300 hover:bg-teal-200 w-full p-3 flex justify-between rounded"
        >
            <p>{item.name}</p>
            <p className="font-black">${item.price}</p>
        </button>
    )
}
export default MenuItem;