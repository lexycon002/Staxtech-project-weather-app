const NoResultOption = () => {
  return (
    <div className="no-result-option">
        <img src="./assets/icons/no-result.svg" alt="No result found" className="icon"/>
        <h2>Oops!! Something went wrong</h2>
        <p className="error-message">We&apos;re unable to retrieve the weather details. Please make sure you&apos;ve enter a valid city or retry later</p>
    </div>
  )
}

export default NoResultOption