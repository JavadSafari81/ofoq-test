import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import {useContext, useState} from "react";
import 'leaflet/dist/leaflet.css';
import {icon} from 'https://cdn.esm.sh/leaflet';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Location from "./Location";
import {editAbleContext, mapEditContext} from "../App";


const AdRegister = () => {

    const {mapEdit, setMapEdit} = useContext(mapEditContext)
    setMapEdit(true);


    const [formData, setFormData] = useState({
        pnumber: '',
        address: '',
        description: '',
        location: []
    })
    const customIcon = icon({
        iconUrl: 'https://cdn2.iconfinder.com/data/icons/social-media-8/512/pointer.png',
        iconSize: [60, 60],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });
    const [position, setPosition] = useState([35.6892, 51.389]);


    const [error, setError] = useState({})
    const [valid, setValid] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        let isvalid = true;
        let validationErrors = {}
        if (formData.pnumber === "" || formData.pnumber === null) {
            isvalid = false;
            validationErrors.pnumber = "شماره موبایل ضروری"
        }
        if (formData.address === "" || formData.address === null) {
            isvalid = false;
            validationErrors.address = "شماره موبایل ضروری"
        }
        if (formData.location.length === 0) {
            isvalid = false;
            validationErrors.location = "لوکیشن ضروری"
        }

        setError(validationErrors);
        setValid(isvalid);

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8000/ads', formData)
                .then(result => {
                    alert("اگهی ثبت شد")
                    navigate('/')
                })
                .catch(err => console.log(err))
        }


    }
    return (

        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center p-4">
                <form className="bg-white px-6 py-8 rounded shadow-md text-black w-full" dir="rtl"
                      onSubmit={handleSubmit}>
                    <h1 className="mb-8 text-3xl text-center">ثبت آگهی</h1>
                    <input
                        type="number"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="pnumber"
                        placeholder="شماره موبایل"
                        onChange={(event) => setFormData({...formData, pnumber: event.target.value})}
                    />
                    {valid ? <></> : <span className="text-red-600">{error.pnumber}</span>}


                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="آدرس"
                        onChange={(event) => setFormData({...formData, address: event.target.value})}
                    />
                    {valid ? <></> : <span className="text-red-600">{error.address}</span>}


                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="description"
                        placeholder="توضیحات"
                        onChange={(event) => setFormData({...formData, description: event.target.value})}
                    />


                    <Location formData={formData} setFormData={setFormData} mapEdit={mapEdit}/>

                    {valid ? <></> : <span className="text-red-600">{error.location}</span>}

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >ثبت آگهی
                    </button>
                </form>
            </div>
        </div>

    );
}

export default AdRegister;
