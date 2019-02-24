import React from 'react'
import {MuiThemeProvider} from '@material-ui/core/styles'
import theme from 'src/config/CustomStyle'
import fire from 'src/config/Fire'
import Login from './login'
import Registration from './registration'

class LoginWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      view: 'confirmation'
    }
    this.addUser = this.addUser.bind(this)
    this.renderView = this.renderView.bind(this)
  }

  componentDidMount() {
    let currentUser = fire.auth().currentUser
    if (currentUser) {
      this.setState({
        userInfo: {token: currentUser.m, phone: currentUser.phoneNumber},
        view: 'registration'
      })
    }
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
        return (<Registration user={this.state.userInfo}/>)
      default:
      return (<Login onAddUser={this.addUser}/>)
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="LoginWrapper">
          {this.renderView()}
        </div>
      </MuiThemeProvider>

    )
  }
}

export default LoginWrapper
