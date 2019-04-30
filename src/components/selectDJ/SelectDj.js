import React from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../header'


class SelectDj extends React.Component {
  constructor(props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
  }

  openProfile() {
    this.props.onLogout()
  }

  render() {
    let {userInfo} = this.props
    return(
      <div className="SelectDj">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={false} />
        Hello Select DJ
      </div>
    )
  }
}

export default SelectDj
