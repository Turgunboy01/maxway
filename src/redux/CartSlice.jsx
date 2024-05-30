// import { createSlice } from "@reduxjs/toolkit";
// const stroreInLocalStorage = (data) => {
//   localStorage.setItem("cart", JSON.stringify(data));
// };
// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     data: [],
//     totalItems: 0,
//     totalAmounts: 0,
//     deliveryChange: 10,
//   },
//   reducers: {
//     addToCart(state, action) {
//       const existingItem = state.data.find(
//         (item) => item.id == action.payload.id
//       );
//       if (existingItem) {
//         const tempCart = state.data.map((item) => {
//           if (item.id == action.payload.id) {
//             let newQty = item.quantity + action.payload.quantity;
//             let newTotalprice = newQty * item.price;
//             // console.log(newTotalprice, "sal");
//             return {
//               ...item,
//               quantity: newQty,
//               totalPrice: newTotalprice,
//             };
//           } else {
//             return item;
//           }
//         });
//         console.log(state.data);
//         state.data = tempCart;
//         stroreInLocalStorage(state.data);
//       } else {
//         state.data.push(action.payload);
//         stroreInLocalStorage(state.data);
//       }
//     },
//     removeItem: (state, action) => {
//       const tempCart = state.data.filter(
//         (item) => item.id !== action.payload.id
//       );
//       state.data = tempCart;
//       stroreInLocalStorage(state.data);
//     },
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const itemToUpdate = state.data.find((item) => item.id == id);
//       if (itemToUpdate) {
//         const validQuantity = Math.max(quantity || 1, 1);
//         itemToUpdate.quantity = validQuantity;
//         itemToUpdate.totalPrice = itemToUpdate.price * quantity;
//       }
//     },
//     getCartTotal(state) {
//       state.totalAmounts = state.data.reduce((cartTotal, cartItem) => {
//         return (cartTotal += +cartItem.totalPrice);
//       }, 0);
//       state.totalItems = state.data.length;
//     },
//   },
// });
// export const {
//   addToCart,
//   getCartTotal,
//   removeItem,
//   updateQuantity,
// } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    totalItems: 0,
    totalAmounts: 0,
    deliveryChange: 10,
  },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.data.find(
        (item) => item.id == action.payload.id
      );
      if (existingItem) {
        const tempCart = state.data.map((item) => {
          if (item.id == action.payload.id) {
            let newQty = item.quantity + action.payload.quantity;
            let newTotalprice = newQty * item.price;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newTotalprice,
            };
          } else {
            return item;
          }
        });
        state.data = tempCart;
        storeInLocalStorage(state.data);
      } else {
        state.data.push(action.payload);
        storeInLocalStorage(state.data);
      }
    },
    removeItem: (state, action) => {
      const tempCart = state.data.filter(
        (item) => item.id !== action.payload.id
      );
      state.data = tempCart;
      storeInLocalStorage(state.data);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.data.find((item) => item.id == id);
      if (itemToUpdate) {
        const validQuantity = Math.max(quantity, 0);
        console.log(validQuantity, "val");
        if (validQuantity < 1) {
          // Trigger removeItem if the quantity is less than 1
          state.data = state.data.filter((item) => item.id !== id);
        } else {
          itemToUpdate.quantity = validQuantity;
          itemToUpdate.totalPrice = itemToUpdate.price * validQuantity;
        }
        storeInLocalStorage(state.data);
      }
    },
    getCartTotal(state) {
      state.totalAmounts = state.data.reduce((cartTotal, cartItem) => {
        return (cartTotal += +cartItem.totalPrice);
      }, 0);
      state.totalItems = state.data.length;
    },
  },
});

export const {
  addToCart,
  getCartTotal,
  removeItem,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
