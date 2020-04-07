import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/category';
import Spinner from '../layout/Spinner';
import CategoryItem from './CategoryItem';
import { createCategory } from '../../actions/category';

const Categories = ({
  getCategories,
  createCategory,
  category: { categories, loading }
}) => {
  const [values, setValues] = useState({
    name: ''
  });
  const { name } = values;
  //console.log(values);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onChange = e => {
    setValues({ ...values, name: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createCategory(values);
    setValues({ name: '' });
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <a className=''>
        <i className='fa fa-flag text-primary'></i> Add category
      </a>
      <form className='form my-1' onSubmit={e => onSubmit(e)}>
        <input
          value={name}
          type='text'
          name='name'
          onChange={e => onChange(e)}
        />
        <button className='btn btn-primary'>Submit</button>
      </form>
      <h1>Categories</h1>
      {categories.map(category => (
        <CategoryItem key={category._id} category={category} />
      ))}
    </Fragment>
  );
};

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories, createCategory })(
  Categories
);
