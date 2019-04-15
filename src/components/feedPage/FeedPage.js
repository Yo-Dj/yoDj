import React from 'react'
import {withRouter} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Header from '../header'
import SongContainer from './songContainer';
import ActivityContainer from './activityContainer';

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
    requests = requests.length > 0 ? requests.slice(0, 1) : []
    return (
      <div className="FeedPage">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={true} />
        <div className="FeedPage__subheader">
          <Icon onClick ={this.close}>close</Icon>
          <div className="FeedPage--subtitle">Feed</div>
          <div className="FeedPage-request-num">{requestNum} reqs, {fanNum} fans</div>
       </div>
       <div className="FeedPage__container">
          {
            requests.map((request, index) => (
              request.songRequest ? <SongContainer request={request}/> : <ActivityContainer />
            ))
          }
       </div>
      </div>
    )
  }
}

export default FeedPage
