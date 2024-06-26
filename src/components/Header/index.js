import {Link, withRouter} from 'react-router-dom'
import {RiHome4Line} from 'react-icons/ri'
import {IoLogOutOutline} from 'react-icons/io5'
import {TiShoppingBag} from 'react-icons/ti'

import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="nav-header">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="logo"
      />
      <ul className="links-cont">
        <Link className="link" to="/">
          <li>Home</li>
        </Link>
        <Link className="link" to="/jobs">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" onClick={onLogout} className="logout">
        Logout
      </button>
      <ul className="all-button-cont">
        <Link to="/" className="sm-icon">
          <li>
            <RiHome4Line />
          </li>
        </Link>
        <Link to="/jobs" className="sm-icon">
          <li>
            <TiShoppingBag />
          </li>
        </Link>
        <li className="logout-sm-cont">
          <IoLogOutOutline className="sm-icon" onClick={onLogout} />
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
