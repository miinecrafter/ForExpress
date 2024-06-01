import './App.css';
import Pair from './Pair.js';

function App() {

  const currencyComparisons = [["AUD", "CAD"], ["CHF", "CNH"], ["CZK", "JPY"], ["USD", "EUR"],
                            ["CAD", "CHF"], ["USD", "DKK"], ["CZK", "AUD"], ["CNH", "USD"],
                            ["DKK", "CAD"], ["USD", "CNH"]];

  return (
    <div className="App">
      {currencyComparisons.map((entry) => (
        <Pair cur1={entry[0]}  cur2={entry[1]} />
      ))}
    </div>
  );
}

export default App;
