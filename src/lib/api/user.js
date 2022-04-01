import axios from "axios";

export const addNewWorker=(newEmail, newNickname,newPassword,newWage,newRole)=>
    axios.post("https://every-server.herokuapp.com/api/user/newEmp", {
        userEmail: newEmail,
        nickName: newNickname,
        password: newPassword,
        wage: newWage,
        role: newRole.checked ? 2 : 1,
    })

export const removeEmployee=(userEmail)=>
    axios.get("https://every-server.herokuapp.com/api/user/removeEmp", {
        params: { userEmail: userEmail },
    })

export const userLogout=(curUser)=>
    axios.get("https://every-server.herokuapp.com/api/user/logout", {
        params: { nickName: curUser },
     })

export const allEmployees=()=>
    axios.get("https://every-server.herokuapp.com/api/user/allEmp")

export const employeeDetail=(emp)=>
    axios.get("https://every-server.herokuapp.com/api/user/empDetail", {
        params: { email: emp.email, wage: emp.wage },
    })

export const workHistory=(emp)=>
    axios.get("https://every-server.herokuapp.com/api/user/workHistory", {
        params: { userEmail: emp.email },
    })

export const updateSalary = (newSalary, emp) =>
  axios.get("https://every-server.herokuapp.com/api/user/updateSalary", {
    params: {
      newSalary: newSalary,
      userEmail: emp.email,
    },
  });

  export const paySalary = (emp, payPrice) =>
    axios.get("https://every-server.herokuapp.com/api/user/payForWage", {
      params: { userEmail: emp.email, payPrice: payPrice },
    });