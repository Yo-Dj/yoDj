import React from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Header from '../../header'
import axios from 'axios'


class RequestPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultTime: 15
    }
    this.openProfile = this.openProfile.bind(this)
    this.goBack = this.goBack.bind(this)
    this.accept = this.accept.bind(this)
    this.decline = this.decline.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }

  openProfile() {
    this.props.onLogout()
  }

  goBack() {
    this.props.onGoBack()
  }

  accept() {
    let { 
      request: {
        name = '',
        phone: userPhone = '',
      } = '',
      userInfo: {
        username: dj = ''
      }
    } = this.props  
    this.props.onAccept({name, dj, userPhone})
  }

  decline() {
    let { 
      request: {
        name = '',
        phone: userPhone = '',
      } = '',
      userInfo: {
        username: dj = ''
      }
    } = this.props 
    this.props.onDecline(this.props.request, {name, dj, userPhone})
  }

  handleTimeChange(e) {
    this.setState({
      defaultTime: e.target.value
    })
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
          {/* <div className="RequestPage--clock-container">
            <div className="RequestPage--clock-out">
              <div className="RequestPage--needle" />
            </div>
            <div className="RequestPage--deliver-time">ETD: 0 min</div>
          </div> */}
          <div className="Request--time-cont">
          <FormControl>
            <Select
              value={this.state.defaultTime}
              onChange={this.handleTimeChange}
              classes={{root: 'RequestPage--select-form'}}
            >
              <MenuItem value={15}>15 Minutes</MenuItem>
              <MenuItem value={30}>30 Minutes</MenuItem>
              <MenuItem value={45}>45 Minutes</MenuItem>
              <MenuItem value={60}>1 Hour</MenuItem>
            </Select>
          </FormControl>
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
