import './App.css';
import { useState } from 'react';
import ChartMaker from './ChartMaker.js';


export default function App() {
  const [balance, setBalance] = useState(100, (newBalance) => {
    balance = newBalance;
    console.log({balance});
  });
  const [time, setTime] = useState("NowData");
  const [cur1, setCur1] = useState();
  const [cur2, setCur2] = useState();

  const handleBuy = async e => {

    console.log("handling buy");

    e.preventDefault();
    var cur1 = document.getElementById('curOne').value;
    var cur2 = document.getElementById('curTwo').value;
    var amt = document.getElementById('newAmount').value;

    console.log(cur1 + " / " + cur2 + " / " + amt);

    var url = 'http://localhost:3001/api/updateBalance/rayaan/' + cur1 + '/' + amt + '/buy';
    console.log(url);
    var response = await fetch(url);

    url = 'http://localhost:3001/api/updateBalance/rayaan/' + cur2 + '/' + amt + '/sell';
    console.log(url);
    response = await fetch(url);

    const stat = response.json();
    if(stat.message == "success") console.log("success");
    else console.log("Not enough money in wallet");
  }

  const handleBalanceClick = e => {
    e.preventDefault();
    setBalance(balance + 100);
  }
  async function getStock(url){
    const newData = await fetchData(url);
    return newData;
  }
  const handleStockClick = e => {
    e.preventDefault();
    const newData = getStock('http://localhost:3002/api/getData/Top/tes/ter');
    console.log(newData);
  }

  async function fetchData(url) {
    try {
      // Send the GET request using fetch
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data received:', data);

      // Display the received data on the page (for demonstration purposes)
      document.getElementById('result').textContent = JSON.stringify(data, null, 2);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } 

  const handleLogin = (e) => {
    console.log("inside log in");

    e.preventDefault();
    var username = document.getElementById('uname').value;
    var password = document.getElementById('pword').value;

    console.log(username);
    console.log(password);
    const url = 'http://localhost:3001/api/getUser/' + username + '/' + password;

    console.log(url);
    
    fetchData(url);
  }

  const handlePriceChange = (e, time) => {
    console.log("Requested time change : " + time);
    setTime(time);
  }

  return (
    <div className="App">
      <button onClick={(e) => handleBalanceClick(e)}>increase balance</button>
      <button onClick={(e) => handleStockClick(e)}>get last stock tester</button>

      <button onClick={(e) => handlePriceChange(e, "NowData")}>Now</button>
      <button onClick={(e) => handlePriceChange(e, "DayData")}>Day</button>
      <button onClick={(e) => handlePriceChange(e, "WeekData")}>Week</button>
      <button onClick={(e) => handlePriceChange(e, "MonthData")}>Month</button>
      <button onClick={(e) => handlePriceChange(e, "YearData")}>Year</button>
      <button onClick={(e) => handlePriceChange(e, "FiveYearsData")}>5 Years</button>


      <p>Buy amount</p>
      <label htmlFor="currency1">cur1</label>
      <input type="text" placeholder="works1" id="curOne" name="curOne"></input> <br />


      <label htmlFor="currency2">cur2</label>
      <input type="text" placeholder="works1" id="curTwo" name="curTwo"></input> <br />


      <label htmlFor="amount">amt</label>
      <input type="text" placeholder="works1" id="newAmount" name="newAmount"></input> <br />

      <button onClick={(e) => handleBuy(e)}>Confirm</button>


      <p>balance {balance}</p>
      <ChartMaker time={time} cur1={"tes"} cur2={"ter"} />
    </div>
  );
}

