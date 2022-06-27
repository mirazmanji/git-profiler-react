import React from 'react'
import { FaStar } from "react-icons/fa";
import PropTypes from 'prop-types';

const Stars = ({numStars}) => {
  let starArray = []
  for(var i = 0; i < numStars; i++){
      starArray[i] = {'index': i}
  }  
  return (  
    <>  
    {starArray.map((star) => (
        <FaStar key={star.index} color="gold"/>
    ))}
    </>
  )
}

Stars.defaultProps = {
    numStars: 0
}

Stars.propTypes = {
    numStars: PropTypes.number
}

export default Stars