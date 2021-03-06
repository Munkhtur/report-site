import { QuillModules, QuillFormats } from './helpers/quill';
import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../../../node_modules/react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePost, getPost, getPosts } from '../../../actions/post';
import { getCategories } from '../../../actions/category';
import ReactQuill from 'react-quill';

const UpdatePost = ({
  post: { post, loading },
  category: { categories },
  isAuthenticated,
  getPost,
  updatePost,
  history,
  getCategories,
  match,
}) => {
  const [temp, setTemp] = useState([]);
  const [checked, setChecked] = useState([]);
  const [text, setText] = useState('');
  const [values, setValues] = useState({
    title: '',
    image: '',
    categories: [],
    formData: new FormData(),
  });

  const { title, formData } = values;
  //console.log(formData.categories);

  useEffect(() => {
    getPost(match.params.slug);
    console.log(post.title);
    // setTemp(post.categories);
    setChecked(post.categories);
    setValues({ ...values, title: post.title });
    setText(post.text);
  }, [getPost, match.params.slug]);
  const onChange = (e) => {
    setValues({ ...values, formData, [e.target.name]: e.target.value });
    formData.set('title', e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updatePost(formData, match.params.slug, history);
  };

  const handleChange = (e) => {
    setText(e);
    formData.set('text', e);
  };

  const handleImage = (e) => {
    //setValues({ ...formData, image: e.target.files[0] });
    formData.set('image', e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleToggle = (c) => () => {
    // console.log(temp);
    //console.log(newArray);
    // setChecked(checked);
    //const all = [...checked];
    const clickedCategory = checked.findIndex((x) => x._id === c._id);
    console.log(clickedCategory, 'index of');
    //console.log(all, 'before push');
    if (clickedCategory === -1) {
      checked.push(c);
    } else {
      checked.splice(clickedCategory, 1);
    }
    console.log(checked, 'checked');
    let arr = [];
    arr = checked.map((x) => x._id);
    console.log(arr);
    setValues({ ...values, formData, categories: arr });
    formData.set('categories', arr);
  };

  const isChecked = (c) => {
    if (checked.findIndex((x) => x._id === c._id) > -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Fragment>
      <div className='container post-form-grid'>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <h1>Update post</h1>
          <div className='form-group'>
            <input
              value={title}
              type='text'
              placeholder='Title'
              name='title'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <ReactQuill
              modules={QuillModules}
              formats={QuillFormats}
              value={text || ''}
              placeholder='write'
              name='text'
              onChange={handleChange}
            />
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go back
          </Link>
          {/* {JSON.stringify(post)} */}
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
            {categories &&
              categories.map((category) => (
                <ul className='category-list'>
                  <li key={category._id}>
                    <input
                      type='checkbox'
                      checked={isChecked(category)}
                      name='categories'
                      value={category._id}
                      onChange={handleToggle(category)}
                    />
                    <label className=''>{category.name}</label>{' '}
                    {/* <p>{category._id}</p> */}
                  </li>
                </ul>
              ))}
          </div>
          <img
            className=''
            style={{ maxHeight: 'auto', width: '200px' }}
            src={`/api/posts/image/${post.slug}`}
            alt={title}
          />
        </div>
      </div>
    </Fragment>
  );
};

UpdatePost.propTypes = {
  category: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  category: state.category,
  isAuthenticated: state.auth,
  post: state.post,
  getPost: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { updatePost, getPost, getCategories })(
  withRouter(UpdatePost)
);
