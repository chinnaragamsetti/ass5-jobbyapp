import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdSearch} from 'react-icons/io'

import Header from '../Header'
import Profile from '../Profile'
import FiltersGroup from '../FiltersGroup'
import Jobdetails from '../Jobdetails'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Jobs extends Component {
  state = {
    employment: [],
    salaryRange: salaryRangesList[0].salaryRangeId,
    searchInput: '',
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {employment, salaryRange, searchInput} = this.state
    const employmentList = employment.join(',')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentList}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok) {
      this.setState({apiStatus: apiStatusConstants.inProgress})
      const formattedData = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        location: each.location,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearch2 = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  employmentTypeList = Id => {
    console.log(employmentTypesList)
    const {employment} = this.state
    const oldList = [...employment, Id]
    this.setState({employment: oldList}, this.getJobs)
  }

  salaryRangeList = Id => {
    this.setState({salaryRange: Id}, this.getJobs)
  }

  onRetry = () => {
    this.getJobs()
  }

  renderNotFoundJobs = () => (
    <div className="not-found-jobs-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="jobs-failure-image"
      />
      <p className="jobs-failure-head">No Jobs Found</p>
      <p className="jobs-failure-para">
        We could not found any jobs.Try other filters
      </p>
    </div>
  )

  renderJobsFailureView = () => (
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

  renderJobs = searchResults => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <ul className="search-results-list">
            {searchResults.map(each => (
              <Jobdetails key={each.id} eachDetails={each} />
            ))}
          </ul>
        )
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    const {jobsList, searchInput} = this.state

    const searchResults = jobsList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    // const searchResultsLength = searchResults.length
    return (
      <div className="jobs-main-cont">
        <Header />
        <div className="jobs-sub-cont">
          <div className="jobs-left-cont">
            <div className="search-input-cont1">
              <input
                onChange={this.onChangeSearch2}
                type="text"
                className="search-input1"
              />
              <IoMdSearch
                onClick={this.onClickSearch}
                className="search-icon1"
              />
            </div>
            <Profile />
            <FiltersGroup
              onClickemp={this.employmentTypeList}
              onClicksalary={this.salaryRangeList}
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
            />
          </div>
          <div className="jobs-right-cont">
            <div className="search-input-cont2">
              <input
                onChange={this.onChangeSearch2}
                type="text"
                className="search-input2"
              />
              <IoMdSearch
                onClick={this.onClickSearch}
                className="search-icon2"
              />
            </div>
            {searchResults.length > 0
              ? this.renderJobs(searchResults)
              : this.renderNotFoundJobs()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
