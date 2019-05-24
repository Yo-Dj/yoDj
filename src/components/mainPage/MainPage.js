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
import SelectDj from '../selectDJ'
import FanEvent from '../fanEvent'
import TippingPage from '../tippingPage'

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
      requests: [],
      allDjs: [],
      fanEvent: {},
      joined: false,
      activities: [],
      fans: [],
      acceptedSongs: []
    }
    this.authListener = this.authListener.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.finishEvent = this.finishEvent.bind(this)
    this.goBackHome = this.goBackHome.bind(this)
    this.addRequestToFirebase = this.addRequestToFirebase.bind(this)
    this.getDjs = this.getDjs.bind(this)
    this.goFanPage = this.goFanPage.bind(this)
    this.addFanEvent = this.addFanEvent.bind(this)
    this.joinEvent = this.joinEvent.bind(this)
    this.getEvent = this.getEvent.bind(this)
    this.leaveEvent = this.leaveEvent.bind(this)
    this.submitSongRequest = this.submitSongRequest.bind(this)
    this.getDjEvent = this.getDjEvent.bind(this)
    this.updateActivities = this.updateActivities.bind(this)
    this.updateRequests = this.updateRequests.bind(this)
    this.getFans = this.getFans.bind(this)
    this.acceptingSong = this.acceptingSong.bind(this)
    this.updateAcceptedSongs = this.updateAcceptedSongs.bind(this)
  }

  componentDidMount() {
    this.authListener()
  }

  componentDidUpdate(prevProps, prevState) {
    let {location} = this.props
      if (location.pathname === '/event' &&  Object.keys(this.state.event).length === 0)
      {
        this.props.history.push('/home')
        return
      }

      if (location.pathname !== '/fan-tip' && this.state.joined && Object.keys(this.state.fanEvent).length !== 0 && this.state.allDjs !== 0) {
        this.props.history.push('/fan-tip')
        return
      }

      if (Object.keys(this.state.fanEvent).length === 0 && location.pathname === '/fan-event') {
        this.props.history.push('/fan-home')
        return
      }

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

      if (location.pathname === '/accept-request' && !location.state && (!this.state.newRequest.id && this.state.acceptedSongs.length > 0)) {
        this.setState({
          newRequest: {...this.state.acceptedSongs[0], accepted: true}
        })
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

      if (Object.keys(this.state.fanEvent).length === 0 && location.pathname === '/fan-tip') {
        this.props.history.push('/fan-home')
        this.setState({
          joined: false
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
    console.log('Logout')
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

  getDjs() {
    firebase.database()
      .ref('users')
      .on('value', snapshot => {
        let data = snapshot.val()
        if (data) {
          let allDjs = Object.values(data).reduce((acc, user) => {
            if (!user.userType && user.userType !== 'Fan') {
              acc.push(user)
            }
            return acc
          },[])
          this.setState({
            allDjs
          })
        }
      })
  }


  getFans() {
    firebase.database()
    .ref('users')
    .on('value', snapshot => {
      let data = snapshot.val()
      if (data) {
        let fans = Object.values(data).reduce((acc, user) => {
          if (user.userType && user.userType === 'Fan') {
            acc[user.userId] = user
          }
          return acc
        },{})
        console.log('Data ---> ')
        this.setState({
          fans
        })
      }
    })
  }

 getEvent(venue) {
   firebase.database().ref(`/venues/${venue}`).on('value', snapshot => {
     if (snapshot.val()) {
       this.setState({
          fanEvent: {...snapshot.val(), fanId: venue}
       })
     }
   })

  }

  updateActivities(joined = {}) {
    let {activities, requests, fans} = this.state
    let joinedArr = Object.keys(joined)
    let lastJoiner = joinedArr[joinedArr.length - 1]
    let requestsArr = requests.map(request => request.id)
    if (activities.length === 0 && Object.keys(fans).length !== 0) {
      joinedArr.forEach(user => {
        if (fans[user]) {
          activities.push(user)
          requests.push({name: fans[user].username, songRequest: false, id: user, message: 'joined your event', img: fans[user].imageUrl})
        }
      })
      console.log('Get All Joined Users')
    }

    else if (activities.length > joinedArr.length) {
      activities = activities.filter(user => {
        if (joinedArr.indexOf(user) === -1 ) {
          requests.push({name: fans[user].username, songRequest: false, id: user, message: 'left your event', img: fans[user].imageUrl})
        }
        else {
          return user
        }
      })
    }

   else if (activities[activities.length - 1] !== lastJoiner && fans[lastJoiner]) {
      activities.push(lastJoiner)
      requests.push({name: fans[lastJoiner].username, songRequest: false, id: lastJoiner, message: 'joined your event', img: fans[lastJoiner].imageUrl})
    }
    this.setState({
      activities, requests
    }, () => {
      console.log('ACtivities ---> ', this.state.requests)
    })
  }

  updateRequests(requested) {
    let {requests, fans} = this.state
    let requestIds = requests.map(request => request.id)
    let requestedArr = Object.keys(requested)
    let lastAdded = requestedArr[requestedArr.length - 1]
    let requestedUser = fans[requested[lastAdded].user]
    if (requestIds.indexOf(lastAdded) === -1) {
      requests.push({name: requestedUser.username, songRequest: true, id: lastAdded, song: requested[lastAdded].music, tip: requested[lastAdded].tipAmount, time: requested[lastAdded].time, img: requestedUser.imageUrl})
    }
    this.setState({
      requests
    }, () => {
      console.log('Set REquests ---> ', this.state.requests)
    })
  }

  updateAcceptedSongs(updated) {

  }

  getDjEvent(venue, uid) {
    firebase.database().ref(`/venues/${venue}`).on('value', snapshot => {
      let event = snapshot.val()
      if (event) {
        event.eventId = venue
        let isActive = false
        let wholeDay = new Date(event.startDate).getTime() +(24 * 60 * 60 * 1000)
        let isDayOld = new Date().getTime() >= wholeDay
        if (isDayOld) {
          let joiners = event.joiners ? Object.keys(event.joiners) : []
          this.setState({
            event,
            activities: joiners
          }, () => {
            this.finishEvent()
          })
          return
        }
        if (Object.keys(event).length === 0 && this.props.location.pathname === '/event') {
          this.props.history.push('/home')
        }
        if (Object.keys(event).length !==0 ) {
          isActive = true
        }

        if (event.joiners || this.state.activities.length > 0) {
          let joiners = event.joiners ? event.joiners : {}
          this.updateActivities(joiners)
        }

        if (event.requests) {
          this.updateRequests(event.requests)
        }

        this.setState({
          event,
          isActive
        })
      }
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
            let userInfo = {username: data.username, type: 'fan', phone: data.phone, imageUrl: data.imageUrl, venue: data.venue}
            let joined = data.venue ? true : false
            let fanEvent = {}
            this.setState({
              userInfo,
              joined
            }, () => {
              this.getDjs()
              if (data.venue) {
                this.getEvent(data.venue.id)
              }
            })
            return
          }
          let userInfo = {imageUrl: data.imageUrl, name: data.name}
          let isActive = false
          let {event} = data
          this.setState({
            userInfo
          }, () => {
            this.getFans()
            if (event && event.requestId) {
              this.getDjEvent(event.requestId, uid)
            }
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
    let {userId, event, activities} = this.state
    firebase.database().ref(`users/${userId}/event`).remove()
    firebase.database().ref(`venues/${event.eventId}`).remove()
    activities.forEach(user => {
      firebase.database().ref(`users/${user}/venue`).once('value').then(snapshot => {
      let completedEvent = snapshot.val()
      let userRequests = completedEvent.requests ? completedEvent.requests : {requests: 0}
      firebase.database().ref(`users/${user}/completed/${completedEvent.id}`).set(userRequests)
      firebase.database().ref(`users/${user}/venue`).remove()
      })
    })
    this.setState({
      isActive: false,
      event: {}
    }, () => {
      this.props.history.push('/home')
    })
  }

  goBackHome() {
    this.props.history.push('/home')
  }

  goFanPage() {
    this.props.history.push('/fan-home')
  }

  addFanEvent(fanEvent) {
    this.setState({
      fanEvent
    }, () => {
      this.props.history.push('/fan-event')
    })
  }

  acceptingSong(request) {
    let {event, acceptedSongs, requests, newRequest} = this.state
    firebase.database().ref(`venues/${event.eventId}/pending/${request.id}`).set(request, error => {
      if (!error) {
        let index = requests.map(req => req.requestId).indexOf(request.id)
        requests.splice(index, 1)
        acceptedSongs.push(request)
        newRequest.accepted = true
        firebase.database().ref(`venues/${event.eventId}/requests/${request.id}`).remove()
        this.setState({
          acceptedSongs, requests, newRequest
        }, () => {
          console.log('Updated Requests ---> ', this.state.requests)
        })
      }
    })
  }

  joinEvent(venue) {
    let {event} = venue
    let {userId, userInfo} = this.state
    firebase.database().ref(`venues/${event.requestId}/joiners/${userId}`).set(true)
    firebase.database().ref(`users/${userId}/venue/id`).set(event.requestId)
    this.setState({
      join: true
    })
  }

  leaveEvent() {
    let {fanEvent, userInfo, userId} = this.state
    firebase.database().ref(`venues/${fanEvent.fanId}/joiners/${userId}`).remove()
    firebase.database().ref(`users/${userId}/venue`).remove()
    this.setState({
      fanEvent: {}
    }, () => {
      this.props.history.push('/fan-home')
    })
  }

  submitSongRequest(info) {
    let {fanEvent, userId, userInfo} = this.state
    let now = new Date().getTime()
    let request = {...info, user: userId, time: now}
    let myRef = firebase.database().ref(`venues/${fanEvent.fanId}/requests`)
    let key = myRef.push().key
    request.requestId = key
    myRef.child(`/${key}`).set(request)
    firebase.database().ref(`users/${userId}/venue/requests/${key}`).set(true, error => {
      if (!error) {
        console.log('Its added to firebase')
      }
    })
  }

  render() {
    let {userInfo, userId, event, newRequest, requests, isActive, allDjs, fanEvent} = this.state
    return(
      <MuiThemeProvider theme={theme}>
        <div className="MainPage">
          <Switch>
              <Route path="/new-event" render={props => (<NewEventWrapper userInfo={userInfo} userId={userId} onLogout={this.logoutUser}/>)} />
              <Route path="/event" render={props => (<EventView userInfo={userInfo} userId={userId} event={event} onFinish={this.finishEvent}  onLogout={this.logoutUser} />)}/>
              <Route path="/home" render={props =>
                (
                  <HomePage
                    userInfo={userInfo}
                    userId={userId}
                    event={event}
                    requests={requests}
                    onLogout={this.logoutUser}
                    onFinish={this.finishEvent}
                    isActive={isActive}
                  />
                )} />
              <Route path="/fan-home" render={props =>
                (
                <FanHomepage
                  userInfo={userInfo}
                  userId={userId}
                  event={event}
                  onLogout={this.logoutUser}
                  djs={allDjs}
                  onFanSelect={this.addFanEvent}
                  />
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
                    onAccepted={this.acceptingSong}
                    onAddRequest={this.addRequestToFirebase}
                  />)} />
              <Route path="/login" render={props => (<LoginWrapper />)} />
              <Route path="/dj-page" render={props => (
                <SelectDj
                  userInfo={userInfo}
                  onLogout={this.logoutUser}
                  djs={allDjs}
                  onGoBack={this.goFanPage}
                  onFanSelect={this.addFanEvent}
                />
              )} />
              <Route path="/fan-event" render={props => (
                <FanEvent
                  userInfo={userInfo}
                  fanEvent={fanEvent}
                  onJoin={this.joinEvent}
                />
              )} />
              <Route path="/fan-tip" render={props => (
                <TippingPage
                    userInfo={userInfo}
                    fanEvent={fanEvent}
                    allDjs={allDjs}
                    onLeave={this.leaveEvent}
                    onSubmit={this.submitSongRequest}
                    onLogout={this.logoutUser}/>)}
                />
              )} />
              <Redirect to="/home" />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(MainPage)
