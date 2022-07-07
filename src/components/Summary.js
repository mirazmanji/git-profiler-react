import React from 'react'

const Summary = ({summaryText}) => {
  return (
    <div className="card">
      AI Summarized Readme:<br/>
      {summaryText}
    </div>
  )
}

export default Summary