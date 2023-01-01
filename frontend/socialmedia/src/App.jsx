import { useState } from 'react'
import reactLogo from './assets/react.svg'
import CreatePost from './Components/CreatePost'
import Login from './Components/Login'
import Posts from './Components/Posts'
import RouteComponents from './Components/RouteComponents'
import Signup from './Components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=" bg-gray-900 min-h-screen">
    
      <RouteComponents></RouteComponents>

    
    <CreatePost/>
      <Posts/>
    </div>
  )
}

export default App
