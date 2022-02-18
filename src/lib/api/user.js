import axios from "axios";

export const addNewWorker=(newEmail, newNickname,newPassword,newWage,newRole)=>
    axios.post("https://every-server.herokuapp.com/api/newWorker", {
        userEmail: newEmail,
        nickName: newNickname,
        password: newPassword,
        wage: newWage,
        role: newRole.checked ? 2 : 1,
    })

export const removeEmployee=(userEmail)=>
    axios.get("https://every-server.herokuapp.com/api/removeWorker", {
        params: { userEmail: userEmail },
    })

export const userLogout=(curUser)=>
    axios.get("https://every-server.herokuapp.com/api/logout", {
        params: { nickName: curUser },
     })

export const allEmployees=()=>
    axios.get("https://every-server.herokuapp.com/api/allWorkers")

export const employeeDetail=(emp)=>
    axios.get("https://every-server.herokuapp.com/api/empDetail", {
        params: { email: emp.email, wage: emp.wage },
    })

export const workHistory=(emp)=>
    axios.get("https://every-server.herokuapp.com/api/workHistory", {
        params: { userEmail: emp.email },
    })

export const updateSalary = (newSalary, emp) =>
  axios.get("https://every-server.herokuapp.com/api/updateSalary", {
    params: {
      newSalary: newSalary,
      userEmail: emp.email,
    },
  });

  export const paySalary = (emp, payPrice) =>
    axios.get("https://every-server.herokuapp.com/api/payForWage", {
      params: { userEmail: emp.email, payPrice: payPrice },
    });