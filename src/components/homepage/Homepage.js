import React from 'react'
import Icon from '@material-ui/core/Icon'
import fire from 'src/config/Fire'
import EventWrapper from '../eventWrapper'
import Header from '../header'

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
    this.openProfile = this.openProfile.bind(this)
    this.activate = this.activate.bind(this)
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {

  }

  openProfile() {
    this.props.onLogout()
  }

  activate() {
    this.setState({
      active: true
    })
  }

  render() {
    let {userInfo} = this.props
    return (
      <div className="Homepage">
        {/* <div className="Homepage__header">
          <div className="Homepage__profile-container">
            <div className="Homepage__profile" style={{backgroundImage: `url(${userInfo.imageUrl})`}} onClick={this.openProfile}/>
          </div>
          <div className="Homepage__icon" />
          <div className="Homepage__search">
            <Icon>search</Icon>
          </div>
        </div> */}
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} />
        <div className="Homepage__main-container">
          <div className="Homepage__event-container">
            <EventWrapper onCreate={this.activate} active={this.state.active} />
          </div>
          <div className="Homepage__feed-container">
          </div>
          <div className="Homepage__tip-container">

          </div>
        </div>
      </div>
    )
  }
}

export default Homepage
