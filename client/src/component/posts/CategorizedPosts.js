import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts, getPostByCat } from '../../actions/post';
import PostItem from './PostItem';
import { getCategories, getCategory } from '../../actions/category';
import { Link } from 'react-router-dom';

const CategorizedPosts = ({
  match,
  getCategory,
  getCategories,
  getPosts,
  getPostByCat,
  post: { posts, loading },
  category: { category },
}) => {
  useEffect(() => {
    //console.log(match.params.id);
    getCategory(match.params.id);
    getPostByCat(match.params.id);
  }, [getPostByCat, getCategory, match.params.id]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <Link to='/posts' className='btn'>
          Back to posts
        </Link>
        <div class=''>
          <h1 class='large text-primary'>{category.name}</h1>
        </div>

        <div className='posts'>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

CategorizedPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  getPostByCat: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  category: state.category,
});

export default connect(mapStateToProps, {
  getPosts,
  getCategories,
  getPostByCat,
  getCategory,
})(CategorizedPosts);
