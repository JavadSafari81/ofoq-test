import {dataBaseAdsContext} from "../App";
import {useContext, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ConfirmPopup from "../components/ConfirmPopup";
import AdDetail from "../components/AdDetail";
import axios from "axios";


const AdPages = () => {


    const {dataBaseAds} = useContext(dataBaseAdsContext)
    const [mapEdit, setMapEdit] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [editAble, setEditAble] = useState(false)
    const location = useLocation();
    const {pathname} = location;
    const ID = pathname.substring(1);
    const ad = dataBaseAds.find(ad => ad.id === ID);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        pnumber: ad.pnumber,
        address: ad.address,
        description: ad.description,
        location: ad.location
    })
    const handleEdit = () => {
        setEditAble(true)
        setMapEdit(true)
    }
    const editData = async () => {

        try {
            await axios.patch(`http://localhost:8000/ads/${ID}`, formData);
            alert(`تغییرات آگهی با موفقیت انجام شد`);
            setEditAble(false)
            navigate(`/${ID}`)
            window.location.reload();
        } catch (error) {
            console.error('Error editing ad:', error);
        }

    }


    return (

        <div>
            {showPopup && <ConfirmPopup id={ID} setShowPopup={setShowPopup}/>}
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form className="bg-white px-6 py-8 rounded shadow-md text-black w-full" dir="rtl">

                        <AdDetail ad={ad} id={ID} formData={formData} setFormData={setFormData} editAble={editAble}
                                  setMapEdit={setMapEdit} mapEdit={mapEdit}/>


                        <div className="flex">
                            <button onClick={() => setShowPopup(true)}
                                    type="button"
                                    className="w-1/4 text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                            >حذف
                            </button>
                            {editAble ? <button onClick={editData}
                                                type="button"
                                                className="w-1/4 mr-4 text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                            >ثبت تغییرات
                            </button> : <button onClick={handleEdit}
                                                type="button"
                                                className="w-1/4 mr-4 text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                            >تغییر آگهی
                            </button>}

                        </div>
                    </form>

                </div>
            </div>
        </div>

    )

}

export default AdPages;