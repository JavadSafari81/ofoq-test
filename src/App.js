import './css/style.css'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {Routes, Route, useLocation} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdPages from "./pages/AdPages";
import AdRegister from "./pages/AdRegister";
import {useState, createContext, useEffect} from "react";
import axios from "axios";


export const dataBaseAdsContext = createContext();

function App() {
    const location = useLocation();
    const [dataBaseAds, setDataBaseAds] = useState([])


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/ads');
            setDataBaseAds(response.data)
        } catch (error) {
            console.log('Error fetching data:', error)
        }

    }
    useEffect(() => {
        fetchData()
    }, []);


    return (

        <div>
            {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar/>}
                <dataBaseAdsContext.Provider value={{dataBaseAds, setDataBaseAds}}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/adregister" element={<AdRegister/>}/>
                        {dataBaseAds.map(ad => (
                            <Route key={ad.id} path={`/${ad.id}`} element={<AdPages/>}/>
                        ))}
                        <Route path="*" element={<h1>404</h1>}/>
                    </Routes>
                </dataBaseAdsContext.Provider>
        </div>
    )
        ;
}

export default App;
