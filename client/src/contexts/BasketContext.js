import { createContext, useContext, useEffect, useState } from "react";

const BasketContex = createContext()

const defaultBasket = JSON.parse(localStorage.getItem('basket')) || []

const BasketProvider = ({ children }) => {
    const [items, setItems] = useState(defaultBasket)

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(items))
    }, [items]);

    const addToBasket = (data, findBasketItem) => {
        if (!findBasketItem) {
            setItems((prev) => [data, ...prev])
        } else {
            const filtered = items.filter((item) => item._id !== findBasketItem._id)
            setItems(filtered)
        }
    }

    const removeFromBasket = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id)
        setItems(filtered)
    }

    const emptyBasket = () => {
        setItems([])
    }

    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket
    }

    return <BasketContex.Provider value={values}>{ children }</BasketContex.Provider>
}

const useBasket = () => useContext(BasketContex)

export { BasketProvider, useBasket }