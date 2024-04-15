import axios from "axios";
import { useState } from "react";
import "./Signup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Admin() {
    // State variables to manage form data and items data
    const [itemsData, setItemsData] = useState([]);
    const [itemId, setItemId] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemImage, setItemImage] = useState(""); // Store image as Base64 string
    const [itemCategory, setItemCategory] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");

    // Function to handle form submission and add new item
    function addItem() {
        // Prepare form data
        const formData = {
            itemId: itemId,
            itemName: itemName,
            itemPrice: itemPrice,
            itemDescription: itemDescription,
            itemCategory: itemCategory,
            itemQuantity: itemQuantity,
            itemImage: itemImage // Base64 encoded image data
        };
        console.log(formData);
        // Send POST request to save the new item
        axios.post('http://localhost:8181/api/admin/save', formData)
            .then((resData) => {
                console.log(resData.data);
                alert("New Item added successfully");
                getAllItems(); // Refresh item list
                clearFields();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error adding new item. Please try again.");
            });
    }

    // Function to fetch all items from the server
    function getAllItems() {
        let url = "http://localhost:8181/api/admin/findall";
        axios.get(url)
            .then(response => {
                setItemsData(response.data);
            })
            .catch(error => {
                console.error("Error fetching items:", error);
                alert("Error fetching items. Please try again.");
            });
    }

    // Function to handle item selection
    function selectItem(itemno) {
        let url ="http://localhost:8181/api/admin/findbyid/" + itemno;
        axios.get(url)
            .then(response => {
                let itemData = response.data;
                setItemId(itemData.itemId);
                setItemName(itemData.itemName);
                setItemPrice(itemData.itemPrice);
                setItemDescription(itemData.itemDescription);
                setItemImage(itemData.itemImage); // Set Base64 image data
                setItemCategory(itemData.itemCategory);
                setItemQuantity(itemData.itemQuantity);
            })
            .catch(error => {
                console.error("Error fetching item details:", error);
                alert("Error fetching item details. Please try again.");
            });
    }

    // Function to delete an item
    function deleteItem(itemno) {
        let url ="http://localhost:8181/api/admin/deletebyid/" + itemno;
        alert("Deleting the item " + itemno );
    
        axios.delete(url)
            .then(response => {
                alert("Item deleted successfully");
                getAllItems(); // Refresh item list
                clearFields();
            })
            .catch(error => {
                console.error("Error deleting item:", error);
                alert("Error deleting item. Please try again.");
            });
    }

    // Function to clear form fields
    function clearFields() {
        setItemId("");
        setItemName("");
        setItemPrice("");
        setItemDescription("");
        setItemImage(""); 
        setItemCategory("");
        setItemQuantity("");
    }

    // Map items data to table rows
    let resultsArray = itemsData.map((item, index) => (
        <tbody key={index}>
            <tr>
            <td>{item.itemId}</td>
            <td>{item.itemName}</td>
            <td>{item.itemPrice}</td> 
            <td>{item.itemCategory}</td> 
            <td>{item.itemQuantity}</td> 
            <td>{item.itemDescription}</td> 
            <td>{item.createdAt}</td> 
            <td>{item.createdBy}</td>  
            <td>
            {item.itemImage && (
                    <img src={item.itemImage} alt={`Avatar ${index}`} style={{ width: '100%' , height: '100%' }} />
                )}
            </td>
        
            <td colSpan="2"> 
            <a href="#" className="btn btn-primary me-4" onClick={() => deleteItem(item.itemId) }> <FontAwesomeIcon icon={faTrash}/>Delete </a>
            <br/><br/>
            <a href="#"className="btn btn-primary" onClick={() => selectItem(item.itemId)}> <FontAwesomeIcon icon={faCheckCircle} />Select </a>
            </td>
        </tr>
    </tbody>
    ));
 

    return (<>        
        <div className="section-1">
            <div className="admin_item_add">
                <div className="items">
                    <input type="text" className="form-control" style={{ width: '300px' }} placeholder="Enter Item ID" value={itemId} onChange={(e) => setItemId(e.target.value)} />
                </div>
                <div className="items">
                    <input type="text" className="form-control" style={{ width: '300px' }} placeholder="Enter Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                </div>
                <div className="items">
                    <input type="text" className="form-control" style={{ width: '300px' }} placeholder="Enter Item Price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />
                </div>
                <div className="items">
                    <input type="text" className="form-control" style={{ width: '300px' }} placeholder="Enter Item Description" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required />
                </div>
                <div className="items">
                    <select className="form-control" style={{ width: '300px' }} value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} required>
                        <option value="">Select Item Category</option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                    </select>
                </div>

                <div className="items">
                    <input type="text" className="form-control" style={{ width: '300px' }} placeholder="Enter Item Quantity" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} required />
                </div>
                <div className="items">
                <input type="file" className="form-control" id="itemImage" style={{ width: '300px' }} accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                        setItemImage(reader.result);
                        };
                        reader.readAsDataURL(file);
                     }
                }} required />
                </div>
            </div>
        
            <input type="button" value="Add Item" onClick={addItem} />
            <br />
            <br />
            <input type="button" value="Get Data" onClick={getAllItems} />

        
        <div className="Admin_table">
        <table border="2">
            <thead>
                <tr>
                    <th>itemId</th>
                    <th>itemName</th> 
                    <th>itemPrice</th>  
                    <th>itemCategory</th> 
                    <th>itemQuantity</th> 
                    <th>itemDescription</th> 
                    <th>createdAt</th> 
                    <th>createdBy</th> 
                    <th>itemImage</th> 
                    <th>actions</th>
                </tr>
            </thead>
                {resultsArray}       
        </table>
        </div>
    </div>
</>
);
}

export default Admin
