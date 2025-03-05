import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/common.css'
import FoodItemList from './components/FoodItemList';
import FoodItemDetails from './components/FoodItemDetails';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<FoodItemList/>}/>
        <Route path="/cart/:id" element={<FoodItemDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App
