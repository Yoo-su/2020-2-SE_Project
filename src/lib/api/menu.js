import axios from "axios";

export const newMenu=(formData)=>
    axios.post("https://every-server.herokuapp.com/api/menu/addMenu",formData)

export const setMenuActivation=(menuName,type)=>
    axios.get("https://every-server.herokuapp.com/api/menu/menuActivate",
        { params: { menuName: menuName, activate: type } }
    )

export const bringActivatedMenu=()=>
    axios.get("https://every-server.herokuapp.com/api/menu/allActivatedMenu")

export const bringAllMenu=()=>
    axios.get("https://every-server.herokuapp.com/api/menu/allMenu")

export const addMenuStock=(menuName, newAmount, stockPrice)=>
    axios.get("https://every-server.herokuapp.com/api/menu/fillStock", {
        params: {
            menuName: menuName,
            amount: parseInt(newAmount),
            stockPrice: parseInt(stockPrice),
        },
    })

