import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoLocationOutline, IoBagCheckOutline} from 'react-icons/io5'
import {FaExternalLinkAlt, FaStar} from 'react-icons/fa'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    skillsList: [],
    apiStatus: apiStatusConstants.initial,
    titleName: '',
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const url1 = `https://apis.ccbp.in/jobs`
    const options1 = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response1 = await fetch(url1, options1)
    const data1 = await response1.json()

    const titleData = data1.jobs.filter(each => each.id === id)
    const formattedData = {
      companyLogoUrl: titleData[0].company_logo_url,
      employmentType: titleData[0].employment_type,
      id: titleData[0].id,
      location: titleData[0].location,
      jobDescription: titleData[0].job_description,
      packagePerAnnum: titleData[0].package_per_annum,
      rating: titleData[0].rating,
      title: titleData[0].title,
    }

    const titleDataName = formattedData.title

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
    const skills = data.job_details.skills.map(each => ({
      skillImageUrl: each.image_url,
      skillName: each.name,
    }))
    const similarJobs = data.similar_jobs.map(each => ({
      similarCompanyLogoUrl: each.company_logo_url,
      similarEmploymentType: each.employment_type,
      id: each.id,
      similarJobDescription: each.job_description,
      similarLocation: each.location,
      similarRating: each.rating,
      similarTitle: each.title,
    }))
    if (response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobData: jobDetails,
        similarJobsData: similarJobs,
        skillsList: skills,
        titleName: titleDataName,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsData = () => {
    const {jobData, similarJobsData, skillsList, titleName} = this.state
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
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="similar-logo"
            />
            <div className="title-cont">
              <h1 className="title">{titleName}</h1>
              <div className="rating-cont">
                <FaStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-data-bottom-cont">
            <div className="location-type-cont">
              <IoLocationOutline className="location" />
              <p className="rating">{location}</p>
              <IoBagCheckOutline className="location" />
              <p className="rating">{employmentType}</p>
            </div>
            <p className="lpa">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="desc-cont">
            <h1 className="desc-title">Description</h1>
            <a href={companyWebsiteUrl} className="link-text">
              Visit <FaExternalLinkAlt className="link-image" />
            </a>
          </div>
          <p className="desc-data">{jobDescription}</p>
          <div className="skills-list-cont">
            <h1 className="desc-title">Skills</h1>
            <ul className="skills-list">
              {skillsList.map(each => (
                <li className="each-skill">
                  <img
                    src={each.skillImageUrl}
                    className="similar-logo"
                    alt={each.skillName}
                  />
                  <p className="desc-data">{each.skillName}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-cont">
            <h1 className="life-at-cont-title">Life at Company</h1>
            <div className="life-at-cont-desc">
              <p className="life-at-text">{description}</p>
              <img
                src={imageUrl}
                alt="life-at-imageUrl"
                className="life-at-image"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-cont">
          <h1 className="similar-title">SimilarJobs</h1>
          <ul className="similar-jobs-list">
            {similarJobsData.map(each => (
              <li className="similar-jobs-each-list">
                <div className="similar-job-data-top-cont">
                  <img
                    src={each.similarCompanyLogoUrl}
                    alt="similar job company"
                    className="similar-logo1"
                  />
                  <div className="similar-title-cont">
                    <h1 className="similar-text">{each.similarTitle}</h1>
                    <div className="similar-rating-cont">
                      <FaStar className="similar-star" />
                      <p className="similar-rating">{each.similarRating}</p>
                    </div>
                  </div>
                </div>
                <p className="similar-desc-title">Description</p>
                <p className="similar-desc-para">
                  {each.similarJobDescription}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="jobItem-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobDetailsData()
  }

  renderJobDetailsFailureView = () => (
    <div className="each-jobs-failure-main-cont">
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
        return this.renderJobDetailsFailureView()
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
export default JobItemDetails
