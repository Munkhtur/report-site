import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';
import RelatedArticles from './RelatedArticles';
import renderHtml from 'react-render-html';
import background from '../../img/boat.jpg';

const Post = ({ getPost, post: { post, loading, posts }, match }) => {
  useEffect(() => {
    getPost(match.params.slug);
  }, [match.params.slug]);

  const image = `url(/api/posts/image/${post.slug})`;

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        class='post-header'
        style={{
          background: `${image} no-repeat center center/cover`,
        }}
      >
        <div className='title my-2'>
          <h1 className='large'>{post.title}</h1>
          <Moment className='date' format='D MMM YYYY'>
            {post.date}
          </Moment>
        </div>
      </div>
      <div className='container '>
        <Link to='/posts' className='btn bg-light'>
          Back to posts
        </Link>

        <div className=''>{renderHtml(post.text)}</div>
        <br />
        <hr />
      </div>

      <div className='container'>
        <h1 className='large'>Related Articles</h1>
        <RelatedArticles postFromPost={post} />
        <hr />
        {JSON.stringify(post)}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
