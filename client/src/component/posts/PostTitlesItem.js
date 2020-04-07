import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';
import { setAlert } from '../../actions/alert';

const PostItem = ({
  deletePost,
  setAlert,
  post: { _id, title, excerpt, date, text, categories, image, slug },
}) => (
  <div className=''>
    <div className='post-title'>
      <div>
        <p className='lead'>{title}</p>
        <p className='post-date'>
          <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
      </div>
      <div className='buttons'>
        <button className='btn'>
          <Link to={`/update-post/${slug}`}>edit</Link>
        </button>

        <button onClick={(e) => deletePost(_id)} className='btn btn-danger'>
          delete
        </button>
      </div>
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

// const mapStateToProps =state =>({
//     auth: state.auth
// })

export default connect(null, { deletePost, setAlert })(PostItem);
