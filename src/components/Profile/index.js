import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'In_PROGRESS',
  failure: 'FAILURE',
}
class Profile extends Component {
  state = {
    imageUrl: '',
    name: '',
    bio: '',
    profileStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        imageUrl: fetchedData.profile_details.profile_image_url,
        name: fetchedData.profile_details.name,
        bio: fetchedData.profile_details.short_bio,
        profileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  renderSuccess = () => {
    const {imageUrl, name, bio} = this.state

    return (
      <div className="profile-main-cont">
        <div className="profile-sub-cont">
          <img src={imageUrl} alt="profile" className="profile-image" />
          <h1 className="profile-name">{name}</h1>
          <p className="role">{bio}</p>
        </div>
      </div>
    )
  }

  renderFailure = () => (
    <div className="profile-main-fail-cont">
      <button type="button" className="retry" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderInProgress = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderInProgress()
      default:
        return null
    }
  }
}

export default Profile
