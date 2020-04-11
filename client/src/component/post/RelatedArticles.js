import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRelatedPosts, getPost, getPosts } from '../../actions/post';
import PostItem from '../posts/PostItem';

const RelatedArticles = ({
  getRelatedPosts,
  getPost,
  post: { posts },
  slug,
  postFromPost,
}) => {
  // getRelatedPosts(post1);
  // const loadRelated = () => {
  //   // setRelated({ related, posts });
  //   console.log(posts);
  // };

  //console.log({ slug });

  useEffect(() => {
    // getPost(slug);
    getRelatedPosts({ postFromPost });
  }, [postFromPost]);

  return (
    <Fragment>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </Fragment>
  );
};
// const showRelatedBlogs = () => (
//   <div className='col-md-4'>
//     <article>
//       {posts.map((r, i) => {
//         <PostItem post={r} />;
//       })}
//     </article>
//   </div>
// );

RelatedArticles.propTypes = {
  post: PropTypes.object.isRequired,
  getRelatedPosts: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getRelatedPosts, getPosts, getPost })(
  RelatedArticles
);
