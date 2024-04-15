import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import { Button, Form, InputGroup } from 'react-bootstrap'; // Import Bootstrap components

import './cart.css'; // Import the CSS file for cart styling

function Cart() {
    // Get cart items from the Redux store
    const cartItems = useSelector(state => state);
    const dispatch = useDispatch();

    // Dispatch action to replace cart items when cartItems state changes
    useEffect(() => {
        dispatch({ type: "replacecart", payload: cartItems });
    }, [dispatch, cartItems]);

    // Function to increment item count
    const increment = (item) => {
        dispatch({ type: "increment", payload: item });
    };

    // Function to decrement item count
    const decrement = (item) => {
        dispatch({ type: "decrement", payload: item });
    };

    return (
        <div className='cart-container'>
            <h1 className="cart-title">Your Cart</h1>
            <div className="cart-items">
                {!cartItems.length ? (
                    <p className="empty-cart-message">No items in the cart</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.itemImage} alt={`Avatar ${index}`} />
                            </div>
                            <div className="cart-item-details">
                                <p className="cart-item-name">{item.itemName}</p>
                                <p className="cart-item-price">₹ {item.itemPrice}</p>
                                <div className="cart-item-counter">
                                    <button className='cart-btn' onClick={() => decrement(item)}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <p className='qty-num'> {item.count} </p>
                                    <button className='cart-btn' onClick={() => increment(item)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="cart-total">
                <p>Total: ₹ {cartItems.reduce((total, item) => total + (item.itemPrice * item.count), 0)}</p>
            </div>

            <div className="coupon-section">
                <Form.Group className="mb-3" controlId="couponCode">
                    <Form.Label>Apply Coupon</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" placeholder="Enter coupon code" />
                        <Button variant="primary">Apply</Button>
                    </InputGroup>
                </Form.Group>
            </div>

            <Button variant="success" className="checkout-btn">Checkout</Button>
        </div>
    );
}

export default Cart;
