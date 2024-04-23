import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";

import "./veg.css";

function Fooditems () {

    const state = useSelector((state) => state);
    console.log(state);

    const dispatch = useDispatch();

    const [itemsData, setItemsData] = useState([]);

    useEffect(() => {
        getAllItems();
    }, []);

    const getAllItems = () => {
        let url = "http://localhost:8181/api/user/getAllItems";
        axios.get(url)
            .then(response => {
                setItemsData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function addtocart(data) {
        dispatch({type:"addtocart", payload:data});
    }

    function increment(data) {
        dispatch({type:"increment", payload:data});
    }

    function decrement(data) {
        dispatch({type:"decrement", payload:data});
    }

    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < 4) {
            stars.push(<FontAwesomeIcon icon={faStar} key={i} style={{ color: 'gold' }} />);
        } else {
            stars.push(<FontAwesomeIcon icon={faStar} key={i} style={{ color: 'grey' }} />);
        }
    }

    // Function to calculate discounted price
    const calculateDiscountedPrice = (price, discountPercentage) => {
        const discountAmount = (price * discountPercentage) / 100;
        return price - discountAmount;
    };

    return (
        <div className='sectionveg1'>
            <h1>Top Food Items Near you </h1>
            <div className="food-display-list">
                {itemsData.map((item, index) => (
                    <div key={index} className="food-item">
                        <div className="food-item-img-container">
                            <img src={item.itemImage} className="food-item-image" alt={`Avatar ${index}`} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="food-item-info">
                            <div className="food-item-rating">
                                <p> {item.itemName} </p>
                                <h6>{(stars)}</h6>
                            </div>
                            <div className="food-item-description">
                                {item.itemDescription}
                            </div>
                            <div className="food-item-price">
                                {/* Display original and discounted prices */}
                                <span className="discounted-price">₹ {calculateDiscountedPrice(item.itemPrice, 10).toFixed(2)}</span> 
                                <span className="discount"> (10%off)</span>
                                <span className="original-price">(₹{item.itemPrice})</span>

                            </div>
                            <div className="food-item-counter">
                                {state.find(cartItem => cartItem.itemId === item.itemId) ? (
                                    <div className='add btn btn-primary' style={{ background: 'tomato' }}>
                                        <button className='btn btn-danger rounded-circle' onClick={()=>decrement(item)}><FontAwesomeIcon icon={faMinus} style={{ color: 'white' }} /></button>
                                        <p className='qty-num'> {state.find(cartItem => cartItem.itemId === item.itemId)?.count || 0} </p>
                                        <button className='btn btn-success rounded-circle' onClick={()=>increment(item)}><FontAwesomeIcon icon={faPlus} style={{ color: 'white' }} /></button>
                                    </div>
                                ) : (
                                    <button className='add btn btn-primary d-block mx-auto' onClick={() => addtocart(item)} style={{ background: 'tomato' }}>Add to cart</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fooditems;
