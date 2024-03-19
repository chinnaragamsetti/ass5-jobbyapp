import {Component} from 'react'
import {IoMdSearch} from 'react-icons/io'
import Cookies from 'js-cookie'

import './index.css'

class Profile extends Component {
  state = {imageUrl: '', name: '', bio: '', profileStatus: false}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.setState(prevState => ({
        imageUrl: fetchedData.profile_details.profile_image_url,
        name: fetchedData.profile_details.name,
        bio: fetchedData.profile_details.short_bio,
        profileStatus: !prevState.profileStatus,
      }))
    } else if (response.ok === false) {
      this.setState(prevState => ({profileStatus: !prevState.profileStatus}))
    }
  }

  onChangeSearchInput1 = (onChangeSearch1, event) => {
    onChangeSearch1(event.target.value)
  }

  render() {
    const {imageUrl, name, bio, profileStatus} = this.state
    const {onChangeSearch1} = this.props
    return profileStatus ? (
      <div className="profile-main-cont">
        <div className="search-input-cont1">
          <input
            onChange={this.onChangeSearchInput1(onChangeSearch1)}
            type="search"
            className="search-input1"
          />
          <IoMdSearch className="search-icon1" />
        </div>
        <div className="profile-sub-cont">
          <img src={imageUrl} alt="profileImage" className="profile-image" />
          <h1 className="profile-name">{name}</h1>
          <p className="role">{bio}</p>
        </div>
      </div>
    ) : (
      <div className="profile-main-fail-cont">
        <p className="retry">Retry</p>
      </div>
    )
  }
}

export default Profile
