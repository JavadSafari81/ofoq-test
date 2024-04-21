import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {dataBaseContext} from "../App";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const {dataBase, setDataBase} = useContext(dataBaseContext)
    const [error, setError] = useState({})
    const [valid, setValid] = useState(true)

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users');
            setDataBase(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        let isvalid = true;
        let validationErrors = {}
        if (formData.username === "" || formData.username === null) {
            isvalid = false;
            validationErrors.username = "نام کاربری ضروری"
        }
        if (formData.password === "" || formData.password === null) {
            isvalid = false;
            validationErrors.password = "رمزعبور ضروری"
        }

        if (dataBase.some(item => item.username === formData.username && item.password === formData.password)) {
            alert("ورود موفقیت آمیز بود")
            navigate('/')
        } else {
            isvalid = false;
            validationErrors.userpass = "رمزعبور یا نام کاربری اشتباه است"
        }
        setError(validationErrors);
        setValid(isvalid);


    }
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form className="bg-white px-6 py-8 rounded shadow-md text-black w-full" dir="rtl"
                      onSubmit={handleSubmit}>
                    <h1 className="mb-8 text-3xl text-center">ورود به حساب کاربری</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="نام کاربری"
                        onChange={(event) => setFormData({...formData, username: event.target.value})}
                    />
                    {valid ? <></> : <span className="text-red-600">{error.username}</span>}

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="رمز ورود"
                        onChange={(event) => setFormData({...formData, password: event.target.value})}
                    />
                    {valid ? <></> : <span className="text-red-600">{error.password}</span>}
                    {valid ? <></> : <span className="text-red-600">{error.userpass}</span>}


                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >ورود
                    </button>
                </form>

                <div className="text-grey-dark mt-6">
                    درحال حاضر اکانت ندارید؟
                    <Link className="no-underline border-blue-500 text-blue-500 mr-2" to="/signup">
                        ثبت نام
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;