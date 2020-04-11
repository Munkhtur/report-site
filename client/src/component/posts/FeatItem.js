import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
const FeatItem = ({
  post: { _id, title, excerpt, date, categories, slug },
}) => {
  return (
    <div className='feat-card'>
      <div className='card-hover'>
        {/* <img className='' src={exampleImage} alt='title' />
      style ={{ maxHeight: 'auto', width: '100%' }} */}
        <div className='card-image'>
          <Link to={`/posts/${slug}`}>
            {' '}
            <img
              className=''
              // style={{ maxHeight: 'auto', width: '100%' }}
              src={`/api/posts/image/${slug}`}
              alt={title}
            />
          </Link>
        </div>
        <div>
          <p className='post-date'>
            <Moment format='DD/MM/YYYY'>{date}</Moment>
          </p>
          <Link to={`/posts/${slug}`}>
            {' '}
            <h1>{title}</h1>
          </Link>
        </div>
        {/* <div className='my-1'>{renderHtml(excerpt)}</div> */}
      </div>
    </div>
  );
};

FeatItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null, {})(FeatItem);
