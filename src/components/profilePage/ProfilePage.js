import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button'
import StarRatings from 'react-star-ratings'
import Header from '../header'

class ProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.iconClick = this.iconClick.bind(this)
    this.editClicked = this.editClicked.bind(this)
    this.logout = this.logout.bind(this)
    this.handleBank = this.handleBank.bind(this)
  }

  iconClick() {
    console.log('Icon')
  }

  editClicked() {
    console.log('Edit Clicked')
  }

  logout() {
    console.log('Logout ---> ')
    this.props.onLogout()
  }

  handleBank() {
    console.log('Handle Bank')
  }

  render() {
    let {userInfo} = this.props
    let socialMedia = userInfo.verificationType && userInfo.verificationType === 'facebook' ? '../../images/facebook.png' : userInfo.verificationType === 'twitter' ? '../../images/twitter.png' : ''
    console.log('User Info ---> ', userInfo)
    return (
      <div className="ProfilePage"> 
         <Header imageUrl={userInfo.imageUrl} iconClick={this.iconClick} isActive={true} />
         <div className="ProfilePage__subheader">
          <div className="ProfilePage--back-icon"><FontAwesomeIcon icon="arrow-left" /></div>
          <div className="ProfilePage--subtitle">Profile</div>
        </div>
        <div className="ProfilePage__container">
          <div className="ProfilePage--genre-container">
            <h3>Genres:</h3>
            <div className="ProfilePage--profile-genre">Hip-Hop</div>
            <div className="ProfilePage--profile-genre">Pop</div>
            <div className="ProfilePage--profile-genre">Neo Soul</div>
          </div>
          <div className="ProfilePage--icon-container">
            <div className="ProfilePage--icon" style={{backgroundImage: `url(${userInfo.imageUrl})`}} />
            <div className="ProfilePage--username">{userInfo.username}</div>
          </div>
          <div className="ProfilePage--settings">
            <Button variant="contained" color="primary" classes={{root: 'ProfilePage--edit'}} onClick={this.editClicked}><FontAwesomeIcon icon="cog" /><div className="ProfilePage--edit-text">Edit</div></Button>
            <div className="ProfilePage--fans">2 fans</div>
            {userInfo.verificationType ? <div className={`ProfilePage--${userInfo.verificationType}`}/> : null }
          </div>
        </div>
        <div className="ProfilePage--rating">
          <StarRatings
            rating={4.5}
            starDimension="20"
            starSpacing="5px"
            starRatedColor="white"
            starEmptyColor="#555"
          />
          <div className="ProfilePage--rating-num">17 ratings</div>
        </div>
        <div className="ProfilePage--bank-buttons">
          <Button variant="contained" color="primary" classes={{root: 'ProfilePage--money', label: 'ProfilePage--money-label'}} onClick={this.handleBank}><FontAwesomeIcon icon="dollar-sign" /><div className="ProfilePage--money-text">Bank</div></Button>
          <Button variant="contained" color="primary" classes={{root: 'ProfilePage--tip', label: 'ProfilePage--money-label'}} onClick={this.handleBank}><FontAwesomeIcon icon="clock" /><div className="ProfilePage--money-text">Bank</div></Button>
        </div>
        <div className="ProfilePage--logout">
          <Button variant="contained" color="primary" classes={{root: 'ProfilePage--edit'}} onClick={this.logout}>Logout</Button>
        </div>
      </div>
    )
  }
}

export default ProfilePage