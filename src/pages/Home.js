import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";


const Home = () => {
    const [dataBaseAds, setDataBaseAds] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPages = 3
    const navigate = useNavigate()




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

    const indexOfLastAds = currentPage * postsPerPages;
    const indexOfFirstAds = indexOfLastAds - postsPerPages
    const currentAds = dataBaseAds.slice(indexOfFirstAds, indexOfLastAds)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(dataBaseAds.length / postsPerPages); i++) {
        pageNumbers.push(i);
    }

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (

        <div>
            <div className="w-full h-full grid grid-cols-3 gap-4 justify-items-center p-4">
                {currentAds.map(data => {
                    return (
                        <div className="cursor-pointer inline-block px-3" key={data.id} onClick={() => {
                            navigate(`/${data.id}`)
                        }}>
                            <div className="image-container rounded shadow-lg" style={{width: "300px"}}>
                                <img className="w-full" alt="sample"
                                     src='https://modernvillaco.com/wp-content/uploads/2023/09/designing-Villa-1.jpg'
                                     style={{height: "275px"}}/>
                                <h1 className="flex w-full justify-center items-center">{data.address}</h1>

                            </div>

                        </div>
                    )
                })}
            </div>
            <div className="flex flex-1 justify-center">
                {pageNumbers.map(number => (
                    <li onClick={() => paginate(number)}
                        className="cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        key={number}>
                        <Link to="#">
                            {number}
                        </Link>
                    </li>
                ))}
            </div>
        </div>

    )
}

export default Home;