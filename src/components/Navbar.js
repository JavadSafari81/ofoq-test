import "../css/style.css"
import {Link} from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="navbar flex items-center border-b border-gray-300 sticky top-0 bg-white" dir="rtl">
            <div className="w-3/12 mr-3">
                <Link to="/"> <img
                    alt="Site Logo"
                    src="https://cdn.jabama.com/original/jabama-images/0/ef4d1238-76d8-4500-9c71-625d21859abb.svg"/>
                </Link>
            </div>
            <div className="w-6/12"></div>
            <div className="w-3/12" dir="ltr">
                <Link to="/adregister"
                      className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded m-2">
                    ثبت اگهی
                </Link>
                <Link to="/signup"
                      className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded m-2">
                    ثبت نام
                </Link>
                <Link to="/login"
                      className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded m-2">
                    ورود
                </Link>
            </div>
        </nav>

    )
}

export default Navbar;