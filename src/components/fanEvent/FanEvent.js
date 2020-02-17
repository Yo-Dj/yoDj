import React from 'react'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Header from '../header'
import CardModal from '../cardModal'

class FanEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timerTime: 0,
      timerStart: 0,
      showCardModal: false
    }
    this.onGoBack = this.onGoBack.bind(this)
    this.onProfile = this.onProfile.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.timeFormatter = this.timeFormatter.bind(this)
    this.join = this.join.bind(this)
    this.closeCardModal = this.closeCardModal.bind(this)
    this.openCardInfo = this.openCardInfo.bind(this)
  }

  componentDidMount() {
    let {fanEvent} = this.props
    if (fanEvent.event &&  fanEvent.event.startDate) {
      let {startDate} = fanEvent.event
      let now = new Date()
      let elapsedTime = now.getTime() - new Date(startDate).getTime()
      this.setState({
        timerTime: elapsedTime,
        timerStart: Date.now() - new Date(startDate).getTime()
      }, () => {
        this.startTimer()
      })
    }
  }

  componentDidUpdate(prevProps) {
    let {fanEvent} = this.props

    if ((prevProps.fanEvent.event && !prevProps.fanEvent.event.startDate) && (fanEvent.event && fanEvent.event.startDate)) {
      let {startDate} = fanEvent.event
      let now = new Date()
      let elapsedTime = now.getTime() - new Date(startDate).getTime()
      this.setState({
        timerTime: elapsedTime,
        timerStart: Date.now() - new Date(startDate).getTime()
      }, () => {
        clearInterval(this.timer)
        this.startTimer()
      })
    }

  }

  onProfile() {
    this.props.onLogout()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  startTimer() {
    this.setState({
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    })
    this.timer = setInterval(() => (
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      }),
    1000))
  }

  timeFormatter() {
    let {timerTime} = this.state
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2)
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2)
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2)
    return `${hours} : ${minutes} : ${seconds}`
  }

  onGoBack() {
    this.props.history.push('/fan-home')
  }

  join() {
    console.log('PROPS Fan Event -----> ', this.props)
    let {userInfo: {card}} = this.props
    if (card) {
      this.props.onJoin(this.props.fanEvent)
    } else {
      this.setState({
        showCardModal: true
      })
      console.log('CARD IS NOT added')
    }
  }
  
  closeCardModal() {
    this.setState({
      showCardModal: false
    })
  }

  openCardInfo() {
    // this.props.history.push('/bank')
    this.props.history.push({
      pathname:'/bank',
      state: {pastUrl: '/fan-event'}
    })
  }

  render() {
    let {userInfo, fanEvent} = this.props
    let {showCardModal} = this.state
    let event = {}
    if (fanEvent.event) {
      event = fanEvent.event
      event.time = moment(event.startDate).format('h:mm a')
    }
    let time = this.timeFormatter()
    let pending = fanEvent.pending ? Object.keys(fanEvent.pending).length : 0
    let attending = fanEvent.joiners ? Object.keys(fanEvent.joiners).length : 0
    let completed = fanEvent.completed ? Object.keys(fanEvent.completed).length : 0
    let eventname = fanEvent.event ? fanEvent.event.placeName.charAt(0).toUpperCase() : ''
    return(
      <div className={`FanEvent${showCardModal ? ' FanEvent--hide' : ''}`}>
        <Header imageUrl={userInfo.imageUrl} iconClick={this.onProfile} isActive={false} onClick={() => {}}/>
        <CardModal
            isVisible={this.state.showCardModal}
            onCloseModal={this.closeCardModal}
            onOpenCardInfo={this.openCardInfo}
        />
        <div className="FanEvent__subheader">
          <Icon onClick ={this.onGoBack}>close</Icon>
          <div className="FanEvent--subtitle">{event.placeName}</div>
       </div>
       <div className="FanEvent--attendees">
          {attending} fans attending, {pending} requests pending
        </div>
        <div className={`FanEvent__main-container${showCardModal ? ' FanEvent--hide-content' : ''}`}>
        <div className="FanEvent__icon-container">
          <div className="FanEvent--headset">
              <Icon classes={{root: `FanEvent--headset-icon`}}>headset</Icon>
          </div>
          <div className="FanEvent--dj-icon" style={{backgroundImage: `url(${fanEvent.imageUrl})`}}/>
          <div className="FanEvent--dj-name">{fanEvent.username}</div>
        </div>
        <div className="FanEvent--time-container">
          <div>Elapsed Time</div>
          <div className="FanEvent--time">{time}</div>
          <div className="FanEvent--info"> Started at {event.time}</div>
        </div>
        <div className="FanEvent--icon">{eventname}</div>
       </div>
        <div className={`FanEvent--requests${showCardModal ? ' FanEvent--hide-content' : ''}`}>
          {completed} Song Request Complete
        </div>
        <div className={`FanEvent--address${showCardModal ? ' FanEvent--hide-content' : ''}`}>
          {event.address}
        </div>
        <div className="FanEvent--join">
          <Button variant="contained" color="primary" classes={{root: 'FanEvent--join-button'}} onClick={this.join}>Join</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(FanEvent)
