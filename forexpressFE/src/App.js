import './App.css';
import { useState } from 'react';


function App() {
  const [balance, setBalance] = useState(100, (newBalance) => {
    balance = newBalance;
    console.log({balance});
  });
  const handleBalanceClick = e => {
    e.preventDefault();
    setBalance(balance + 100);
  }

  async function sendData(url, user, pass){

    console.log("sending data...");

    try {
      // Send the GET request using fetch
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username : user,
          password : pass
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data received:', data);

      // Display the received data on the page (for demonstration purposes)
      document.getElementById('result').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSignup = (e) => {
    console.log("inside sign up");

    e.preventDefault();
    var username = document.getElementById('newuname').value;
    var password = document.getElementById('newpword').value;

    const url = "http://localhost:3001/api/signUser";

    sendData(url, username, password);
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
  return (
    <div className="App">
      <form onSubmit={((e) => handleSignup(e))}>
        <p>sign up</p> <br />
        <label htmlFor="newuname">Uname</label>
        <input type="text" placeholder="works1" id="newuname" name="newUsername"></input> <br />
        <label htmlFor="newpword">pword</label>
        <input type="text" placeholder="works1" id="newpword" name="newPassword"></input> <br />
        <button type="submit">sign up</button>
      </form>
      <form onSubmit={(e) => handleLogin(e)}>
        <p>log in</p> <br />
        <label htmlFor="uname">Uname</label>
        <input type="text" placeholder="works1" id="uname" name="username"></input> <br />
        <label htmlFor="pword">pword</label>
        <input type="text" placeholder="works1" id="pword" name="password"></input> <br />
        <button type="submit">log in</button>
      </form>
      <button onClick={(e) => handleBalanceClick(e)}>increase balance</button>

      <p>balance {balance}</p>
    </div>
  );
}

export default App;
