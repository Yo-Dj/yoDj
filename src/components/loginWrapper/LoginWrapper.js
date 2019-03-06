import React from 'react'
import {MuiThemeProvider} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import firebase from 'firebase'
import theme from 'src/config/CustomStyle'
import {fire, facebookProvider, twitterProvider} from 'src/config/Fire'
import Login from './login'
import Registration from './registration'
import SocialMedia from './socialMedia'

class LoginWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      view: '',
      userType: '',
      profileInfo: {},
      loginSuccessful: false,
      username: ''
    }
    this.addUser = this.addUser.bind(this)
    this.renderView = this.renderView.bind(this)
    this.userSelected = this.userSelected.bind(this)
    this.openSocialMedia = this.openSocialMedia.bind(this)
    this.signInFacebook = this.signInFacebook.bind(this)
    this.signInTwitter = this.signInTwitter.bind(this)
    this.addToDatabase = this.addToDatabase.bind(this)
    this.verified = this.verified.bind(this)
    this.usernameChange = this.usernameChange.bind(this)
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
      this.setState({
        userInfo: {token: user.m, phone: user.phoneNumber, uid: user.uid},
        view: 'registration'
        })
      } else {
        this.setState({
          view: 'confirmation'
        })
      }
    })
  }

  verified() {
    this.setState({
      loginSuccessful: false
    })
  }

  addToDatabase(verificationType) {
    let {profileInfo: {name, image}, username} = this.state
    let userId = fire.auth().currentUser.uid
    firebase.database().ref(`users/${userId}`).set({
      name: name,
      imageUrl: image,
      userId: userId,
      verificationType: verificationType,
      username: username
    }, error => {
      if (!error) {
        this.setState({
          loginSuccessful: true
        })
      }
    })
  }

  signInTwitter() {
    fire.auth().signInWithPopup(twitterProvider)
      .then(result => {
        let {additionalUserInfo: {profile}} = result
        let profileInfo = {
          image: profile.profile_image_url,
          name: profile.name
        }
        this.setState({
          profileInfo
        })
        this.addToDatabase('twitter')
      })
      .catch(error => console.log('Twitter error --> ', error)) // eslint-disable-line no-console
  }

  signInFacebook() {
    fire.auth().signInWithPopup(facebookProvider)
      .then(result => {
        let {additionalUserInfo: {profile}} = result
        let profileInfo = {
          image: profile.picture.data.url,
          name: profile.name
        }
        this.setState({
          profileInfo
        })
        this.addToDatabase('facebook')
      })
      .catch(error => console.log('Facebook Sign IN error --> ', error)) // eslint-disable-line no-console
  }

  userSelected(userType) {
    this.setState({
      userType
    })
  }

  openSocialMedia() {
    this.setState({
      view: 'socialMedia'
    })
  }

  addUser(userInfo) {
    this.setState({
      userInfo: {token: userInfo.m, phone: userInfo.phoneNumber},
      view: 'registration'
    })
  }

  usernameChange(username) {
    if (username.indexOf('@') === -1) {
      username = '@' + username
    }
    if (username === '@') username = ''
    this.setState({
      username
    })
  }

  renderView() {
    switch (this.state.view) {
      case 'confirmation':
        return (<Login onAddUser={this.addUser}/>)
      case 'registration':
        return (<Registration
                  user={this.state.userInfo}
                  onUserSelect={this.userSelected}
                  userType={this.state.userType}
                  onSignUp={this.openSocialMedia}
                  username={this.state.username}
                  onUsernameChange={this.usernameChange}
                />)
      case 'socialMedia':
        return (<SocialMedia
                  onFacebookSign={this.signInFacebook}
                  onTwitterSign={this.signInTwitter}
                  profileInfo={this.state.profileInfo}
                  loginSuccessful={this.state.loginSuccessful}
                  closeLogin={this.verified}
                />)
      default:
        return (<Login onAddUser={this.addUser}/>)
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="LoginWrapper">
          { this.state.view === ''
            ? <div className="LoginWrapper--progress">
                <CircularProgress />
              </div>
            : this.renderView()
          }
        </div>
      </MuiThemeProvider>

    )
  }
}

export default LoginWrapper
