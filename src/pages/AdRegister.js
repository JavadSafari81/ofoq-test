import {useState} from "react";
import 'leaflet/dist/leaflet.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Location from "../components/Location";


const AdRegister = () => {

    const mapEdit = true


    const [formData, setFormData] = useState({
        pnumber: '',
        address: '',
        description: '',
        location: []
    })


    const [error, setError] = useState({})
    const [valid, setValid] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
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
            try {
                axios.post('http://localhost:8000/ads', formData).then(() => {
                    alert("اگهی ثبت شد")
                    navigate('/')
                })
            } catch (error) {
                console.log('Error fetching data:', error)
            }
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
                    {!valid && <span className="text-red-600">{error.pnumber}</span>}


                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="آدرس"
                        onChange={(event) => setFormData({...formData, address: event.target.value})}
                    />
                    {!valid && <span className="text-red-600">{error.address}</span>}


                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="description"
                        placeholder="توضیحات"
                        onChange={(event) => setFormData({...formData, description: event.target.value})}
                    />


                    <Location formData={formData} setFormData={setFormData} mapEdit={mapEdit}/>

                    {!valid && <span className="text-red-600">{error.location}</span>}

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
