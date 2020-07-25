import React from 'react';
import { observer } from 'mobx-react'
import userStore from './store/userStore';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';
import './App.css';

class App extends React.Component {

  async componentDidMount(){
    try {
      let res = await fetch('/isloggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        }
      });
      let result = await res.json();

      if(result && result.success) {
        userStore.loading = false;
        userStore.isloggedin = true;
        userStore.username =  result.username;
      }
      else {
        userStore.loading = false;
        userStore.isloggedin = false;
      }
    }
  catch(err){
    userStore.loading = false;
    userStore.isloggedin = false;

  }
}
async userLogout(){
  try {
    let res = await fetch('/logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type':'application/json'
      }
    });
    let result = await res.json();

    if(result && result.success) {
      userStore.isloggedin = false;
      userStore.username =  '';
    }
  }
catch(err){
  console.log(err)
}
}
  render(){
    if(userStore.loading){
      return (
        <div className="app">
          <div className="container">
            Loading, Please wait..
          </div>
        </div>
      );
    }
    else {
      if(userStore.isloggedin){
        return (
          <div className="app">
            <div className="container">
              Welcome {userStore.username}
              <SubmitButton 
                text={'LogOut'}
                disabled={false}
                onClick={ ()=>this.userLogout}
                />
            </div>
          </div>
        );
      }
      return (
        <div className="app">
          <div className="container">
            
            <LoginForm />
          </div>
        </div>
      )
      }
  }
}

export default observer( App );
