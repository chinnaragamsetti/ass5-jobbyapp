import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {CiStar} from 'react-icons/ci'
import {IoBagCheckOutline} from 'react-icons/io5'
import {IoLocationOutline} from 'react-icons/io5'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    skills: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: Bearer`${jwt_token}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)
    const jobDetails = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      description: data.job_details.life_at_company.description,
      imageUrl: data.job_details.life_at_company.image_url,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
    }
    const skills = data.map(each => ({
      skillImageUrl: each.imageUrl,
      skillName: each.name,
    }))
    const similarJobs = data.job_details.map(each => ({
      similarCompanyLogoUrl: each.company_logo_url,
      similarEmploymentType: each.employment_type,
      id: each.id,
      similarJobDescription: each.job_description,
      similarLocation: each.location,
      similarRating: each.rating,
      similarTitle: each.title,
    }))
    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobData: jobDetails,
        similarJobsData: similarJobs,
        skills,
      })
    } else if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsData = () => {
    const {jobData, similarJobsData, skills} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      description,
      imageUrl,
      location,
      packagePerAnnum,
      rating,
    } = jobData

    return (
      <div className="job-data-sub-cont">
        <div className="job-data">
          <div className="job-data-top-cont">
            <img src={companyLogoUrl} alt="logo" className="similar-logo" />
            <div className="title-cont">
              <p className="title">title</p>
              <div className="rating-cont">
                <CiStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-data-bottom-cont">
            <div className="location-type-cont">
              <IoLocationOutline className="star" />
              <p className="rating">{location}</p>
              <IoBagCheckOutline className="star" />
              <p className="rating">{employmentType}</p>
            </div>
            <p className="title">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="desc-cont">
            <p className="title">Description</p>
            <a href={companyWebsiteUrl} className="link-text">
              Visit <FaExternalLinkAlt className="link-image" />
            </a>
          </div>
          <p className="rating">{jobDescription}</p>
          <p className="title">Skills</p>
          <ul className="skills-list">
            {skills.map(each => (
              <li className="each-skill">
                <img
                  src={each.skillImageUrl}
                  className="similar-logo"
                  alt="skill-logo"
                />
                <p className="rating">{each.skillName}</p>
              </li>
            ))}
          </ul>
          <p className="title">Life at Company</p>
          <div className="life-at-cont">
            <p className="life-at-text">{description}</p>
            <img
              src={imageUrl}
              alt="life-at-imageUrl"
              className="life-at-imageUrl"
            />
          </div>
        </div>
        <p className="title">SimilarJobs</p>
        <ul className="similar-jobs-list">
          {similarJobsData.map(each => (
            <li className="similar-jobs-each-list">
              <div className="job-data-top-cont">
                <img
                  src={each.similarCompanyLogoUrl}
                  alt="logo"
                  className="similar-logo"
                />
                <div className="title-cont">
                  <p className="title">{each.similarTitle}</p>
                  <div className="rating-cont">
                    <CiStar className="star" />
                    <p className="rating">{each.similarRating}</p>
                  </div>
                </div>
              </div>
              <p className="title">Description</p>
              <p className="rating">{each.similarRating}</p>
              <div className="similar-each-list-bottom-cont">
                <IoLocationOutline className="star" />
                <p className="rating">{each.similarLocation}</p>
                <IoBagCheckOutline className="star" />
                <p className="rating">{each.similarEmploymentType}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobDetailsData()
  }

  renderJobDetailsFailureView = () => (
    <div className="jobs-failure-main-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <p className="jobs-failure-head">Oops! Something Went Wrong</p>
      <p className="jobs-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="jobs-failure-retry-button"
        type="button"
        onClick={this.onRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsData()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-main-cont">
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}
export default JobDetails
