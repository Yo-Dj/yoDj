import React from 'react'
import {withRouter} from 'react-router-dom'
import firebase from 'firebase'
import Icon from '@material-ui/core/Icon'
import fire from 'src/config/Fire'
import FeedContainer from '../feedContainer'
import EventWrapper from '../eventWrapper'
import Header from '../header'

const requests = [
  {name: '@Ali', song: 'Eminem - The Real Slim Shady', tip: 2.00, songRequest: true, img: '../../../images/ali-icon.png'},
  {name: '@Hamz', song: 'Mibb Deep - Shook Ones', tip: 3.00, songRequest: true, img: '../../../images/zaid-icon.png'},
  {name: '@Lindsay', message: 'tipped you $3.00', songRequest: false, img: '../../../images/lindsay-icon.png'},
  {name: '@Maha', message: 'joined your event', songRequest: false, img: '../../../images/maha-icon.png'},
  {name: '@Ali', message: 'joined your event', songRequest: false, img: '../../../images/ali-icon.png'},
  {name: '@Bois', song: 'Eminem - The Real Slim Shady', tip: 2.00, songRequest: true, img: '../../../images/ali-icon.png'}
]

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
  }

  componentDidMount() {
    let {event} = this.props
    if (Object.keys(event).length > 0) {
      this.setState({
        active: true
      })
    }
    this.authListener()
  }

  componentDidUpdate(prevProps, prevState) {
    let {event} = this.props
    if (Object.keys(prevProps.event).length !== Object.keys(event).length) {
      this.setState({
        active: !this.state.active
      })
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
    this.props.history.push({
      pathname:'/accept-request',
      state: {request: request}
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
    let {userInfo, event} = this.props
    let {requestOpen, requestMessage} = this.state
    return (
      <div className={`Homepage${requestOpen ? ' Homepage--hide' : ''}`}>
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={this.state.active} />
        <div className="Homepage__main-container">
          <div className="Homepage__event-container">
            <EventWrapper onCreate={this.activate} active={this.state.active} event={event} onTitle={this.openEvent} />
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
            />
          </div>
          <div className="Homepage__tip-container">
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Homepage)
