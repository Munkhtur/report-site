import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import { getCategories } from '../../actions/category';
import { Link } from 'react-router-dom';

const Posts = ({
  getCategories,
  getPosts,
  post: { posts, loading },
  category: { categories },
}) => {
  useEffect(() => {
    getPosts();
    getCategories();
  }, [getCategories, getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='container posts-grid'>
        <div className='posts-top'>
          <h1 className='large text-primary'>Posts</h1>
        </div>

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
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </section>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  category: state.category,
});

export default connect(mapStateToProps, { getPosts, getCategories })(Posts);
