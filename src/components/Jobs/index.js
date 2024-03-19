import {Component} from 'react'
import Cookies from 'js-cookie'

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

class Jobs extends Component {
  state = {
    employment: employmentTypesList[0].label,
    salaryRange: salaryRangesList[0].label,
    searchInput: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {employment, salaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      header: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
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
      this.setState({jobsList: formattedData})
    }
  }

  onChangeSearch1 = data => {
    this.setState({searchInput: data})
  }

  onChangeSearch2 = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  employmentTypesList = Id => {
    this.setState({employment: Id})
  }

  salaryRangesList = Id => {
    this.setState({salaryRange: Id})
  }

  render() {
    const {jobsList, searchInput} = this.state
    const searchResults = jobsList.filter(each =>
      each.title.includes(searchInput),
    )
    return (
      <div className="jobs-main-cont">
        <Header />
        <div className="jobs-sub-cont">
          <div className="jobs-left-cont">
            <Profile onChangeSearch1={this.onChangeSearch1} />
            <FiltersGroup
              onClickemp={employmentTypesList}
              onClicksalary={salaryRangesList}
            />
          </div>
          <div className="jobs-right-cont">
            <div className="search-input-cont2">
              <input
                onChange={this.onChangeSearch2}
                type="search"
                className="search-input2"
              />
              <IoMdSearch
                onClick={this.onClickSearch}
                className="search-icon2"
              />
            </div>
            <ul className="search-results-list">
              {searchResults.map(each => (
                <Jobdetails key={each.id} eachDetails={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
