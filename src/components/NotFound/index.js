import './index.css'

const NotFound = () => (
  <div className="not-found-cont">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="not-found-text">
      We are sorry, the page ypu requested could not be found
    </p>
  </div>
)

export default NotFound
