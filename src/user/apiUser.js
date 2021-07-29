import { API } from "../config"

export const getUser = (userId,token) => {
    return fetch(`${API}/user/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getUsersList = (userId,token) => {
    return fetch(`${API}/users/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getTransactions = (userId,token) => {
    return fetch(`${API}/accounts/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const createTransaction = (userId, token, data) => {
    console.log(userId,data)
    return fetch(`${API}/transaction/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return (response.json())
        })
        .catch(err => {
            console.log(err)
        })
}

export const getTransactionById = (userId,id,token) => {
    return fetch(`${API}/transaction/${userId}/${id}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
