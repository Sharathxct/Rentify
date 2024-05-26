import { BrowserRouter , Routes , Route } from 'react-router-dom' 
import Home from './pages/Home' 
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AddProp from './pages/AddProp'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/add/property' element={<AddProp />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
