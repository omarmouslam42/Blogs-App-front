
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import IndexPage from './page/IndexPage'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'
import PostPage from './page/PostPage'
import CreatePostPage from './page/CreatePostPage'

function App() {
  const router = createBrowserRouter([
    {path:"/" ,  element: <Layout /> , children:[
      {path:"/" , element:  <IndexPage/> },
      {path:"login", element: <LoginPage />},
      {path:"register", element: <RegisterPage />} ,
      {path:"createPost", element: <CreatePostPage />} ,
      {path:"post/:id", element: <PostPage />} 
    ]},
    ])
  return (
      <RouterProvider router={router}/>
    
  )
}

export default App
