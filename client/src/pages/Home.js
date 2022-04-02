import '../components/Home.css';
import * as React from 'react';
import {useEffect, useState} from 'react';
import Axios from 'axios';

function Home() {
    const [xpLevel, setXpLevel] = useState([]);
    let stopEffect = 1;

    useEffect(() => {
        Axios.get("http://localhost:8080/xpLevel", { params: { id: localStorage.getItem("id")} }).then((response) => {
            console.log(response);
            setXpLevel(response.data);
        });
    }, [stopEffect])

    return (
        <div className='HomePage'>
            <h1>
                GAINTRAIN: FITNESS APPLICATION
            </h1>
        </div>
    );
}
export default Home;