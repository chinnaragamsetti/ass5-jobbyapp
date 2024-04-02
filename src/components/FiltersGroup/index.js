import './index.css'

/* const employmentTypesList = [
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
*/

const FiltersGroup = props => {
  const {
    onClickemp,
    onClicksalary,
    salaryRangesList,
    employmentTypesList,
  } = props

  const onChangeEmployment = Id => {
    employmentTypesList.map(each => console.log(each.checked))
    onClickemp(Id)
  }

  const onChangeSalary = Id => {
    onClicksalary(Id)
  }
  return (
    <div className="filter-main-cont">
      <hr className="hr-line" />
      <p className="type">Type of Employment</p>
      <ul className="employment-list">
        {employmentTypesList.map(eachEmp => (
          <li key={eachEmp.employmentTypeId} className="each-list">
            <input
              type="checkbox"
              onClick={() => onChangeEmployment(eachEmp.employmentTypeId)}
              id={eachEmp.employmentTypeId}
            />
            <label htmlFor={eachEmp.employmentTypeId} className="emp-label">
              {eachEmp.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="hr-line" />
      <p className="type">Salary Range</p>
      <ul className="employment-list">
        {salaryRangesList.map(eachSalary => (
          <li key={eachSalary.salaryRangeId} className="each-list">
            <input
              onClick={() => onChangeSalary(eachSalary.salaryRangeId)}
              type="radio"
              id={eachSalary.salaryRangeId}
              className="check-input"
              name="range"
            />
            <label htmlFor={eachSalary.salaryRangeId} className="emp-label">
              {eachSalary.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup
