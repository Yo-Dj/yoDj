import React from 'react'
import {withRouter} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Header from '../header'

class EventView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timerTime: 0,
      timerStart: 0,

    }
    this.handleClose = this.handleClose.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.timeFormatter = this.timeFormatter.bind(this)
  }

  componentDidMount() {
    console.log('Props ----> ', this.props)
    let {event: {startDate}} = this.props
    if (startDate) {
      console.log('STartDate ---> ', startDate)
      let now = new Date()
      let elapsedTime = now.getTime() - new Date(startDate).getTime()
      console.log('Elapsed Time ---> ', elapsedTime)
      this.setState({
        timerTime: elapsedTime,
        timerStart: Date.now() - new Date(startDate).getTime()
      }, () => {
        this.startTimer()
      })
    }
  }

  componentDidUpdate(prevProps) {
    let {event: {startDate}} = this.props

    if (!prevProps.event.startDate && startDate) {
      console.log('STartDate ---> ', startDate)
      let now = new Date()
      let elapsedTime = now.getTime() - new Date(startDate).getTime()
      console.log('Elapsed Time ---> ', elapsedTime)
      this.setState({
        timerTime: elapsedTime,
        timerStart: Date.now() - new Date(startDate).getTime()
      }, () => {
        clearInterval(this.timer)
        this.startTimer()
      })
    }

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

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleClose() {
    this.props.onFinish()
  }

  render() {
    let {userInfo, event} = this.props
    let tip = parseFloat(event.tipAmount).toFixed(2)
    let time = this.timeFormatter()
    return (
      <div className="EventView">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.profileImgClicked} isActive={true} onClick={() => {}}/>
        <div className="EventView__subheader">
          <Icon onClick ={this.handleClose}>close</Icon>
          <div className="EventView--subtitle">{event.placeName}</div>
       </div>
       <div className="EventView__main-container">
         <div className="EventView--headset">
            <Icon classes={{root: 'EventView--headset-icon'}}>headset</Icon>
         </div>
        <div className="EventView--time-container">
          <div>Elapsed Time</div>
          <div className="EventView--time">{time}</div>
          <div className="EventView--info"> Started at 10pm</div>
        </div>
        <div className="EventView--icon" />
       </div>
       <div className="EventView--address">{event.address}</div>
       <div className="EventView__tip-container">
        Minimum tip required for request:
        <p>${tip}</p>
       </div>
       <div className="EventView__request-container">
        2 Song Request Completed
        <p>$3.00 Earned</p>
       </div>
       <div className="EventView--end-action">
        <Button variant="contained" color="primary" classes={{root: 'EventView__end'}} onClick={this.handleClose}>End</Button>
      </div>
      </div>
    )
  }
}

export default EventView

