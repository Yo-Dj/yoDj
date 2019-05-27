import React from 'react'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Header from '../header'

class FanEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timerTime: 0,
      timerStart: 0,

    }
    this.onGoBack = this.onGoBack.bind(this)
    this.onProfile = this.onProfile.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.timeFormatter = this.timeFormatter.bind(this)
    this.join = this.join.bind(this)
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
    this.props.onJoin(this.props.fanEvent)
  }

  render() {
    let {userInfo, fanEvent} = this.props
    let event = {}
    if (fanEvent.event) {
      event = fanEvent.event
      event.time = moment(event.startDate).format('h:mm a')
    }
    let time = this.timeFormatter()
    let completed = fanEvent.completed ? Object.keys(fanEvent.completed) : 0
    let attending = fanEvent.joiners ? Object.keys(fanEvent.joiners).length : 0
    return(
      <div className="FanEvent">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.onProfile} isActive={false} onClick={() => {}}/>
        <div className="FanEvent__subheader">
          <Icon onClick ={this.onGoBack}>close</Icon>
          <div className="FanEvent--subtitle">{event.placeName}</div>
       </div>
       <div className="FanEvent--attendees">
          {attending} fans attending, {completed} requests pending
        </div>
        <div className="FanEvent__main-container">
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
        <div className="FanEvent--icon" />
       </div>
        <div className="FanEvent--requests">
          2 Song Request Complete
        </div>
        <div className="FanEvent--address">
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
