import axios from "axios";
import "./auth.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../App";

const Auth = () => {
    const user = useContext(UserContext);
    const [error, setError] = useState("")
    const [type, setType] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (type) {
        axios.post("http://localhost:5000/login", {
          username: username,
          password: password
        }).then((response) => {
          if (response) {
            user.setUser(response.data)
          } else {
            setError("Username or password incorrect")
          }
        }).then(user.generatePrompt())
      } else {
        axios.post("http://localhost:5000/signup", {
          username: username,
          password: password
        }).then((response) => {
          if (response) {
            console.log(response)
          } else {
            setError("Account already exists")
          }
        })
      }
    }

    return (
        <>
          {type ? <div>Login</div>:<div>Signup</div>}
          <form onSubmit={handleSubmit}>
            <div>Username</div>
            <input type="text" value={username || ""} onChange={(e)=>setUsername(e.target.value)}/>
            <div>Password</div>
            <input type="password" value ={password || ""} onChange={(e)=>setPassword(e.target.value)}/>
            {error ? <div>{error}</div> : ""}
            {type ? <input type="submit" value="Login"/> : <input type="submit" value="Signup"/>}          
          </form>
          {type ? <div>Don't have an account? <button onClick={()=>setType(!type)}>Sign up</button></div> : <div>Already have an account? <button onClick={()=>setType(!type)}>Log in</button></div>}
        </>
    )
};

export default Auth;