import React from 'react'
import {withRouter} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Header from '../header'

class EventView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0
    }
    this.handleClose = this.handleClose.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => (
      this.setState({
        time: Date.now() - this.state.start
      }),
    1))
  }

  handleClose() {
    console.log('Close Event --> ')
    // this.props.history.push('/home')
  }

  render() {
    let {userInfo, event} = this.props
    let tip = parseFloat(event.tipAmount).toFixed(2)
    console.log('Event --> ', event)
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
          <div className="EventView--time">time</div>
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

