import axios from "axios";
import "./auth.module.css";
import { useState } from "react";

const Auth = () => {
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
            
          } else {
            setError("Username or password incorrect")
          }
        })
      } else {
        axios.post("http://localhost:5000/signup", {
          username: username,
          password: password
        }).then((response) => {
          if (response) {

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