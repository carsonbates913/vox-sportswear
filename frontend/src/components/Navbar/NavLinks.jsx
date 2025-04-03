import { NavLink } from 'react-router-dom'
import './NavLinks.css'

export default function NavLinks (props) {
  return (
    <ul className="navlinks">
      <li>
        <NavLink className="navlinks__item" to="/aboutus">About</NavLink>
      </li>
      <li>
        <NavLink className="navlinks__item" to="/products">Products</NavLink>
      </li>
    </ul>
  )
}