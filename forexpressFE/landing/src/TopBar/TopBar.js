import './TopBar.css';

export default function TopBar() {
    return (
        <>
            <p className="topbar-title">forexpress</p>
            <div className="enter">
            <a href="https://www.google.com">
                <button className="login">Login</button>
            </a>
            <a href="https://www.google.com">
                <button className="signup">Sign up</button>
            </a>
            </div>
        </>
    );
}