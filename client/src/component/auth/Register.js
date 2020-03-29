import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'; // to connect this component with the reduc action
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password dont match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Register</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign in to your account
      </p>
      <form onSubmit={e => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='text'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            placeholder='Name'
            required
          />
        </div>
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
        <div className='form-group'>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
            placeholder='Confirm Password'
            minlength='6'
            required
          />
        </div>
        <input type='submit' value='Signup' className='btn btn-primary' />
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
