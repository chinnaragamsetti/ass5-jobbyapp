import {Component} from 'react'
import './index.css'
import Header from '../Header'

class Home extends Component {
  onFindJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div className="home-main-cont">
        <Header />
        <div className="home-sub-cont">
          <div className="text-cont">
            <h1 className="home-head">Find The Job That Fits Your Life</h1>
            <p className="home-para">
              Millions of people are searching for jobs,salary
              information,company reviews.Find the job that fits your abilities
              and potential
            </p>
            <button
              type="button"
              onClick={this.onFindJobs}
              className="find-jobs"
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
