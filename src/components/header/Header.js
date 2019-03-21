import React from 'react'
import Icon from '@material-ui/core/Icon'

class Header extends React.Component {
  render() {
    let {imageUrl, iconClick, isActive} = this.props
    let boxShadowColor = isActive ? '#08FF00' : 'yellow'
    let boxShadow = `1px 2px 4px 1px ${boxShadowColor} inset, 1px 1px 4px 3px ${boxShadowColor}`
    return (
      <div className="Header">
        <div className="Header__profile-container">
          <div className="Header__profile" style={{backgroundImage: `url(${imageUrl})`, boxShadow: boxShadow}} onClick={iconClick}/>
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
