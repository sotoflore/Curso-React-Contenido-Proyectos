import type { MenuItem } from "../types";

type MenuItemProps = {
    item: MenuItem
    addItem: (item: MenuItem) => void
}

const MenuItem = ({item, addItem}: MenuItemProps) => {
    return (
        <button
            onClick={() => addItem(item)}
            className="border border-teal-300 hover:bg-teal-200 w-full p-3 flex justify-between rounded"
        >
            <p>{item.name}</p>
            <p className="font-black">${item.price}</p>
        </button>
    )
}
export default MenuItem;