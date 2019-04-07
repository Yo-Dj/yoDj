import React from 'react'
import {BrowserRouter, Switch, Redirect, Route, withRouter} from 'react-router-dom'
import firebase from 'firebase'
import {MuiThemeProvider} from '@material-ui/core/styles'
import theme from 'src/config/CustomStyle'
import HomePage from '../homepage'
import LoginWrapper from '../loginWrapper'
import {fire} from 'src/config/Fire'
import NewEventWrapper from '../newEventWrapper'
import AcceptWrapper from '../acceptWrapper'
import EventView from '../eventView'

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: false,
      userId: '',
      userInfo: {},
      event: {},
      isActive: false
    }
    this.authListener = this.authListener.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.finishEvent = this.finishEvent.bind(this)
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        if (this.state.userID !== '') {
          this.setState({
            isLogged: true,
            userId: user.uid
          })
        }
        this.getUserInfo(user.uid)
      }
      else {
        this.logoutUser()
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
    let uid = this.state.userId === '' ? userId : this.state.userId
    firebase.database()
      .ref(`users/${uid}`)
      .on('value',snapshot => {
        let data = snapshot.val()
        if (data) {
          let userInfo = {imageUrl: data.imageUrl, name: data.name}
          let isActive = false
          let event = data.event ? data.event : {}
          let wholeDay = new Date(event.startDate).getTime() + (24 * 60 * 60 * 1000)
          let isDayOld = new Date().getTime() >= wholeDay
          if (isDayOld) {
            firebase.database().ref(`users/${uid}/event`).remove()
            event = {}
          }
          if (Object.keys(event).length === 0 && this.props.location.pathname === '/event') {
            this.props.history.push('/home')
          }
          if (Object.keys(event).length !==0 ) {
            isActive = true
          }
          this.setState({
            userInfo,
            event,
            isActive
          })
        } else {
          this.props.history.push('/login')
        }
      })
  }

  finishEvent() {
    let {userId} = this.state
    firebase.database().ref(`users/${userId}/event`).remove()
    this.props.history.push('/home')
  }

  render() {
    let {userInfo, userId, event} = this.state
    return(
      <MuiThemeProvider theme={theme}>
        <div className="MainPage">
          <Switch>
              <Route path="/new-event" render={props => (<NewEventWrapper userInfo={userInfo} userId={userId} onLogout={this.logoutUser}/>)} />
              <Route path="/event" render={props => (<EventView userInfo={userInfo} userId={userId} event={event} onFinish={this.finishEvent}  onLogout={this.logoutUser} />)}/>
              <Route path="/home" render={props => (<HomePage userInfo={userInfo} userId={userId} event={event} onLogout={this.logoutUser}/>)} />
              <Route path='/accept-request' render={props => (<AcceptWrapper userInfo={userInfo} isActive={this.state.isActive} onLogout={this.logoutUser}/>)} />
              <Route path="/login" render={props => (<LoginWrapper />)} />
              <Redirect to="/home" />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(MainPage)
