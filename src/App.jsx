import './App.css'
import { NavBar } from './components/nav/Navbar'
import ApplicationViews from './components/ApplicationViews'
import { BrowserRouter } from 'react-router-dom'

const App = () => {


  return (
    <>
    <BrowserRouter>

      <NavBar />
      <div className="pt-16">
      <ApplicationViews/>
      </div>
    
    </BrowserRouter>

    </>
  )
}

export default App
