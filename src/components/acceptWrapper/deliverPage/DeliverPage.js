import React from 'react'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'

class DeliverPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      startClicked: false,
      completed: false
    }
    this.goBack = this.goBack.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.startClick = this.startClick.bind(this)
    this.timeFormatter = this.timeFormatter.bind(this)
    this.clickOnComplete = this.clickOnComplete.bind(this)
  }

  componentDidUpdate() {
    if ((this.state.time >= 6000 && this.state.time <= 6100) && !this.state.completed) {
      this.props.onCompleteRequest()
      this.stopTimer()
      this.setState({
        completed: true
      })
    }
  }

  startClick() {
    let {isOn, startClicked} = this.state
    if (!startClicked) {
      this.setState({
        startClicked: true
      })
    }
    !isOn ? this.startTimer() : this.stopTimer()
  }

  timeFormatter() {
    let {time} = this.state
    let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2)
    let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2)
    let hours = ("0" + Math.floor(time / 3600000)).slice(-2)
    return `${hours} : ${minutes} : ${seconds}`
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1000)
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({
      time: 0,
      isOn: false
    })
  }

  clickOnComplete() {
    this.props.onCompleteGoBack()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  goBack() {
    this.props.onGoBack()
  }

  render() {
    let {request} = this.props
    let {startClicked, completed} = this.state
    let tip = parseFloat(request.tip).toFixed(2)
    let time = startClicked ? this.timeFormatter() : 'Start'
    return (
    <div className="DeliverPage">
       <div className="DeliverPage__subheader">
          <Icon onClick ={this.goBack}>close</Icon>
          <div className="DeliverPage--subtitle">Request Delivery</div>
       </div>
       <div className="DeliverPage__song-container">
          <div className="DeliverPage--song-icon" />
          <div className="DeliverPage--song-name">{request.song}</div>
       </div>
       <div className="DeliverPage--song-info">
          <div className="DeliverPage--clock-container">
            <div className={`DeliverPage--clock-out${(startClicked && !completed)  ? ' DeliverPage--started' : completed ? ' DeliverPage--completed' : ''}`} onClick={this.startClick}>
              <div className="DeliverPage--action">{time}</div>
            </div>
          </div>
          {
            (completed)
            ? <div className="DeliverPage__completed-container">
                You've done the minimum
                <Fab color="primary" aria-label="Edit" classes={{root: 'DeliverPage--check'}} size="small" onClick={this.clickOnComplete}>
                  <Icon>check</Icon>
                </Fab>
              </div>
            :  <div>
                Tap start to begin recording
                <div className="DeliverPage--deliver-time">
                  Deliver by <span className="DeliverPage--time">11:19 PM</span>
                </div>
              </div>
          }
       </div>
      <div className="DeliverPage__request-info">
        <div className="DeliverPage--tip">Tip <span className="DeliverPage--time">$ {tip}</span></div>
        <div className="DeliverPage--user">
          <div className="DeliverPage--user-icon" style={{backgroundImage: `url(${request.img})`}}/>
          <div className="DeliverPage--user-name">{request.name}</div>
        </div>
      </div>
    </div>
    )
  }
}

export default DeliverPage
