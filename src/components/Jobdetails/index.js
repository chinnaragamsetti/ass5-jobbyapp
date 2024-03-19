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
  } = eachDetails

  return (
    <li className="eachList">
      <div className="top-cont">
        <img src={companyLogoUrl} alt="company-logo" className="company-logo" />
        <div className="company-name-cont">
          <h1 className="company-name">{title}</h1>
          <div className="star-cont">
            <img src="" alt="star" className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="bottom-cont">
        <div className="bottom-left-cont">
          <div className="location-cont">
            <img src="" alt="location" className="location-logo" />
            <p className="location">{location}</p>
          </div>
          <div className="job-type-cont">
            <img src="" alt="job-type" className="job-type-logo" />
            <p className="job-type">{employmentType}</p>
          </div>
        </div>
        <p className="package">{packagePerAnnum}</p>
      </div>
      <hr className="hr-line" />
      <p className="description">Description</p>
      <p className="description">{jobDescription}</p>
    </li>
  )
}

export default Jobdetails
