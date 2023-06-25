import './App.css';
import Auth from './components/auth/auth';
import { createContext, useEffect, useState } from 'react';
import Tickets from './components/tickets/tickets';
import axios from 'axios';

export const UserContext = createContext(null);

const cities = [
  {name: "Beijing", tag: "China"},
  {name: "Shanghai", tag: "China"},
  {name: "Chongqing", tag: "China"},
  {name: "Shenzhen", tag: "China"},
  {name: "Tianjin", tag: "China"},
  {name: "Xian", tag: "China"},
  {name: "Tokyo", tag: "Japan"},
  {name: "Kyoto", tag: "Japan"},
  {name: "Sapporro", tag: "Japan"},
  {name: "Yokohama", tag: "Japan"},
  {name: "Fukuoka", tag: "Japan"},
  {name: "Seoul", tag: "Korea"},
  {name: "Daegu", tag: "Korea"},
  {name: "Busan", tag: "Korea"},
  {name: "Gwangju", tag: "Korea"},
  {name: "Kualar Lumpur", tag: "Malaysia"},
  {name: "Penang", tag: "Malaysia"},
  {name: "Johor Bahru", tag: "Malaysia"},
]

const selectCities = () => {
  let result = [];
  for (let i=0; i<3; i++) {
    result.push(cities[Math.floor(Math.random() * cities.length)])
  }
  return result
}

function App() {
  const [user, setUser] = useState(null);
  const [visit, setVisit] = useState(null);

  let tickets = selectCities()
  
  const generatePrompt = () => {
    axios.post("http://localhost:5000/prompt", {
      id: user
    }).then((response) => {
      setVisit(response.data)
    })
  }

  return (
    <UserContext.Provider value={{user, setUser, generatePrompt}}>
    <div className="App">
      {!user ? <Auth></Auth> : <div>{user}</div>}
      <div>
        <div>Tickets</div>
        {tickets.map(city => <Tickets city={city.name} tag={city.tag}/>)}
      </div>
      {user ? <div>Personal recommendation for {user}: {visit}</div> : ""}
    </div>
    </UserContext.Provider>
  );
}

export default App;
