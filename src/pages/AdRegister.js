import {useState} from "react";
import 'leaflet/dist/leaflet.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Location from "../components/Location";
import AdDetailInput from "../components/AdDetailInput";


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
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    return (

        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center p-4">
                <form className="bg-white px-6 py-8 rounded shadow-md text-black w-full" dir="rtl"
                      onSubmit={handleSubmit}>
                    <h1 className="mb-8 text-3xl text-center">ثبت آگهی</h1>
                    <AdDetailInput
                        type="number"
                        name="pnumber"
                        placeholder="شماره موبایل"
                        onChange={handleChange}
                    />
                    {!valid && <span className="text-red-600">{error.pnumber}</span>}


                    <AdDetailInput
                        type="text"
                        name="address"
                        placeholder="آدرس"
                        onChange={handleChange}
                    />
                    {!valid && <span className="text-red-600">{error.address}</span>}


                    <AdDetailInput
                        type="text"
                        name="description"
                        placeholder="توضیحات"
                        onChange={handleChange}
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
