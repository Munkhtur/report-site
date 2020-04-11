import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import renderHtml from 'react-render-html';

const PostItem = ({
  post: { _id, title, excerpt, date, categories, slug },
}) => {
  return (
    <div className='post'>
      {/* <img className='' src={exampleImage} alt='title' />
      style ={{ maxHeight: 'auto', width: '100%' }} */}
      <div className='card-image'>
        <Link to={`/posts/${slug}`}>
          {' '}
          <img
            className=''
            style={{ maxHeight: 'auto', width: '100%' }}
            src={`/api/posts/image/${slug}`}
            alt={title}
          />
        </Link>
      </div>
      <div>
        <Link to={`/posts/${slug}`}>
          {' '}
          <h2>{title}</h2>
        </Link>
        <p className='post-date'>
          <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        <div className='my-1'>{renderHtml(excerpt)}</div>
        <div>
          <Link to={`/posts/${slug}`}>Read more</Link>
          {/* <a href={`/posts/${slug}`}> Read more</a> */}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null, {})(PostItem);
