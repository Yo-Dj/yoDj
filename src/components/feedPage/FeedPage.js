import React from 'react'
import {withRouter} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close' 
import IconButton from '@material-ui/core/IconButton'
import Header from '../header'
import SongContainer from './songContainer';
import ActivityContainer from './activityContainer';

class FeedPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRequest: {},
      isError: false,
      errorMessage: ''
    }
    this.openProfile = this.openProfile.bind(this)
    this.handleRequest = this.handleRequest.bind(this)
    this.close = this.close.bind(this)
    this.closeError = this.closeError.bind(this)
  }

  handleRequest(type, selectedRequest) {
    let {acceptedSongs} = this.props
    this.setState({
      selectedRequest
    })
    console.log('Accepted SOngs ---> ', acceptedSongs)
    if (type === 'accept' && acceptedSongs.length === 1) {
      console.log('ErrorShow -> ')
      this.setState({
        errorMessage: 'Dj can only accept one request at a time',
        isError: true
      })
      return
    }
    if (type === 'accept') {
      console.log("SELECTED REQUEST ----> ", selectedRequest)
      this.props.history.push({
        pathname:'/accept-request',
        state: {request: selectedRequest}
      })
      return
    }
    this.props.onReject(selectedRequest)
  }

  close() {
    this.props.onGoBack()
  }

  componentDidMount() {

  }

  closeError() {
    this.setState({
      isError: false,
      errorMessage: ''
    })
  }

  openProfile() {
    this.props.onLogout()
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
       <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.isError}
          autoHideDuration={3000}
          onClose={this.closeError}
          ContentProps={{
            'aria-describedby': 'message-id'
        }}
        variant="error"

          message={<span id="message-id">{this.state.errorMessage}</span>}
          action={[
              <IconButton
                key="close"
                arial-label="Close"
                color="inherit"
                onClick={this.closeError}
              >
                <CloseIcon />
              </IconButton>
          ]} />
      </div>
    )
  }
}

export default withRouter(FeedPage)
