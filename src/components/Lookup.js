import APIButton from './APIButton'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import PropTypes from 'prop-types';

const Lookup = ({userName, updateUserName, fetchUser}) => {
  return ( 
    <div className="d-flex flex-row mb-3 justify-content-center">
        <div className="p-2">
            <InputGroup className="mb-3" style={{width:'18em'}}>
                <InputGroup.Text id="basic-addon3">
                github.com/
                </InputGroup.Text>
                <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder={userName} onChange={updateUserName}/>
            </InputGroup>
        </div>
        <div className="p-2">
            <APIButton onClick={fetchUser}/>
        </div>
    </div>    
  )
}

Lookup.defaultProps = {
  userName : ''
}

Lookup.propTypes = {
  userName: PropTypes.string,
  updateUserName : PropTypes.func,
  fetchUser : PropTypes.func
}

export default Lookup