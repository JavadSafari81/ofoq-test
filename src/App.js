import './css/style.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import {Routes, Route, useLocation} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdPages from "./components/AdPages";
import AdRegister from "./components/AdRegister";
import {useState, createContext, useEffect} from "react";
import axios from "axios";


export const dataBaseUsersContext = createContext();
export const dataBaseAdsContext = createContext();
export const showPopupContext = createContext();
export const editAbleContext = createContext();
export const mapEditContext = createContext();

function App() {
    const location = useLocation();
    const [dataBaseUsers, setDataBaseUsers] = useState([])
    const [dataBaseAds, setDataBaseAds] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [editAble, setEditAble] = useState(false)
    const [mapEdit, setMapEdit] = useState(true)


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
            <dataBaseUsersContext.Provider value={{dataBaseUsers, setDataBaseUsers}}>
                <dataBaseAdsContext.Provider value={{dataBaseAds, setDataBaseAds}}>
                    <showPopupContext.Provider value={{showPopup, setShowPopup}}>
                        <editAbleContext.Provider value={{editAble, setEditAble}}>
                            <mapEditContext.Provider value={{mapEdit, setMapEdit}}>
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
                            </mapEditContext.Provider>
                        </editAbleContext.Provider>
                    </showPopupContext.Provider>
                </dataBaseAdsContext.Provider>
            </dataBaseUsersContext.Provider>
        </div>
    )
        ;
}

export default App;
