import React from 'react'
import {withRouter} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import firebase from 'firebase'
import {fire, facebookProvider, twitterProvider} from 'src/config/Fire'
import Login from './login'
import Registration from './registration'
import SocialMedia from './socialMedia'

class LoginWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      view: 'confirmation',
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
    this.fanSignUp = this.fanSignUp.bind(this)
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      let {userInfo} = this.state
      let {isLogged} = this.props
      if (isLogged) {
        return
      }
      if (user && !isLogged) {
        if ((!user.phoneNumber && (!userInfo || (userInfo && userInfo.phone))) || !user.displayName) {
          this.setState({
            view: 'confirmation'
          })
          return;
        }
        this.setState({
          userInfo: {token: user.m, phone: user.phoneNumber, uid: user.uid},
          view: 'registration'
        })
      } else if (!user && !userInfo){
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
    let {profileInfo: {name, image}, username, userInfo: {phone}} = this.state
    let userId = !this.state.userInfo.uid ? fire.auth().currentUser.uid : this.state.userInfo.uid
    firebase.database().ref(`users/${userId}`).set({
      name: name,
      imageUrl: image,
      userId: userId,
      verificationType: verificationType,
      username: username,
      phone: phone
    }, error => {
      if (!error) {
        this.setState({
          loginSuccessful: true
        })
        this.props.history.push('/home')
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
        }, () => {
          this.addToDatabase('twitter')
        })
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
        console.log('Profile Infor from Facebooks ---> ', profileInfo)
        this.setState({
          profileInfo
        }, () => {
          this.addToDatabase('facebook')
        })
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

  fanSignUp() {
    let {userType, username, userInfo: {phone}} = this.state
    let userId = !this.state.userInfo.uid ? fire.auth().currentUser.uid : this.state.userInfo.uid
    firebase.database().ref(`users/${userId}`).set({
      userId: userId,
      userType: userType,
      username: username,
      phone: phone,
      imageUrl: "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
    }, error => {
      if (!error) {
        this.setState({
          loginSuccessful: true
        })
        this.props.history.push('/fan-home')
      }
    })
  }

  addUser(userInfo) {
  firebase.database()
    .ref(`users/${userInfo.uid}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        this.props.history.push('/home')
        return
      }
      this.setState({
        userInfo: {token: userInfo.m, phone: userInfo.phoneNumber, uid: userInfo.uid},
        view: 'registration'
      })
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
                  onFanSignUp={this.fanSignUp}
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
        <div className="LoginWrapper">
          { this.state.view === ''
            ? <div className="LoginWrapper--progress">
                <CircularProgress />
              </div>
            : this.renderView()
          }
        </div>
    )
  }
}

export default withRouter(LoginWrapper)
