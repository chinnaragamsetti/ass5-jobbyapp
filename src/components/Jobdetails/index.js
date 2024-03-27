import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {MdBusinessCenter} from 'react-icons/md'

import './index.css'

const Jobdetails = props => {
  const {eachDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachDetails

  return (
    <Link to={`/jobs/${id}`}>
      <li className="eachList">
        <div className="top-cont">
          <img
            src={companyLogoUrl}
            alt="company-logo"
            className="company-logo"
          />
          <div className="company-name-cont">
            <h1 className="company-name">{title}</h1>
            <div className="star-cont">
              <FaStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="bottom-cont">
          <div className="bottom-left-cont">
            <div className="location-cont">
              <IoLocationOutline className="location-logo" />
              <p className="location">{location}</p>
            </div>
            <div className="job-type-cont">
              <MdBusinessCenter className="job-type-logo" />
              <p className="job-type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <p className="title">Description</p>
        <p className="rating">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default Jobdetails
