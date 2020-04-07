import React, { useState, Fragment, Profiler, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost, getPost, addCategory } from '../../../actions/post';
import ReactQuill from 'react-quill';
import { QuillModules, QuillFormats } from './helpers/quill';
import '../../../../node_modules/react-quill/dist/quill.snow.css';

const CreatePost = ({
  category: { categories },
  post: { post },
  isAuthenticated,
  createPost,
  addCategory,
  getPost,
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

  const [formData, setFormData] = useState({
    title: '',
    text: blogFromLS(),
    image: '',
    categories: [],
  });

  const { title, text, image } = formData;
  const [checked, setChecked] = useState([]);
  const [body, setBody] = useState('');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createPost(formData, history);
    setFormData({ title: '', text: '', image: '', categories: [] });
    //addCategory(checked, post.slug);
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
    setFormData({ ...formData, image: e.target.files[0] });
    formData.append('image', e.target.image.files[0]);
    console.log(image);
  };
  const handleChange = (value) => {
    // console.log(e)
    setFormData({ ...formData, text: value });
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

    setFormData({ ...formData, categories: all });
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
              value={text}
              placeholder='write'
              onChange={handleChange}
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
  addCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
  isAuthenticated: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { createPost, getPost, addCategory })(
  withRouter(CreatePost)
);
