import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost, getPost } from '../../../actions/post';
import ReactQuill from 'react-quill';
import { QuillModules, QuillFormats } from './helpers/quill';
import '../../../../node_modules/react-quill/dist/quill.snow.css';

const CreatePost = ({
  category: { categories },
  post: { post },
  createPost,
  router,
  history,
}) => {
  const [values, setValues] = useState({
    title: '',
    text: '',
    formData: new FormData(),
    categories: [],
  });

  const { title, formData } = values;
  const [checked] = useState([]);
  const [body, setBody] = useState('dskjlfljks');

  const onSubmit = (e) => {
    e.preventDefault();
    createPost(formData, history);
    setValues({ title: '', text: '', formData: '', categories: [] });
  };
  const onChange = (e) => {
    formData.set(e.target.name, e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    formData.set('image', e.target.files[0]);
  };
  const handleChange = (e) => {
    setBody(e);
    formData.set('text', e);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const handleToggle = (c) => () => {
    const clickedCategory = checked.indexOf(c);
    console.log(clickedCategory);
    if (clickedCategory === -1) {
      checked.push(c);
    } else {
      checked.splice(clickedCategory, 1);
    }

    console.log(checked, 'checked');
    formData.set('categories', checked);
    setValues({ ...values, formData, categories: checked });
  };

  // console.log(formData.categories);

  return (
    <Fragment>
      <div className='container post-form-grid'>
        <form className='form' onSubmit={onSubmit}>
          <h1>Create post</h1>
          <div className='form-group'>
            <input
              type='text'
              value={title}
              placeholder='Title'
              name='title'
              onChange={onChange}
            />
          </div>
          {/* onChange={e => onChange(e)} */}
          <div className='form-group'>
            <ReactQuill
              modules={QuillModules}
              formats={QuillFormats}
              value={body}
              name='text'
              onChange={handleChange}
              placeholder='write'
            />
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go back
          </Link>
        </form>
        <div>
          <div>
            <label className='btn'>
              Upload Image
              <input
                name='image'
                type='file'
                accept='image/*'
                onChange={handleImage}
                hidden
              />
            </label>
          </div>
          <div>
            <h1>Categories</h1>
            <div className='choose-cat'>
              <ul>
                {categories &&
                  categories.map((category) => (
                    <li key={category._id}>
                      <label className=''>
                        <input
                          type='checkbox'
                          className='mr-2'
                          value={category._id}
                          onChange={handleToggle(category._id)}
                        />
                        {category.name}
                      </label>{' '}
                      {/* <p>{category._id}</p> */}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CreatePost.propTypes = {
  category: PropTypes.array.isRequired,
  createPost: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
  isAuthenticated: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { createPost, getPost })(
  withRouter(CreatePost)
);
