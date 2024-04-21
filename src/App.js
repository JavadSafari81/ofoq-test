import './css/style.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import {Routes, Route, useLocation} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdRegister from "./components/AdRegister";
import {useState, createContext} from "react";


export const dataBaseContext = createContext();

function App() {
    const location = useLocation();
    const [dataBase, setDataBase] = useState([])


    return (

        <div>
            {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar/>}
            <dataBaseContext.Provider value={{dataBase, setDataBase}}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/adregister" element={<AdRegister/>}/>
            </Routes>
                </dataBaseContext.Provider>
        </div>
    )
        ;
}

export default App;
