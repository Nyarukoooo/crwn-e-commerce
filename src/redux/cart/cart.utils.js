//utility functions allow to keep files clean and 
//organize functions that may needed in multiple files in one location

//add multiple items and count item quantity
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
        );

    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
            )
    } else {
        return [...cartItems, {...cartItemToAdd, quantity: 1}]; 
        //quantity property gets attached the first time around 
        //since this if block won'r run when it's a new item
    }
};