import React from 'react'
import {withRouter} from 'react-router-dom'
import firebase from 'firebase'
import Icon from '@material-ui/core/Icon'
import fire from 'src/config/Fire'
import FeedContainer from '../feedContainer'
import EventWrapper from '../eventWrapper'
import Header from '../header'

// const requests = [
//   {name: '@Ali', song: 'Eminem - The Real Slim Shady', tip: 2.00, songRequest: true, img: '../../../images/ali-icon.png', id: 1},
//   {name: '@Lindsay', message: 'tipped you $3.00', songRequest: false, img: '../../../images/lindsay-icon.png', id: 3},
//   {name: '@Hamz', song: 'Mibb Deep - Shook Ones', tip: 3.00, songRequest: true, img: '../../../images/zaid-icon.png', id: 2},
//   {name: '@Maha', message: 'joined your event', songRequest: false, img: '../../../images/maha-icon.png', id: 4},
//   {name: '@Ali', message: 'joined your event', songRequest: false, img: '../../../images/ali-icon.png', id: 5},
//   {name: '@Bois', song: 'Eminem - The Real Slim Shady', tip: 2.00, songRequest: true, img: '../../../images/ali-icon.png', id: 6}
// ]

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      requestOpen: false,
      requestMessage: ''
    }
    this.openProfile = this.openProfile.bind(this)
    this.activate = this.activate.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.openEvent = this.openEvent.bind(this)
    this.requestOpen = this.requestOpen.bind(this)
    this.acceptSong = this.acceptSong.bind(this)
    this.forwardFeedPage = this.forwardFeedPage.bind(this)
  }

  componentDidMount() {
    let {event, userInfo} = this.props
    if (userInfo.type && userInfo.type === 'fan') {
      this.props.history.push('/fan-home')
      return
    }
    if (Object.keys(event).length > 0) {
      this.setState({
        active: true
      })
    }
    this.authListener()
  }

  componentDidUpdate(prevProps, prevState) {
    let {event, userInfo} = this.props
    if (Object.keys(prevProps.event).length !== Object.keys(event).length) {
      this.setState({
        active: !this.state.active
      })
    }
    if (userInfo.type && userInfo.type === 'fan') {
      this.props.history.push('/fan-home')
      return
    }
  }

  requestOpen(open, type = '') {
    let requestMessage = (type === 'accept')
      ? 'Are you sure you want to accept this req?'
      : 'Are you sure you want to reject this req?'
    this.setState({
      requestOpen: open,
      requestMessage
    })
  }

  authListener() {

  }

  acceptSong(request) {
    let {requests} = this.props
    console.log('Accepted Request ---> ', request)
    this.props.history.push({
      pathname:'/accept-request',
      state: {request: {...request}}
    })
  }

  forwardFeedPage() {
    let {requests} = this.props
    this.props.history.push({
      pathname: '/feed',
      state: {requests: requests}
    })
  }

  openEvent() {
    this.props.history.push('/event')
  }

  removeEvent() {
    let {userId} = this.props
    firebase.database().ref(`users/${userId}/event`).remove()
  }

  openProfile() {
    this.props.onLogout()
  }

  activate() {
    this.props.history.push('/new-event')
  }

  render() {
    let {userInfo, event, requests} = this.props
    let {requestOpen, requestMessage, active} = this.state
    let boxShadowColor = active ? '#08FF00' : 'yellow'
    let boxShadow = `1px 2px 4px 1px ${boxShadowColor} inset, 1px 1px 4px 3px ${boxShadowColor}`
    return (
      <div className={`Homepage${requestOpen ? ' Homepage--hide' : ''}`}>
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={this.state.active} />
        <div className="Homepage__main-container">
          <div className="Homepage__event-container">
            <EventWrapper onCreate={this.activate} active={this.state.active} event={event} onTitle={this.openEvent} />
            <div className="Homepage--border" style={{boxShadow: boxShadow, backgroundColor: boxShadowColor}}/>
          </div>
          <div className="Homepage__feed-container">
            <FeedContainer
              active={this.state.active}
              event={event}
              requests={requests}
              onRequestOpen={this.requestOpen}
              openRequestModal={requestOpen}
              requestMessage={requestMessage}
              onAccept={this.acceptSong}
              onForward={this.forwardFeedPage}
            />
            <div className="Homepage--border" style={{boxShadow: boxShadow, backgroundColor: boxShadowColor}}/>
          </div>
          <div className="Homepage__tip-container">
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Homepage)
