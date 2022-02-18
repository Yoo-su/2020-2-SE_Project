import axios from "axios";

export const newMenu=(formData)=>
    axios.post("https://every-server.herokuapp.com/api/addMenu",formData)

export const setMenuActivation=(menuName,type)=>
    axios.get("https://every-server.herokuapp.com/api/menuActivate",
        { params: { menuName: menuName, activate: type } }
    )

export const bringActivatedMenu=()=>
    axios.get("https://every-server.herokuapp.com/api/menu")

export const bringAllMenu=()=>
    axios.get("https://every-server.herokuapp.com/api/allMenu")

export const addMenuStock=(menuName, newAmount, stockPrice)=>
    axios.get("https://every-server.herokuapp.com/api/fillStock", {
        params: {
            menuName: menuName,
            amount: parseInt(newAmount),
            stockPrice: parseInt(stockPrice),
        },
    })

