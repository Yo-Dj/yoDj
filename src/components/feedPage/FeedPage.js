import React from 'react'
import {withRouter} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Header from '../header'

class FeedPage extends React.Component {
  constructor(props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
  }

  componentDidMount() {

  }

  openProfile() {
    console.log('Open Profile ---> ')
  }

  render() {
    console.log('This Props ---> ', this.props)
    let {userInfo, requests} = this.props
    let requestNum = requests.reduce((acc,el) => acc +  (el.songRequest), 0)
    let fanNum = requests.reduce((acc, el) => ({...acc, [el.name]: true}), {})
    fanNum = Object.keys(fanNum).length
    return (
      <div className="FeedPage">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={true} />
        <div className="FeedPage__subheader">
          <Icon onClick ={this.close}>close</Icon>
          <div className="FeedPage--subtitle">Feed</div>
          <div className="FeedPage-request-num">{requestNum} reqs, {fanNum} fans</div>
       </div>
      </div>
    )
  }
}

export default FeedPage
