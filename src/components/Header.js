import PropTypes from 'prop-types';

export const Header = ({title}) => {
    return ( 
      <div className="row">
        <h4>{title}</h4>
      </div>      
     );
}

Header.defaultProps = {
  title: 'Github profiler'
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;