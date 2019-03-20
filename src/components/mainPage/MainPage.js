import React from 'react'
import {BrowserRouter, Switch, Redirect, Route, withRouter} from 'react-router-dom'
import firebase from 'firebase'
import {MuiThemeProvider} from '@material-ui/core/styles'
import theme from 'src/config/CustomStyle'
import HomePage from '../homepage'
import LoginWrapper from '../loginWrapper'
import {fire} from 'src/config/Fire'
import NewEventWrapper from '../newEventWrapper'

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: false,
      userId: '',
      userInfo: {}
    }
    this.authListener = this.authListener.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isLogged: true,
          userId: user.uid
        })
        this.getUserInfo(user.uid)
      //  this.props.history.push('/login')
      }
    })
  }

  logoutUser() {
    fire.auth().signOut()
    .then(() => {
      this.setState({
        isLogged: false,
        userId: '',
        userInfo: {}
      })
      this.props.history.push('/login')
    })
  }

  getUserInfo(userId) {
    firebase.database()
      .ref(`users/${userId}`)
      .once('value')
      .then(snapshot => {
        let data = snapshot.val()
        // console.log('SNaphot Value on Register ---> ', data)
        if (snapshot.exists()) {
          let userInfo = {imageUrl: data.imageUrl, name: data.name}
          this.setState({
            userInfo
          })
          console.log('Data ----> ', snapshot.val())
        }
      })
  }

  render() {
    let {userInfo, userId} = this.state
    return(
      <MuiThemeProvider theme={theme}>
        <div className="MainPage">
          <Switch>
              <Route path="/home" render={props => (<NewEventWrapper userInfo={userInfo} userId={userId} onLogout={this.logoutUser}/>)} />
              <Route path="/login" render={props => (<LoginWrapper />)} />
              <Redirect to="/home" />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(MainPage)
