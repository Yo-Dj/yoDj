import React from 'react'
import Icon from '@material-ui/core/Icon'

class Header extends React.Component {
  render() {
    let {imageUrl, iconClick} = this.props
    console.log('Props ---> ', this.props)
    return (
      <div className="Header">
        <div className="Header__profile-container">
          <div className="Header__profile" style={{backgroundImage: `url(${imageUrl})`}} onClick={iconClick}/>
        </div>
        <div className="Header__icon" />
        <div className="Header__search">
          <Icon>search</Icon>
        </div>
      </div>
    )
  }
}

export default Header
