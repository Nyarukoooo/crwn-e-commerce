import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import {auth, createUserProfileDocumentation } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null //tell header when show signin / sign out
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    //store user data in our application page in state.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) { //if userAuth != null
        const userRef = await createUserProfileDocumentation(userAuth); 
        
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id, //get user id
              ...snapShot.data() // get user data: email name...
            }
          }, () => { //因为setState is async, 后面不能接function, 想要check的话需要用第二个argument
            console.log('1. check user state', this.state);
          }) 
        });
    } else {
      this.setState({currentUser: userAuth}) //userAuth = null
    }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
