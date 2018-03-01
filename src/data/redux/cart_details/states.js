
const initialStates = {
    cart_details: {
        cart_items: [],
        cart_item_ids: [],
        total_amount: 0,
        shipping_address: {
            address: "",
            pincode: "",
            city: "",
            state: "",
            country: "India",
            email: "",
            phone: "",
        },
        order_id: undefined,
        payment_status: undefined,
        order_details: {},
        loaders: {
            order_adding: false,
            order_added: false,
            order_add_err: false
        }
    },
};

export default initialStates;
