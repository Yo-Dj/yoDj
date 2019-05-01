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
    let {userInfo} = this.props
    return(
      <div className="SelectDj">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={false} />
        <div className="SelectDj__subheader">
          <Icon onClick ={this.close}>close</Icon>
          <div className="SelectDj--subtitle">Venues/DJs</div>
          <div className="SelectDj--onlines">3 online</div>
       </div>
       <div className="SelectDj__container">
          <div className="SelectDj__dj-wrapper">
            <div className="SelectDj__icon-container"> 
              <div className="SelectDj--headset">
                  <Icon classes={{root: `SelectDj--headset-icon`}}>headset</Icon>
              </div>
              <div className="SelectDj--icon" />
            </div>
            <div className="SelectDj--info-container">
              <div className="SelectDj--general">@Nvd <span className="SelectDj--place">The Mid</span></div>
              <div className="SelectDj--time">11 PM</div>
              <div className="SelectDj--tip">Request minimum $2.00</div>
            </div>
          </div>
          <div className="SelectDj--forward">
            <Icon classes={{root: `SelectDj--arrow`}}>close</Icon>
          </div>
       </div>
      </div>
    )
  }
}

export default SelectDj
