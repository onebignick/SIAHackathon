import "../styles/ImageStyle.css";
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function TicketBox({countryName, amount, image}) {
    const [val, setVal] = useState(false)
    const [form, setForm] = useState("");
    useEffect(() => {
        console.log(form);
    }, [form]) 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setForm("");
        console.log("submitted");
    }

    const handleButton = async (e) => {
        setVal(!val);
        await fetch({method:"POST"},"http://localhost:5000/test", { 
            hello:val,
            another:"tyvm"
        }).then((response) => console.log(response.data[0]));

    };


    return (

        <div className="Container"> 
            <p>Country: {countryName}</p>
            <p>Amount: {amount}</p>
            <img src={image} alt={countryName} className="imageStyle" width='150' height= '150'/>
            <button onClick={handleButton}/>
            <form onSubmit={handleSubmit}>
                <input type='text' value = {form|| ""} onChange={(e) => setForm(e.target.value)} /> 
                <input type= "submit" value = "submit"></input>
            </form>
        </div>
    )

}