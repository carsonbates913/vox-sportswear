import './Navbar.css';

export default function Navbar (props) {
    return(
        <div className="navbar">
            {props.children}
        </div>
    )
}
