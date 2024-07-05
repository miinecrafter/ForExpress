import './TopBar.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function TopBar(data = [["signup", "Sign up"], ["login", "Log in"]]) {
    return (
        <div className="cont">
            <p className="topbar-title">forexpress</p>
            <div className="enter">
                {data.buttonData.map((entry) => (
                    <Link to={`/${entry[0]}`} >
                        <button>{entry[1]}</button>
                    </Link>
                ))}
            </div>
        </div>
    );
}