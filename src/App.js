import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import { setCurrentUser } from './redux/user/user.actions';

import {auth, createUserProfileDocumentation } from './firebase/firebase.utils';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    //store user data in our application page in state.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) { //if userAuth != null
        const userRef = await createUserProfileDocumentation(userAuth); 
        
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id, //get user id
              ...snapShot.data() // get user data: email name...
            }
            }); 
        });
    } else {
      setCurrentUser(userAuth); //userAuth = null
    }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' 
                 render={() => this.props.currentUser ? 
                 (<Redirect to='/' />)
                 : (<SignInAndSignUpPage />)
                 }/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
}) 

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
                      mapStateToProps,
                      mapDispatchToProps
                      )(App);
