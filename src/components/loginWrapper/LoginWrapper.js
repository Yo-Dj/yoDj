import React from 'react'
import {MuiThemeProvider} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import theme from 'src/config/CustomStyle'
// import fire from 'src/config/Fire'
import Login from './login'
import Registration from './registration'
import SocialMedia from './socialMedia'

class LoginWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      view: 'confirmation',
      userType: ''
    }
    this.addUser = this.addUser.bind(this)
    this.renderView = this.renderView.bind(this)
    this.userSelected = this.userSelected.bind(this)
    this.openSocialMedia = this.openSocialMedia.bind(this)
  }

  componentDidMount() {
    // fire.auth().onAuthStateChanged(user => {
    //   if (user) {
    //   this.setState({
    //     userInfo: {token: user.m, phone: user.phoneNumber},
    //     view: 'registration'
    //     })
    //   } else {
    //     this.setState({
    //       view: 'confirmation'
    //     })
    //   }
    // })
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

  renderView() {
    switch (this.state.view) {
      case 'confirmation':
        return (<Login onAddUser={this.addUser}/>)
      case 'registration':
        return (<Registration user={this.state.userInfo} onUserSelect={this.userSelected} userType={this.state.userType} onSignUp={this.openSocialMedia} />)
      case 'socialMedia':
        return (<SocialMedia />)
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
