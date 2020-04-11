import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCategory } from '../../actions/category';

const CategoryCard = ({ category: { _id, name, date, slug } }) => (
  <Fragment>
    <Link to={`/posts/category/${_id}`}>
      <div className='category-card'>
        <p className=''>{name}</p>
      </div>
    </Link>
  </Fragment>
);

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired,
};

// const mapStateToProps =state =>({
//     auth: state.auth
// })

export default connect(null, {})(CategoryCard);
