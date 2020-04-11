import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPostsLimit } from '../../actions/post';
import FeatItem from './FeatItem';
import { getCategories } from '../../actions/category';
import { Link } from 'react-router-dom';

const RecentPosts = ({ getPostsLimit, post: { posts, loading } }) => {
  useEffect(() => {
    getPostsLimit();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='mid'>
        <div className='recent-posts'>
          {posts.map((post) => (
            <FeatItem key={post._id} post={post} />
          ))}
        </div>
        <div>
          <Link to={'/posts'}>
            <button className='btn-big btn-primary'>View All</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

RecentPosts.propTypes = {
  getPostsLimit: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  category: state.category,
});

export default connect(mapStateToProps, { getPostsLimit, getCategories })(
  RecentPosts
);
