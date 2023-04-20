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

const update = async newBlogEntry => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newBlogEntry, config)
	return response.data
}

export default { getAll, create, setToken }