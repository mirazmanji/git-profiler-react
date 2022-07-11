import PropTypes from 'prop-types';
import Stars from "./Stars";

const Profile = ({stars, userPhoto, userName}) => {
  return (
    <div className="card">
        <img className="card-img-top" src={userPhoto} title={userName} />
        <div className="card-body">
            {stars ? (<p className="card-text">Stars: {stars}</p>) : null}
            {stars ? <Stars numStars={stars} /> : null}
        </div>
    </div>
        
  );
}

Profile.defaultProps = {
  stars: 0,
  userPhoto: null,
  userName: null
}

Profile.propTypes = {
  stars: PropTypes.number.isRequired,
  userPhoto: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
}

export default Profile