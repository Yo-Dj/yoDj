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
import FeedPage from '../feedPage'
import FanHomepage from '../fanHomepage'

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: false,
      userId: '',
      userInfo: {},
      event: {},
      isActive: false,
      newRequest: {},
      requests: []
    }
    this.authListener = this.authListener.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.finishEvent = this.finishEvent.bind(this)
    this.goBackHome = this.goBackHome.bind(this)
    this.addRequestToFirebase = this.addRequestToFirebase.bind(this)
  }

  componentDidMount() {
    this.authListener()
  }

  componentDidUpdate(prevProps) {
    let {location} = this.props
      if (prevProps.location.state && location.pathname ==='/new-event' && Object.keys(this.state.newRequest).length === 0) {
        this.props.history.push('/home')
        this.setState({
          newRequest: {}
        })
        return
      }

      if (location.pathname ==='/accept-request' && location.state && (!this.state.newRequest.id || (this.state.newRequest.id !== location.state.request.id))) {
        this.setState({
          newRequest: location.state.request
        })
        return
      }

      if ((prevProps.location.state  || !prevProps.location.state) && location.pathname ==='/feed' &&  this.state.requests.length === 0 && (!location.state || (location.state && location.state.requests === 0))) {
        this.props.history.push('/home')
        this.setState({
          requests: []
        })
        return
      }

      if (this.state.requests.length === 0 && location.pathname === '/feed' && location.state && location.state.requests) {
        this.setState({
          requests: location.state.requests
        })
        return
      }

      if (this.state.requests.length !== 0 && location.pathname === '/feed' && location.state && location.state.deletingRequest) {
        let requests = this.state.requests.filter(request => request.id !== location.state.deletingRequest.id)
        this.setState({
          requests
        }, () => {
          this.props.history.push('/home')
        })
        return
      }
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
          if (data.userType && data.userType === 'Fan') {
            let userInfo = {username: data.username, type: 'fan', phone: data.phone, imageUrl: data.imageUrl}
            this.setState({
              userInfo
            })
            return
          }
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

  addRequestToFirebase(request) {
    let {userId} = this.state
    let ref = firebase.database().ref(`users/${userId}/event/completed`)
    ref.push(request)
  }

  finishEvent() {
    let {userId} = this.state
    let ref = firebase.database().ref(`users/${userId}/event`)
    ref.on('value', snapshot => {
      let eventData = snapshot.val()
      firebase.database().ref(`events/${userId}`).push(eventData)
      ref.remove()
    })
    this.props.history.push('/home')
  }

  goBackHome() {
    this.props.history.push('/home')
  }

  render() {
    let {userInfo, userId, event, newRequest, requests, isActive} = this.state
    return(
      <MuiThemeProvider theme={theme}>
        <div className="MainPage">
          <Switch>
              <Route path="/new-event" render={props => (<NewEventWrapper userInfo={userInfo} userId={userId} onLogout={this.logoutUser}/>)} />
              <Route path="/event" render={props => (<EventView userInfo={userInfo} userId={userId} event={event} onFinish={this.finishEvent}  onLogout={this.logoutUser} />)}/>
              <Route path="/home" render={props => (<HomePage userInfo={userInfo} userId={userId} event={event} onLogout={this.logoutUser}/>)} />
              <Route path="/fan-home" render={props =>
                (
                  <FanHomepage
                  userInfo={userInfo}
                  userId={userId}
                  event={event}
                  onLogout={this.logoutUser}/>
                )}/>
              <Route path="/feed" render={props =>
                (<FeedPage
                  userInfo={userInfo}
                  isActive={this.state.isActive}
                  requests={requests}
                  onGoBack={this.goBackHome}
                  />)} />
              <Route path='/accept-request' render={props =>
                  (<AcceptWrapper
                    userInfo={userInfo}
                    isActive={isActive}
                    onLogout={this.logoutUser}
                    onGoBack={this.goBackHome}
                    request={newRequest}
                    onAddRequest={this.addRequestToFirebase}
                  />)} />
              <Route path="/login" render={props => (<LoginWrapper />)} />
              <Redirect to="/home" />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(MainPage)
