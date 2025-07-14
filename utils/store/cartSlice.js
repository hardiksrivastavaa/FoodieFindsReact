// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         items: [],
//     },
//     reducers: {
//         addItem: (state, action) => {
//             const newItem = action.payload;
//             const existingItem = state.items.find(item => item.id === newItem.id);

//             if (existingItem) {
//                 existingItem.quantity += newItem.quantity;
//             } else {
//                 state.items.push(newItem);
//             }

//             state.totalAmount += newItem.price * newItem.quantity;
//             state.totalItems += newItem.quantity;
//         }
// })