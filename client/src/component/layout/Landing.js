import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import RecentPosts from '../posts/RecentPosts';
import CategoriesCards from '../posts/CategoriesCards';

const Landing = () => {
  return (
    <Fragment>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>The Report</h1>
            <p className='lead'></p>
            <div className='buttons'></div>
          </div>
        </div>
      </section>

      <div>
        <RecentPosts />
      </div>

      <div className='cat-cards'>
        <CategoriesCards />
      </div>
    </Fragment>
  );
};

export default Landing;
