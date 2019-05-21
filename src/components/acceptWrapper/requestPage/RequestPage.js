import React from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Header from '../../header'

class RequestPage extends React.Component {
  constructor(props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
    this.goBack = this.goBack.bind(this)
    this.accept = this.accept.bind(this)
    this.decline = this.decline.bind(this)
  }

  openProfile() {
    this.props.onLogout()
  }

  goBack() {
    this.props.onGoBack()
  }

  accept() {
    this.props.onAccept()
  }

  decline() {
  }

  render() {
    let {isActive, userInfo, request} = this.props
    let tip = parseFloat(request.tip).toFixed(2)
    return (
      <div className="RequestPage">
        <div className="RequestPage__subheader">
          <Icon onClick ={this.goBack}>close</Icon>
          <div className="RequestPage--subtitle">TIP</div>
       </div>
       <div className="RequestPage__request-container">
          <div className="RequestPage__profile-container">
              <div className="RequestPage--request-icon" style={{backgroundImage: `url(${request.img})`}}/>
              <div className="RequestPage--username">{request.name}</div>
          </div>
          <div className="RequestPage--tip">$ {tip}</div>
          <div className="RequestPage--clock-container">
            <div className="RequestPage--clock-out">
              <div className="RequestPage--needle" />
            </div>
            <div className="RequestPage--deliver-time">ETD: 0 min</div>
          </div>
       </div>
       <div className="RequestPage__action-container">
        <h3>Song Request</h3>
        <div className="RequestPage__song-container">
          <div className="RequestPage--song-icon" />
          <div className="RequestPage--song-name">
            {request.song}
          </div>
        </div>
        <div className="RequestPage__action-buttons">
          <div className="RequestPage--button">
            <Button variant="contained" color="primary" classes={{root: 'RequestPage--song-button'}} onClick={this.decline}>Decline</Button>
          </div>
          <div className="RequestPage--button">
            <Button variant="contained" color="primary" classes={{root: 'RequestPage--song-button'}} onClick={this.accept}>Accept</Button>
          </div>
        </div>
       </div>
      </div>
    )
  }
}

export default RequestPage
