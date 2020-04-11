import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import RelatedArticles from './RelatedArticles';
import background from '../../img/boat.jpg';
import renderHtml from 'react-render-html';

const Post = ({ getPost, post: { post, loading, posts }, match }) => {
  useEffect(() => {
    getPost(match.params.slug);
  }, [getPost, match.params.slug]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        class='post-header'
        style={{
          background: `url(/api/posts/image/${post.slug}) no-repeat center center/cover`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className='title my-2'>
          <h1 className='x-large'>{post.title}</h1>
          <Moment className='date' format='D MMM YYYY'>
            {post.date}
          </Moment>
        </div>
      </div>
      <div className='container'>
        <div className=''>{renderHtml(post.text)}</div>
        <Link to='/posts' className='btn btn-dark bg-dark'>
          Back to posts
        </Link>
      </div>
      <div className='container'>
        <hr />
      </div>
      <div className='container'>
        <h1 className='lead'>Related Articles</h1>
        <RelatedArticles postFromPost={post} />
        <hr />
        {/* {JSON.stringify(post)} */}
        {background}
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
