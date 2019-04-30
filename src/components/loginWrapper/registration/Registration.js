import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ConditionPage from '../conditionPage'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

class Registration extends React.Component {
  static propTypes = {
    onUserSelect: PropTypes.func,
    userType: PropTypes.string,
    onSignUp: PropTypes.func,
    onUsernameChange: PropTypes.func,
    username: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      // name: '',
      openTerms: false,
      isError: false,
      errorMessage: ''
    }
    this.nameChange = this.nameChange.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.openCondition = this.openCondition.bind(this)
    this.closeCondition = this.closeCondition.bind(this)
    this.signUp = this.signUp.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  nameChange(e) {
    this.props.onUsernameChange(e.target.value)
  }

  selectUser(selectedType) {
    this.props.onUserSelect(selectedType)
  }

  openCondition() {
    this.setState({
      openTerms: true
    })
  }

  closeCondition() {
    this.setState({
      openTerms: false
    })
  }

  handleClose() {
    this.setState({isError: false, errorMessage: ''})
  }

  signUp(e) {
    e.preventDefault()
    let {userType, onSignUp, username, onFanSignUp} = this.props
    let errorMessage = ''
    let isError = false
    if (userType === '') {
      errorMessage = 'Please select user type!'
      isError = true
    }
    if (username === '') {
      errorMessage = 'Please enter username!'
      isError = true
    }
    this.setState({
      errorMessage,
      isError
    })
    if (userType === 'Fan') {
      console.log('Fan Signup is on --->')
      onFanSignUp()
      return
    }
    if (!isError) {
      onSignUp()
      return
    }
  }

  render() {
    let {userType, username} = this.props
    return (
      <div className={`Registration${this.state.openTerms ? ' Registration--dark-theme' : ''}`}>
        <div className="Registration__icon" />
        <ConditionPage isVisible={this.state.openTerms} onClose={this.closeCondition}/>
        <TextField
          value={username}
          placeholder='Enter @Name'
          margin="normal"
          classes={{root: 'Registration__text'}}
          onChange={this.nameChange}
          InputProps={{style: {textAlign: 'center'}, classes: {input: 'Registration__input'}}}
        />
        <div className='Registration__user-select'>
          What kind of user are you?
          <div className='Registration__user-buttons'>
            <Button
              variant="contained"
              color="primary"
              classes={{root: `Registration__type-button${userType !== '' && userType === 'Fan' ? ' Registration--selected' : ''}`}}
              onClick={() => this.selectUser('DJ')}
            >
              DJ
            </Button>
            <Button
              variant="contained"
              color="primary"
              classes={{root: `Registration__type-button${userType !== '' && userType === 'DJ' ? ' Registration--selected' : ''}`}}
              onClick={() => this.selectUser('Fan')}
            >
              Fan
            </Button>
          </div>
        </div>
      <div className="Registration__condition" onClick={this.openCondition}>
        View YoDj terms and Privacy Policy
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={this.signUp}
        classes={{root: 'Registration__sign-up'}}
      > Sign Up
      </Button>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.isError}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.errorMessage}</span>}
          action={[
              <IconButton
                key="close"
                arial-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
          ]} />
    </div>
    )
  }
}

export default Registration
