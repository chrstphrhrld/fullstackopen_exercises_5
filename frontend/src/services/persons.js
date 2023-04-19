import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => {
            return response.data
        })
        .catch(() => {
            console.log("Error while retrieving numbers")
        })
}

const update = (personToUpdate) => {
    return axios.put(`${baseUrl}/${personToUpdate.id}`, personToUpdate)
        .then(response => {
            return response.data
        })
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson).then(response => {
        return response.data
    })
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
        .then(response => response.data)
        .catch(() => {
            console.log("Error while removing a person")
        })
}

export default {getAll, create, update, deletePerson}