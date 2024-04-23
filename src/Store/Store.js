
import {createStore} from "redux";

function storeReducer(state = [], action) {
    switch (action.type) {
        case "addtocart":
            const existingItemIndex = state.findIndex(item => item.itemId === action.payload.itemId);
            if (existingItemIndex !== -1) {
                const newState = state.map((item, index) => {
                    if (index === existingItemIndex) {
                        return { ...item, count: item.count + 1 };
                    }
                    return item;
                });
                return newState;
            } else {
                const newItem = {
                    itemId: action.payload.itemId,
                    count: 1,
                    itemPrice: action.payload.itemPrice,
                    itemName: action.payload.itemName,
                    itemImage: action.payload.itemImage
                };
                return [...state, newItem];
            }

        case "increment":
            const incrementedState = state.map(item => {
                if (item.itemId === action.payload.itemId) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
            return incrementedState;

        case "decrement":
            const decrementedState = state.map(item => {
                if (item.itemId === action.payload.itemId) {
                    return { ...item, count: Math.max(item.count - 1, 0) };
                }
                return item;
            }).filter(item => item.count > 0);
            return decrementedState;

        default:
            return state;
    }
}

const store = createStore(storeReducer);



export default store;