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

  }

  goBack() {
    console.log('GoBack Clicked')
  }

  accept() {
    console.log('Accept is Clicked')
  }

  decline() {
    console.log('Decline is clicked')
  }

  render() {
    let {isActive, userInfo} = this.props
    return (
      <div className="AcceptWrapper">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={isActive} />
        <div className="AcceptWrapper__subheader">
          <Icon onClick ={this.close}>close</Icon>
          <div className="AcceptWrapper--subtitle">TIP</div>
       </div>
       <div className="AcceptWrapper__request-container">
          <div className="AcceptWrapper__profile-container">
              <div className="AcceptWrapper--request-icon" />
              <div className="AcceptWrapper--username">@Hamz</div>
          </div>
          <div className="AcceptWrapper--tip">$ 2.00</div>
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
            Mobb Deep - Shook Ones
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
