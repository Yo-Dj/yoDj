import React from 'react'
import {withRouter} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Header from '../header'
import SongContainer from './songContainer';
import ActivityContainer from './activityContainer';

class FeedPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRequest: {}
    }
    this.openProfile = this.openProfile.bind(this)
    this.handleRequest = this.handleRequest.bind(this)
    this.close = this.close.bind(this)
  }

  handleRequest(type, selectedRequest) {
    this.setState({
      selectedRequest
    })
    if (type === 'accept') {
      this.props.history.push({
        pathname:'/accept-request',
        state: {request: selectedRequest}
      })
      return
    }
    console.log('Cancel should be invoked')
    this.props.history.push({
      pathname: '/feed',
      deletingRequest: selectedRequest
    })
  }

  close() {
    this.props.onGoBack()
  }

  componentDidMount() {

  }

  openProfile() {
    console.log('Open Profile ---> ')
  }

  render() {
    let {userInfo, requests} = this.props
    let requestNum = requests.reduce((acc,el) => acc +  (el.songRequest), 0)
    let fanNum = requests.reduce((acc, el) => ({...acc, [el.name]: true}), {})
    fanNum = Object.keys(fanNum).length
    requests = requests.length > 0 ? requests : []
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
              request.songRequest ? <SongContainer request={request} key={index} onRequest={this.handleRequest}/> : <ActivityContainer request={request} key={index}/>
            ))
          }
       </div>
      </div>
    )
  }
}

export default withRouter(FeedPage)
