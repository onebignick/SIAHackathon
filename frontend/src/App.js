import logo from './logo.svg';
import './App.css';
import TicketBox from './components/TicketBox';
import franceImage from './images/France.jpg';
import japanImage from './images/Japan.jpg';
import taiwanImage from './images/Taiwan.jpg';
import axios from 'axios';
import Auth from './components/auth/auth';

function App() {
  const amount = 0;
  const countryName = "France";
  const imageName = countryName === "Japan"? japanImage: countryName === "France"? franceImage: taiwanImage;
  return (
    <div className="App">
      <TicketBox amount={amount} countryName={countryName} image= {imageName}/>
      <Auth></Auth>
    </div>
  );
}

export default App;
