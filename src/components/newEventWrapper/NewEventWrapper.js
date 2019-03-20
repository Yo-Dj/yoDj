import React from 'react'
import Icon from '@material-ui/core/Icon'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import Header from '../header'

class NewEventWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placeName: '',
      location: '',
      type: ''
    }
    this.profileImgClicked = this.profileImgClicked.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.typeChange = this.typeChange.bind(this)
  }

  handleName(e) {
    this.setState({
      placeName: e.target.value
    })
  }

  handleLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  profileImgClicked() {
    console.log('Profile is picked -->')
  }

  typeChange(e) {
    console.log('E Value ---> ', e.target.value)
    this.setState({
      type: e.target.value
    })
  }

  render() {
    let {userInfo} = this.props
    return (
      <div className="NewEventWrapper">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.profileImgClicked} />
       <div className="NewEventWrapper__subheader">
          <Icon>close</Icon>
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
          underlineStyle={{background: 'white', color: 'white'}}
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
                  id: 'age-simple'
                }}
                input={<Input classes={{
                  underline: "NewEventWrapper--underline"
                }} /> }
              >
              <MenuItem value="venue">Venue</MenuItem>
              <MenuItem value="party">Party</MenuItem>
            </Select>
          </FormControl>
        </div>
       </div>
      </div>
    )
  }
}

export default NewEventWrapper
