import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './cart.css'; // Import the CSS file for cart styling
import { Link } from "react-router-dom";

function Cart() {
    // Get cart items from the Redux store
    const cartItems = useSelector(state => state);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const username = sessionStorage.getItem("username");
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        if (!username) {
            navigate('/signin');
        }
    }, [navigate, username]);

    useEffect(() => {
        dispatch({ type: "replacecart", payload: cartItems });
    }, [dispatch, cartItems]);

    const increment = (item) => {
        dispatch({ type: "increment", payload: item });
        setDiscount(0);
        setPromoCode("");
    };

    const decrement = (item) => {
        dispatch({ type: "decrement", payload: item });
        setDiscount(0);
        setPromoCode("");
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.itemPrice * item.count) , 0);
  
    let deliveryFee = cartItems.length === 0 ? 0 : (totalPrice < 200 ? 5 : 0);

    const applyPromoCode = () => {
        if (totalPrice > 249) {
            if (promoCode === "RATAN10" || promoCode === "MANI10" || promoCode === "DEB10") {
                const discountAmount = totalPrice * 0.1;
                setDiscount(discountAmount);
            } else {
                setDiscount(0);
                // Display message for invalid promo code
                alert("Invalid promo code");
            }
        } else {
            // Display message to encourage adding more itemS
            alert("Add more items to avail the offer");
        }
    };

    const cgst = totalPrice * 0.05;
    const sgst = totalPrice * 0.05; 

    return (
        !username ? (
            navigate('/signin'),
            null
        ) : (
            <div className="cart">
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Items</p>
                        <p>Image</p>
                        <p>Name</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                    </div>
                    <hr/>

                    {!cartItems.length ? (
                        <p className="empty-cart-message text-center">No items in the cart</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index}>
                                <div className="cart-items-title cart-items-item">
                                    <p>{index + 1}</p> {/* Index starts from 0, so add 1 */}
                                    <p><img src={item.itemImage} alt={item.title} /></p>
                                    <p>{item.itemName}</p>
                                    <p>{item.itemPrice}</p>
                                    <p>
                                        <button className='btn btn-danger rounded-circle' onClick={() => decrement(item)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        &nbsp;&nbsp;{item.count}&nbsp;&nbsp;
                                        <button className='btn btn-success rounded-circle' onClick={() => increment(item)}>                                         
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </p>
                                    <p>{item.itemPrice * item.count}</p>
                                </div>
                                <hr/>
                            </div>
                        ))
                    )}

                </div>
                <div className="cart-bottom">
                    <div className="cart-total">
                        <h2>Cart Total</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>₹ {totalPrice}</p>
                            </div>
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>{deliveryFee === 0 ? "Free" : `₹ ${deliveryFee}`}</p>
                            </div>
                            <div className="cart-total-details">
                                <p>CGST (5%)</p>
                                <p>₹ {cgst.toFixed(2)}</p>
                            </div>
                            <div className="cart-total-details">
                                <p>SGST (5%)</p>
                                <p>₹ {sgst.toFixed(2)}</p>
                            </div>
                            <div className="cart-total-details">
                                <p>Discount</p>
                                <p>₹ {discount}</p>
                            </div>
                            <div className="cart-total-details">
                                <b>Total</b>
                                <p>₹ {totalPrice + deliveryFee + cgst + sgst - discount}</p>
                            </div>
                        </div>
                        <button>
                            <Link className="custom-link" to={`/placeorder/${totalPrice}`}>PROCEED TO CHECKOUT</Link>
                        </button>
                    </div>
                    <div className="cart-promocode">
                        <div>
                            <p>If you have a Promo Code, Enter it here</p>
                            <div className="cart-promocode-input">
                                <input
                                    type="text"
                                    placeholder="promo code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button onClick={applyPromoCode}>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default Cart;
