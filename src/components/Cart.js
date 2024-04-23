import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './cart.css'; // Import the CSS file for cart styling
import { Link } from "react-router-dom";

function Cart() {
    // Get cart items from the Redux store
    const cartItems = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const username = sessionStorage.getItem("username");

    useEffect(() => {
        if (!username) {
            navigate('/signin');
        }
    }, [navigate, username]);
    // useEffect(() => {
    //     // console.log(cartItems);
    //     dispatch({ type: "replacecart", payload: cartItems });
    // }, []);

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

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + (item.itemPrice * item.count), 0);
  
    // Set delivery fee
    let deliveryFee = cartItems.length === 0 ? 0 : (totalPrice < 200 ? 5 : 0);


    
    return (
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
                            <p><img src={item.itemImage} alt={item.title} /></p> {/* Corrected image tag */}
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
                            <b>Total</b>
                            <p>₹ {totalPrice + deliveryFee}</p>
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
                            <input type="text" placeholder="promo code"/>
                            <button>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Cart;
