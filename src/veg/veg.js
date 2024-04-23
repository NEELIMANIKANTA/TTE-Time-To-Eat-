import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import './veg.css';

// function Veg() {
//     const [itemCounts, setItemCounts] = useState([]);
//     const [itemsData, setItemsData] = useState([]);

//     useEffect(() => {
//         getAllItems();
//     }, []); // Empty dependency array to run effect only once

//     const getAllItems = () => {
//         let url = "http://localhost:8181/api/user/getitembycategory/veg";
//         axios.get(url)
//             .then(response => {
//                 const initialCounts = new Array(response.data.length).fill(0);
//                 setItemsData(response.data);
//                 setItemCounts(initialCounts);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }

//     const addToCart = (itemId) => {
//         const newCounts = [...itemCounts];
//         newCounts[itemId] = (newCounts[itemId] || 0) + 1;
//         setItemCounts(newCounts);
//         updateCart(itemId, newCounts[itemId], 'POST');
//     }

//     const removeFromCart = (itemId) => {
//         const newCounts = [...itemCounts];
//         const newCount = Math.max(newCounts[itemId] - 1, 0);
//         newCounts[itemId] = newCount;
//         setItemCounts(newCounts);

//         // Check if the count is 0 before making the delete call
//         if (newCount === 0) {
//             deleteItemFromCart(itemId);
//         } else {
//             updateCart(itemId, newCounts[itemId], 'PUT');
//         }
//     }

//     const updateToCart = (itemId) => {
//         const newCounts = [...itemCounts];
//         newCounts[itemId] = (newCounts[itemId] || 0) + 1;
//         setItemCounts(newCounts);
//         updateCart(itemId, newCounts[itemId], 'PUT');
//     }

//     const updateCart = (itemId, count, method) => {
//         const item = itemsData[itemId];
//         const cartItems = {
//             itemId: item.itemId,
//             itemCount: count,
//             itemName: item.itemName,
//             itemPrice: item.itemPrice,
//             itemDescription: item.itemDescription,
//             itemImage: item.itemImage,
//             itemCategory: item.itemCategory,
//             itemqty: item.itemPrice * count,
//             userName: sessionStorage.getItem("username")
//         };
    
//         let url;
//         if (method === 'PUT') {
//             url = `http://localhost:8181/api/updatecart/${item.itemId}`;
//         } else if (method === 'POST') {
//             url = 'http://localhost:8181/api/addtocart';
//         } else {
//             console.error('Unsupported method:', method);
//             return;
//         }
    
//         axios({
//             method: method,
//             url: url,
//             data: cartItems
//         })
//         .then(response => {
//             console.log(`Cart updated successfully: Item ID - ${item.itemId}, Count - ${count}, Action - ${method}`);
//         })
//         .catch(error => {
//             console.error('Error updating cart:', error);
//         });
    
//         console.log("Final object going to cart:", cartItems);
//         console.log("Method:", method);
//     }

//     const deleteItemFromCart = (itemId) => {
//         const item = itemsData.itemId;
//         const username = sessionStorage.getItem("username");
//         axios.delete(`http://localhost:8181/api/removefromcart/${itemId}?username=${username}`)
//             .then(response => {
//                 console.log(`Item ${item.itemId} removed from cart successfully.`);
//             })
//             .catch(error => {
//                 console.error('Error removing item from cart:', error);
//             });
//         console.log("Deleted item ID:", item, username);
//     } 
    
    


//         const stars = [];
//         for (let i = 0; i < 5; i++) {
//             if (i < 4) {
//                 stars.push(<FontAwesomeIcon icon={faStar} key={i} style={{ color: 'gold' }} />);
//             } else {
//                 stars.push(<FontAwesomeIcon icon={faStar} key={i} style={{ color: 'grey' }} />);
//             }
//         }
 

//     return (
//         <div className='sectionveg'>
//             <h1>Veg</h1>
//             <div className="food-display-list">
//                 {itemsData.map((item, index) => (
//                     <div key={index} className="food-item">
//                         <div className="food-item-img-container">
//                             <img src={item.itemImage} className="food-item-image" alt={`Avatar ${index}`} style={{ width: '100%', height: '100%' }} />
//                         </div>
//                         <div className="food-item-info">
//                             <div className="food-item-rating">
//                                 <p> {item.itemName} </p>
//                                 <h6>{(stars)}</h6>
//                             </div>
//                             <div className="food-item-description">
//                                 {item.itemDescription}
//                             </div>
//                             <div className="food-item-price">
//                                 ₹ {item.itemPrice}
//                             </div>
//                             <div className="food-item-counter">
//                                 {!itemCounts[index] ? (
//                                     <button className='add btn btn-primary d-block mx-auto' style={{ background: 'tomato' }} onClick={() => addToCart(index)}>Add to cart</button>
//                                 ) : (
//                                     <div className='add btn btn-primary' style={{ background: 'tomato' }}>
//                                         <button className='btn btn-danger rounded-circle' onClick={() => removeFromCart(index)}><FontAwesomeIcon icon={faMinus} style={{ color: 'white' }} /></button>
//                                         <p className='qty-num'> {itemCounts[index]} </p>
//                                         <button className='btn btn-success rounded-circle' onClick={() => updateToCart(index)}><FontAwesomeIcon icon={faPlus} style={{ color: 'white' }} /></button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Veg;

import { useDispatch, useSelector } from "react-redux";

function Veg() {  
     
    const state = useSelector((state) => state);
    console.log(state);

    const dispatch = useDispatch();

    const [itemsData, setItemsData] = useState([]);

    useEffect(() => {
        getAllItems();
    }, []);

    const getAllItems = () => {
        let url = "http://localhost:8181/api/user/getitembycategory/veg";
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

    const calculateDiscountedPrice = (price, discountPercentage) => {
        const discountAmount = (price * discountPercentage) / 100;
        return price - discountAmount;
    };

    return (
        <div className='sectionveg'>
            <h1>Veg</h1>
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

export default Veg;