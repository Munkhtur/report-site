import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const NoMatch = ({}) => {
  return (
    <Fragment>
      <div className='mid'>
        <h1 className='x-large'>Page Not Found | 404 error</h1>
      </div>
    </Fragment>
  );
};

NoMatch.propTypes = {
  getPostsLimit: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default connect(null, {})(NoMatch);
