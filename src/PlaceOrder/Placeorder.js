import { useParams } from 'react-router-dom';
import './placeorder.css';

function Placeorder() {
    const { totalPrice } = useParams();

    // Convert to numbers if needed
    const totalPriceValue = parseFloat(totalPrice);
    const deliveryFeeValue = totalPriceValue < 200 ? 5 : 0; 

    // Check if totalPrice is valid
    if (isNaN(totalPriceValue)) {
        return <div>Error: Invalid total price</div>;
    }

    return (
        <form className="place-order">
            <div className="place-order-left">
                <p className="tittle">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder="First Name"/>
                    <input type="text" placeholder="Last Name"/>
                </div>
                <input type="email" placeholder="Email address"/>
                <input type="text" placeholder="Street"/>
                <div className="multi-fields">
                    <input type="text" placeholder="City"/>
                    <input type="text" placeholder="State"/>
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder="Zip Code"/>
                    <input type="text" placeholder="Country"/>
                </div>
                <input type="text" placeholder="Phone" />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>₹ {totalPriceValue.toFixed(2)}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{deliveryFeeValue === 0  ? "Free" : `₹ ${deliveryFeeValue.toFixed(2)}`}</p>
                        </div>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <p>₹ {(totalPriceValue + deliveryFeeValue).toFixed(2)}</p>
                        </div>
                    </div>
                    <button>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
}

export default Placeorder;
