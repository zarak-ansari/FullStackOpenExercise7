import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name:'blogs',
  initialState:[],
  reducers:{
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    setBlogs: (state, action) => {
      return [].concat(action.payload)
    },
    removeBlog: (state, action) => {
      return state.filter(blog => blog.id !== action.payload)
    },
    incrementLikesOfBlog: (state, action) => {
      const blog = state.find(blog => blog.id === action.payload)
      if(blog){
        blog.likes = blog.likes + 1
      }
    }
  }
})

export const { appendBlog, setBlogs, removeBlog, incrementLikesOfBlog } = blogSlice.actions

export default blogSlice.reducer