import apiClient from "./client";

export const createMenu = (formData) =>
  apiClient.post("/menu/addMenu", formData);

export const setMenuActivation = (menuName, type) =>
  apiClient.put("/menu/menuActivate", {
    params: { menuName: menuName, activate: type },
  });

export const getActivatedMenus = () => apiClient.get("/menu/allActivatedMenu");

export const getAllMenus = () => apiClient.get("/menu/allMenu");

export const updateMenuStock = (menuName, newAmount, stockPrice) =>
  apiClient.get("/menu/fillStock", {
    params: {
      menuName: menuName,
      amount: parseInt(newAmount),
      stockPrice: parseInt(stockPrice),
    },
  });
