import Location from "./Location";
import {useEffect} from "react";

const AdDetail = ({ad, id, formData, setFormData, editAble, mapEdit, setMapEdit}) => {

    useEffect(() => {
        editAble ? setMapEdit(true) : setMapEdit(false)
    }, []);

    return (
        <div>
            {
                editAble ? (<div>

                    <input type="number"
                           className="block border border-grey-light w-full p-3 rounded mb-4"
                           name="pnumber"
                           placeholder={`${ad.pnumber}`}
                           value={formData.pnumber}
                           onChange={(event) => setFormData({...formData, pnumber: event.target.value})}
                    />
                    <input type="text"
                           className="block border border-grey-light w-full p-3 rounded mb-4"
                           name="address"
                           placeholder={`${ad.address}`}
                           value={formData.address}

                           onChange={(event) => setFormData({...formData, address: event.target.value})}
                    />
                    <input type="text"
                           className="block border border-grey-light w-full p-3 rounded mb-4"
                           name="description"
                           placeholder={`${ad.description}`}
                           value={formData.description}

                           onChange={(event) => setFormData({...formData, description: event.target.value})}
                    />
                    <Location ID={id} mapEdit={mapEdit} formData={formData} setFormData={setFormData}
                              adLocation={ad.location}/>


                </div>) : <div>
                    <h1 className="mb-8 text-3xl text-center">{ad.pnumber}</h1>
                    <h1 className="mb-8 text-3xl text-center">{ad.address}</h1>
                    <h1 className="mb-8 text-3xl text-center">{ad.description}</h1>
                    <div>
                        <Location ID={id} adLocation={ad.location} mapEdit={mapEdit}/>
                    </div>
                </div>
            }</div>

    )
}

export default AdDetail;