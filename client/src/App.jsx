import { BrowserRouter , Routes , Route } from 'react-router-dom' 
import Home from './pages/Home' 
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
