import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)
import axios from "axios"

const StoreContextProvider = (props) => {
    
    const [cartItems,setcartItems] = useState({});

    const url  = "https://mernstack-bi5v.onrender.com"
    const [token,setToken] = useState("")

    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId) => {
        /*for existing entry*/
        if (!cartItems[itemId]) {
            setcartItems((prev) => ({...prev,[itemId]:1 }));
        } 
        /*for new entry*/
        else {
            setcartItems((prev) => ({...prev,[itemId]:prev[itemId]+1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", {itemId},{headers:{token}})
        }
    };
    


    const removeFromCart = async (itemId) => {
        setcartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
        if (token) {
            await axios.post(url + "/api/cart/remove", {itemId}, {headers:{token}})
        }
    }
    

    {/*cart total logic*/}

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) 
            {
                if(cartItems[item] > 0)
                {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
                }
            }
            return totalAmount;
    }


    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get",{}, {headers:{token}});
        setcartItems(response.data.cartData)
    }

    useEffect(()=>{  
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])


    const contextValue = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;