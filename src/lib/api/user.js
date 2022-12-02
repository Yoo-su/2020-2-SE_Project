import apiClient from "./client";

export const createEmployee = (
  newEmail,
  newNickname,
  newPassword,
  newWage,
  newRole
) =>
  apiClient.post("/user/newEmp", {
    userEmail: newEmail,
    nickName: newNickname,
    password: newPassword,
    wage: newWage,
    role: newRole.checked ? 2 : 1,
  });

export const deleteEmployee = (userEmail) =>
  apiClient.get("/user/removeEmp", {
    params: { userEmail: userEmail },
  });

export const logout = (curUser) =>
  apiClient.get("/user/logout", {
    params: { nickName: curUser },
  });

export const getAllEmployees = () => apiClient.get("/user/allEmp");

export const getEmployeeDetail = (emp) =>
  apiClient.get("/user/empDetail", {
    params: { email: emp.email, wage: emp.wage },
  });

export const getWorkHistory = (emp) =>
  apiClient.get("/user/workHistory", {
    params: { userEmail: emp.email },
  });

export const updateSalary = (newSalary, emp) =>
  apiClient.get("/user/updateSalary", {
    params: {
      newSalary: newSalary,
      userEmail: emp.email,
    },
  });

export const paySalary = (emp, payPrice) =>
  apiClient.get("/user/payForWage", {
    params: { userEmail: emp.email, payPrice: payPrice },
  });
