import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const APIButton = (props) => {
  return (
    <Button variant="primary" onClick={props.onClick}>
        {props.text}
    </Button>
  )
}

export default APIButton

APIButton.defaultProps = {
    text: 'GO'
}
  
// Prop types make things more robust
APIButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }