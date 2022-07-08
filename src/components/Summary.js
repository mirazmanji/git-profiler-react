import React from 'react'
import PropTypes from 'prop-types';

const Summary = ({repos}) => {
  repos = repos.filter((repo) => {
    return "value" in repo
  })

  repos = repos.sort((a, b) => {
    if (a.value.repoName < b.value.repoName) {
      return -1
    } else if (a.value.repoName > b.value.repoName) {
      return 1
    } else {
      return 0
    }
  })

  return (
      <>
      {repos.map((item, index) => {
        const readMeCaption = "AI analyzed summary of READ.ME on Branch: "

        return (
          <div className="card col-lg-* mx-2 mb-3" key={`card_summary_container + ${index}`}>
            <h3 className="card-title" key={`card_title + ${index}`}>{item.value.repoName}</h3>
            <div className="card-header">
              <p className="card-text" key={`card_text_readme + ${index}`}>
                {readMeCaption}{item.value.branch}
              </p>
            </div>  
            <div className="card-body">
              <p className="card-text" key={`card_text_summary + ${index}`}>
                {item.value.summary} 
              </p>
            </div>
          </div>
        )
      })}
      </>
  )
}

Summary.defaultProps = {
  repos: []
}

Summary.propTypes = {
  repos: PropTypes.array
}

export default Summary