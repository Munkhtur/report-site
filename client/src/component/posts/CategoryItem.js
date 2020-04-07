import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteCategory } from '../../actions/category';
import { deletePost } from '../../actions/post';

const CategoryItem = ({
  deleteCategory,
  category: { _id, name, date, slug },
}) => (
  <Fragment>
    <div className='cat-name'>
      <p className='lead'>{name}</p>
      <div className='buttons'>
        {/* <button className='btn btn-primary'>edit</button> */}
        <button className='btn btn-danger' onClick={(e) => deleteCategory(_id)}>
          delete
        </button>
      </div>
    </div>
  </Fragment>
);

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

// const mapStateToProps =state =>({
//     auth: state.auth
// })

export default connect(null, { deleteCategory })(CategoryItem);
