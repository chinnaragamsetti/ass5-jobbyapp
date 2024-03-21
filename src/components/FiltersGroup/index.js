import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onClickemp,
    onClicksalary,
  } = props

  const onChangeEmployment = Id => {
    onClickemp(Id)
  }

  const onChangeSalary = Id => {
    onClicksalary(Id)
  }
  return (
    <div className="filter-main-cont">
      <hr className="hr-line" />
      <ul className="employment-list">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="each-list">
            <input
              type="checkbox"
              onClick={onChangeEmployment(each.employmentTypeId)}
              id={each.employmentTypeId}
            />
            <label htmlFor={each.label} className="emp-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>

      <hr className="hr-line" />
      <ul className="employment-list">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="each-list">
            <input
              onClick={onChangeSalary(each.salaryRangeId)}
              type="checkbox"
              id={each.salaryRangeId}
              className="check-input"
            />
            <label htmlFor={each.label} className="emp-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup
