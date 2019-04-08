import React from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Header from '../header'

class AcceptWrapper extends React.Component {
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
  }

  decline() {
  }

  render() {
    let {isActive, userInfo, request} = this.props
    let tip = parseFloat(request.tip).toFixed(2)
    return (
      <div className="AcceptWrapper">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={true} />
        <div className="AcceptWrapper__subheader">
          <Icon onClick ={this.goBack}>close</Icon>
          <div className="AcceptWrapper--subtitle">TIP</div>
       </div>
       <div className="AcceptWrapper__request-container">
          <div className="AcceptWrapper__profile-container">
              <div className="AcceptWrapper--request-icon" />
              <div className="AcceptWrapper--username">{request.name}</div>
          </div>
          <div className="AcceptWrapper--tip">$ {tip}</div>
          <div className="AcceptWrapper--clock-container">
            <div className="AcceptWrapper--clock-out">
              <div className="AcceptWrapper--needle" />
            </div>
            <div className="AcceptWrapper--deliver-time">ETD: 0 min</div>
          </div>
       </div>
       <div className="AcceptWrapper__action-container">
        <h3>Song Request</h3>
        <div className="AcceptWrapper__song-container">
          <div className="AcceptWrapper--song-icon" />
          <div className="AcceptWrapper--song-name">
            {request.song}
          </div>
        </div>
        <div className="AcceptWrapper__action-buttons">
          <div className="AcceptWrapper--button">
            <Button variant="contained" color="primary" classes={{root: 'AcceptWrapper--song-button'}} onClick={this.decline}>Decline</Button>
          </div>
          <div className="AcceptWrapper--button">
            <Button variant="contained" color="primary" classes={{root: 'AcceptWrapper--song-button'}} onClick={this.accept}>Accept</Button>
          </div>
        </div>
       </div>
      </div>
    )
  }
}

export default AcceptWrapper
