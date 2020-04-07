import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const CategoryItemToggle = ({ category: { _id, name, date, slug } }) => (
  <Fragment>
    <p>{name}</p>
  </Fragment>
);

CategoryItemToggle.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

// const mapStateToProps =state =>({
//     auth: state.auth
// })

export default connect(null, {})(CategoryItemToggle);
