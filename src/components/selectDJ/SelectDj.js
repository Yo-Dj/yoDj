import React from 'react'
import {withRouter} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Header from '../header'
import moment from 'moment'


class SelectDj extends React.Component {
  constructor(props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
    this.close = this.close.bind(this)
    this.convertTime = this.convertTime.bind(this)
    this.getTip = this.getTip.bind(this)
  }

  close() {
    this.props.onGoBack()
  }

  openProfile() {
    this.props.onLogout()
  }

  convertTime(time) {
    let newDate = new Date(time)
    return moment(newDate).format('hh:mm a')
  }

  getTip(tipAmount) {
    return parseFloat(tipAmount).toFixed(2)
  }

  render() {
    let {userInfo, djs} = this.props
    let onlineDjs = djs.filter(dj => dj.event)

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
         onlineDjs.map((dj, index) => (
          <div className="SelectDj__dj-wrapper" key={index}>
            <div className="SelectDj__icon-container">
              <div className="SelectDj--headset">
                  <Icon classes={{root: `SelectDj--headset-icon`}}>headset</Icon>
              </div>
              <div className="SelectDj--icon" style={{backgroundImage: `url(${dj.imageUrl})`}}/>
            </div>
            <div className="SelectDj--info-container">
              <div className="SelectDj--general">{dj.username} <span className="SelectDj--place">{dj.event.placeName}</span></div>
              <div className="SelectDj--time">{this.convertTime(dj.event.startDate)}</div>
              <div className="SelectDj--tip">Request minimum ${this.getTip(dj.event.tipAmount)}</div>
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
