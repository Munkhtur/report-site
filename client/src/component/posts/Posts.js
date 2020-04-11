import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts, getPostsLimit } from '../../actions/post';
import PostItem from './PostItem';
import { getCategories } from '../../actions/category';
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react';

const Posts = ({
  getCategories,
  getPostsLimit,
  getPosts,
  post: { posts, loading, size },
  category: { categories },
  history,
}) => {
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [loadedPosts, setLoadedPosts] = useState([]);

  useEffect(() => {
    console.log('useeffect');
    getPostsLimit(limit, skip);
    getCategories();
  }, [getCategories, getPostsLimit]);

  const loadMore = () => {
    let toSkip = skip + limit;
    getPostsLimit(limit, toSkip);
    setLoadedPosts([...loadedPosts, ...posts]);
    setSkip(toSkip);
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='btn'>
          Load More
        </button>
      )
    );
  };
  const showAllPosts = () => {
    return posts.map((post) => <PostItem key={post._id} post={post} />);
  };

  const showLoadedPosts = () => {
    return loadedPosts.map((post) => <PostItem key={post._id} post={post} />);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className=''>
        <div className='posts-top'>
          <h1 className='x-large '>Some explanation text</h1>
        </div>
        <div className='container posts-grid'>
          <div className='posts-categories'>
            <ul>
              {categories &&
                categories.map((c) => (
                  <li className='cat-menu' key={c._id}>
                    <Link to={`/posts/category/${c._id}`}>{c.name}</Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className='posts'>
            {showLoadedPosts()}
            {showAllPosts()}
            {loadMoreButton()}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  getPostsLimit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  category: state.category,
});

export default connect(mapStateToProps, {
  getPosts,
  getCategories,
  getPostsLimit,
})(withRouter(Posts));
