import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `Bearer ${ newToken }`
}

const getAll = async () => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.get(baseUrl, config)
	return response.data
}

const create = async newBlogEntry => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newBlogEntry, config)
	return response.data
}

const update = async (id, updatedBlogEntry) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.put(`${ baseUrl }/${ id }`, updatedBlogEntry, config)
	return response.data
}

const deleteById = async (id) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.delete(`${ baseUrl }/${ id }`, config)
	return response.data
}

export default { getAll, create, update, deleteById, setToken }