import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/category';
import Spinner from '../layout/Spinner';
import CategoryCard from './Categorycard';

const CategoriesCards = ({
  getCategories,
  category: { categories, loading },
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </Fragment>
  );
};

CategoriesCards.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { getCategories })(CategoriesCards);
