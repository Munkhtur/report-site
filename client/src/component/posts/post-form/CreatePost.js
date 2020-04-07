import React, { useState, Fragment, Profiler, useEffect } from 'react';
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
  isAuthenticated,
  createPost,
  getPost,
  router,
  history,
}) => {
  const blogFromLS = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };

  const [values, setValues] = useState({
    title: '',
    text: blogFromLS(),
    formData: '',
    categories: [],
  });

  const { title, text, formData } = values;
  const [checked, setChecked] = useState([]);
  const [body, setBody] = useState('');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, [router]);

  const onChange = (e) => {
    formData.set(e.target.name, e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createPost(formData, history);
    setValues({ title: '', text: '', formData: '', categories: [] });
    console.log(formData);
  };
  // const handleToggle = (id, e) => () => {
  //   let index;
  //   if (e.target.checked) {
  //     checked.push(id);
  //   } else {
  //     index = checked.indexOf(id);
  //     checked.splice(index, 1);
  //   }

  //   console.log(checked);
  // };
  const handleImage = (e) => {
    //setValues({ ...formData, image: e.target.files[0] });
    formData.set('image', e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handleChange = (value) => {
    setBody(value);
    // console.log(e)
    formData.set('text', value);
    // console.log(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(value));
    }
  };

  const handleToggle = (c) => () => {
    // const clickedCategory = e.target.checked;
    const all = [...checked];
    const clickedCategory = all.indexOf(c);
    console.log(clickedCategory);
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setChecked(all);
    console.log(checked, 'checked');
    console.log(all, 'all');
    formData.set('categories', all);
    //setValues({ ...values, formData, categories: all });
  };

  // console.log(formData.categories);

  return (
    <Fragment>
      <div className='container post-form-grid'>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <h1>Create post</h1>
          <div className='form-group'>
            <input
              value={title}
              onChange={(e) => onChange(e)}
              type='text'
              placeholder='Title'
              name='title'
            />
          </div>
          {/* onChange={e => onChange(e)} */}
          <div className='form-group'>
            <ReactQuill
              modules={QuillModules}
              formats={QuillFormats}
              value={body}
              name='text'
              placeholder='write'
              onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleImage(e)}
                type='file'
                accept='image/*'
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
                          onChange={handleToggle(category._id)}
                          type='checkbox'
                          className='mr-2'
                          value={category._id}
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
