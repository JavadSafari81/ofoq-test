import {Link, useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import axios from "axios"
import {dataBaseUsersContext} from "../App";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        cpassword: ''
    })
    const {dataBaseUsers, setDataBaseUsers} = useContext(dataBaseUsersContext)

    const [error, setError] = useState({})
    const [valid, setValid] = useState(true)
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users');
            setDataBaseUsers(response.data);
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
        } else if (dataBaseUsers.some(item => item.username === formData.username)) {
            isvalid = false;
            validationErrors.username = "نام کاربری وجود دارد"
        }
        if (formData.email === "" || formData.email === null) {
            isvalid = false;
            validationErrors.email = "ایمیل ضروری"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isvalid = false;
            validationErrors.email = "ایمیل مورد تایید نیست"
        } else if (dataBaseUsers.some(item => item.email === formData.email)) {
            isvalid = false;
            validationErrors.email = "ایمیل وجود دارد"
        }
        if (formData.password === "" || formData.password === null) {
            isvalid = false;
            validationErrors.password = "رمزعبور ضروری"
        } else if (formData.password.length < 6) {
            isvalid = false;
            validationErrors.password = "رمزعبور باید حداقل ۶ حرف باشد"
        }
        if (formData.cpassword === "" || formData.cpassword === null) {
            isvalid = false;
            validationErrors.cpassword = "رمزعبور ضروری"
        } else if (formData.cpassword !== formData.password) {
            isvalid = false;
            validationErrors.cpassword = "رمزعبور یکسان نیست"
        }
        setError(validationErrors);
        setValid(isvalid);
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8000/users', formData)
                .then(result => {
                    alert("عضوریت با موفقیت انجام شد")
                    navigate('/')
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form className="bg-white px-6 py-8 rounded shadow-md text-black w-full" dir="rtl"
                      onSubmit={handleSubmit}>
                    <h1 className="mb-8 text-3xl text-center">ثبت نام</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="نام کاربری"
                        onChange={(event) => setFormData({...formData, username: event.target.value})}
                    />
                    {valid ? <></> : <span className="text-red-600">{error.username}</span>}

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="ایمیل"
                        onChange={(event) => setFormData({...formData, email: event.target.value})}
                    />
                    {valid ? <></> : <span className="text-red-600">{error.email}</span>}

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="رمز ورود"
                        onChange={(event) => setFormData({...formData, password: event.target.value})}
                    />
                    {valid ? <></> : <span className="text-red-600">{error.password}</span>}

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="تایید رمز عبور"
                        onChange={(event) => setFormData({...formData, cpassword: event.target.value})}
                    />
                    {valid ? <></> : <span className="text-red-600">{error.cpassword}</span>}


                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >عضویت
                    </button>
                </form>

                <div className="text-grey-dark mt-6">
                    درحال حاضر اکانت دارید؟
                    <Link className="no-underline border-blue-500 text-blue-500 mr-2" to="/login">
                        ورود
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;