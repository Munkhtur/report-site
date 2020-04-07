import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Categories from '../posts/Categories';
import PostsTitles from '../posts/PostsTitles';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/category';
import Spinner from '../layout/Spinner';
import CategoryItem from '../posts/CategoryItem';
import { Link } from 'react-router-dom';

const Dashboard = ({ auth: { user } }) => {
  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i>Welcome {user && user.name}
        </p>

        <div className='dash-grid'>
          <div className='dash-posts  p-1'>
            <div className='dash-buttons'>
              <Link to='/create-post' className='btn btn-dark'>
                <i className='fa fa-sticky-note text-primary'></i> Create post
              </Link>
            </div>
            <PostsTitles />
          </div>
          <div className='dash-cat'>
            <Categories />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Dashboard);
