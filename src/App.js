import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Menu from './components/Manu';
import Navbar from './components/Navbar';
import FoodApi from './api/FoodApi';

const uniqmenu = [...new Set(FoodApi.map(el=>el.category))];

function App() {
  return (
    <>
    <Navbar uniqmenu = {uniqmenu} foodapi={FoodApi}/>
   <Menu foodapi = {FoodApi}/>
   </>
  );
}

export default App;
