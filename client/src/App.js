import React, { Fragment, useEffect } from 'react';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//redux
import { Provider } from 'react-redux'; // gets the two seperate stuff together
import store from './store';
import { loaduser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './component/dashboard/Dashboard';
import PrivateRoute from './component/routing/PrivateRoute';
import Posts from './component/posts/Posts';
import CreatePost from './component/posts/post-form/CreatePost';
import UpdatePost from './component/posts/post-form/UpdatePost';
import Post from './component/post/Post';
import CategorizedPosts from './component/posts/CategorizedPosts';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loaduser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className='main-container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/posts' component={Posts} />
              <Route exact path='/posts/:slug' component={Post} />
              <Route
                exact
                path='/posts/category/:id'
                component={CategorizedPosts}
              />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-post' component={CreatePost} />
              <PrivateRoute
                exact
                path='/update-post/:slug'
                component={UpdatePost}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
