import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../App";

const Tickets = (props) => {
    const user = useContext(UserContext);

    const handleClick = () => {
        axios.post("http://localhost:5000/updateContact", {
            id: user.user,
            tag: props.tag
        }).then(() => user.generatePrompt())
    }

    return (
        <>
          <div>{props.city}</div>
          <button onClick={handleClick}>Click here to view</button>
        </>
    )
}

export default Tickets;