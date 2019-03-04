import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

class SocialMedia extends React.Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.closeLogin()
  }

  render() {
    let {profileInfo: {image, name}, onFacebookSign, onTwitterSign, loginSuccessful} = this.props
    return (
      <div className="SocialMedia">
         <div className="SocialMedia__icon" />
         One more step!
         <div className="SocialMedia__description">
          To verify your DJ status connect a social network
         </div>
        <button
          className="SocialMedia__button SocialMedia--facebook"
          onClick={onFacebookSign}
        >
          Sign In with Facebook
        </button>
        <button
          className="SocialMedia__button SocialMedia--twitter"
          onClick={onTwitterSign}
        >
          Sign In with Twitter
        </button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={loginSuccessful}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Login was succesfull!</span>}
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

export default SocialMedia
