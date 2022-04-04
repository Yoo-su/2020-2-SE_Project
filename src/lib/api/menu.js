import apiClient from "./client";

export const newMenu=(formData)=>
    apiClient.post("/menu/addMenu",formData)

export const setMenuActivation=(menuName,type)=>
    apiClient.get("/menu/menuActivate",
        { params: { menuName: menuName, activate: type } }
    )

export const bringActivatedMenu=()=>
    apiClient.get("/menu/allActivatedMenu")

export const bringAllMenu=()=>
    apiClient.get("/menu/allMenu")

export const addMenuStock=(menuName, newAmount, stockPrice)=>
    apiClient.get("/menu/fillStock", {
        params: {
            menuName: menuName,
            amount: parseInt(newAmount),
            stockPrice: parseInt(stockPrice),
        },
    })

