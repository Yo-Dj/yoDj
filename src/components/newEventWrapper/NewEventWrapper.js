import React from 'react'
import {withRouter} from 'react-router-dom'
import firebase from 'firebase'
import Icon from '@material-ui/core/Icon'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import Header from '../header'
import Button from '@material-ui/core/Button'
import NumberFormat from 'react-number-format'


class NewEventWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placeName: '',
      location: '',
      type: '',
      tipText: '$',
      tipAmount: ''
    }
    this.profileImgClicked = this.profileImgClicked.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.typeChange = this.typeChange.bind(this)
    this.tipChange = this.tipChange.bind(this)
    this.createEvent = this.createEvent.bind(this)
    this.close = this.close.bind(this)
  }

  handleName(e) {
    this.setState({
      placeName: e.target.value
    })
  }

  close() {
    this.props.history.push('/home')
  }

  handleLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  profileImgClicked() {
    console.log('Profile is picked -->')
    this.props.onLogout()
  }

  typeChange(e) {
    this.setState({
      type: e.target.value
    })
  }

  tipChange(e) {
    let {value} = e.target
    let tipText
    if (value[0] === '$') {
      value = value.slice(1)
    }
    if (!isNaN(value)) {
      // value = parseFloat(value).toFixed(2)
      tipText = '$' + value
      this.setState({
        tipText,
        tipAmount: value
      })
    }
  }

  createEvent() {
    let {placeName, location, type, tipAmount} = this.state
    let {userId} = this.props
    if (placeName !== '' && location !== '' && type !== '' && tipAmount !== '' ) {
      let now = new Date().getTime()
      firebase.database().ref(`users/${userId}/event`).set({
        placeName,
        address: location,
        type,
        tipAmount,
        startDate: now
      },  error => {
        if (!error) {
          console.log('Push home ---> ')
          this.props.history.push('/home')
        }
      })
    }
  }

  render() {
    let {userInfo} = this.props
    return (
      <div className="NewEventWrapper">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.profileImgClicked} isActive={false} onClick={() => {}}/>
       <div className="NewEventWrapper__subheader">
          <Icon onClick ={this.close}>close</Icon>
          <div className="NewEventWrapper--subtitle">Check In</div>
       </div>
       <div className="NewEventWrapper__container">
        <h3>Event</h3>
        <div className="NewEventWrapper--icon" />
        <TextField
          value={this.state.placeName}
          placeholder="Place Name"
          margin="normal"
          classes={{root: "NewEventWrapper__text"}}
          onChange={this.handleName}
        />
        <TextField
          value={this.state.location}
          placeholder="Location Address"
          margin="normal"
          classes={{root: "NewEventWrapper__text"}}
          onChange={this.handleLocation}
        />
        <div className="NewEventWrapper__form-control">
          <FormControl className="NewEventWrapper__form">
            <InputLabel
              htmlFor="age-simple"
              FormLabelClasses={{
                root: "NewEventWrapper__form-label",
                focused: "NewEventWrapper__label-focused"
              }}>
                Type
            </InputLabel>
              <Select
                value={this.state.type}
                onChange={this.typeChange}
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                  style: {color: 'yellow'}
                }}
              >
              <MenuItem value="venue" classes={{root: 'NewEventWrapper__menu-item'}}>Venue</MenuItem>
              <MenuItem value="party" classes={{root: 'NewEventWrapper__menu-item'}}>Party</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="NewEventWrapper--tip-title">
            Minimimum tip required for request
        </div>
        <div className="NewEventWrapper--tip-container">
            <TextField
              value={this.state.tipText}
              margin="normal"
              classes={{root: "NewEventWrapper--tip-text"}}
              onChange={this.tipChange}
              InputProps={{style: {textAlign: 'start', margin: '20px 0'}}}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.createEvent}
              classes={{root: 'NewEventWrapper--create'}}
            > Create
            </Button>
        </div>
       </div>
      </div>
    )
  }
}

export default withRouter(NewEventWrapper)

