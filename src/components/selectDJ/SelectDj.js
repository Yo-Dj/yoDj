import React from 'react'
import {withRouter} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Header from '../header'


class SelectDj extends React.Component {
  constructor(props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
    this.close = this.close.bind(this)
  }

  close() {
    this.props.onGoBack()
  }

  openProfile() {
    this.props.onLogout()
  }

  render() {
    let {userInfo, djs} = this.props
    let onlineDjs = djs.filter((acc, el) => el.event)

    return(
      <div className="SelectDj">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={false} />
        <div className="SelectDj__subheader">
          <Icon onClick ={this.close}>close</Icon>
          <div className="SelectDj--subtitle">Venues/DJs</div>
          <div className="SelectDj--onlines">{onlineDjs.length} online</div>
       </div>
       <div className="SelectDj__container">
       {
         djs.map((dj, index) => (
          <div className="SelectDj__dj-wrapper" key={index}>
            <div className="SelectDj__icon-container">
              <div className="SelectDj--headset">
                  <Icon classes={{root: `SelectDj--headset-icon`}}>headset</Icon>
              </div>
              <div className="SelectDj--icon" style={{backgroundImage: `url(${dj.imageUrl})`}}/>
            </div>
            <div className="SelectDj--info-container">
              <div className="SelectDj--general">{dj.username} <span className="SelectDj--place">The Mid</span></div>
              <div className="SelectDj--time">11 PM</div>
              <div className="SelectDj--tip">Request minimum $2.00</div>
            </div>
          <div className="SelectDj--forward">
            <svg className="SelectDj--forward" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>          </div>
          </div>
         ))
       }
       </div>
      </div>
    )
  }
}

export default SelectDj
