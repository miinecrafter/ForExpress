import './App.css';
import Pair from './Pair.js';
import { Link, Routes, Route } from 'react-router-dom';

function Overview({currencyComparisons}) {
  return (
    <div className="App">
      {currencyComparisons.map((entry) => (
        <>
          <Link to={`/card${entry[0]}${entry[1]}`}>
            <Pair cur1={entry[0]}  cur2={entry[1]} />
          </Link>
        </>
      ))}
    </div>
  );
}

export default Overview;
