import Location from "./Location";
import {useEffect} from "react";
import TextInput from "./AdDetailInput";

const AdDetail = ({ad, id, formData, setFormData, editAble, mapEdit, setMapEdit}) => {

    useEffect(() => {
        editAble ? setMapEdit(true) : setMapEdit(false)
    }, [editAble, setMapEdit]);

    return (
        <div>
            {
                editAble ? (<div>
                    <TextInput
                        type={"number"}
                        name="pnumber"
                        placeholder={ad.pnumber}
                        value={formData.pnumber}
                        onChange={(event) => setFormData({...formData, pnumber: event.target.value})}
                    />
                    <TextInput
                        type={"text"}
                        name="address"
                        placeholder={ad.address}
                        value={formData.address}
                        onChange={(event) => setFormData({...formData, address: event.target.value})}
                    />
                    <TextInput
                        type={"text"}
                        name="description"
                        placeholder={ad.description}
                        value={formData.description}
                        onChange={(event) => setFormData({...formData, description: event.target.value})}
                    />
                    <Location ID={id} mapEdit={mapEdit} formData={formData} setFormData={setFormData}
                              adLocation={ad.location}/>


                </div>) : <div>
                    <h1 className="mb-8 text-3xl text-center">{ad.pnumber}</h1>
                    <h2 className="mb-8 text-3xl text-center">{ad.address}</h2>
                    <h2 className="mb-8 text-3xl text-center">{ad.description}</h2>
                    <div>
                        <Location ID={id} adLocation={ad.location} mapEdit={mapEdit}/>
                    </div>
                </div>
            }</div>

    )
}

export default AdDetail;