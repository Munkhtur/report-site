import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Redirect, Link } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign in</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign in to your account
      </p>
      <form onSubmit={e => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            placeholder='email'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            placeholder='Password'
            minlength='6'
            required
          />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
