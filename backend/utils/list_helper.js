const _ = require('lodash')
const blogs = require('../tests/blogs_helper')
const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	let totalLikes = 0
	blogs.forEach(b => {
		totalLikes += b.likes
	})

	return totalLikes
}

const favoriteBlog = (blogs) => {
	let favoriteBlog = null
	blogs.forEach(b => {
		if (!favoriteBlog)
			favoriteBlog = b
		favoriteBlog = b.likes > favoriteBlog.likes ? b : favoriteBlog
	})

	return {
		title: favoriteBlog.title,
		author: favoriteBlog.author,
		likes: favoriteBlog.likes
	}
}

const mostBlogs = (blogs) => {
	let authorWithMostBlogs = {}
	let mostBlogEntries = 0

	_.valuesIn(_.countBy(blogs, 'author')).forEach((b, index) => {
		if (b > mostBlogEntries) {
			mostBlogEntries = b
			authorWithMostBlogs = {
				author: _.keysIn(_.countBy(blogs, 'author'))[index],
				blogs: b
			}
		}
	})
	return authorWithMostBlogs
}

const mostLikes = (blogs) => {
	let arr = []
	let mostLikes = 0
	let indexArr = 0

	_.keysIn(_.groupBy(blogs, 'author')).forEach(b => {
		arr = arr.concat({
			author: b,
			likes: 0,
		})
	})

	_.forEach(blogs, f => {
		arr.forEach(a => {
			if (a.author === f.author)
				a.likes += f.likes
		})
	})

	arr.forEach((a, index) => {
		if (_.gte(a.likes, mostLikes)) {
			mostLikes = a.likes
			indexArr = index
		}
		return indexArr

	})
	return arr[indexArr]
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}