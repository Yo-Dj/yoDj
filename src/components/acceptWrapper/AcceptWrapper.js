import React from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../header'
import RequestPage from './requestPage'
import DeliverPage from './deliverPage'

class AcceptWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'requestPage'
    }
    this.accept = this.accept.bind(this)
    this.decline = this.decline.bind(this)
    this.renderView = this.renderView.bind(this)
    this.goBackRequest = this.goBackRequest.bind(this)
    this.addToFirebase = this.addToFirebase.bind(this)
  }

  componentDidMount() {
    let {request} = this.props
    if (Object.keys(request).length === 0) {
      this.props.onGoBack()
      return
    }
    console.log('Accept Wrapper REQUEST ----> ', request)
    if (request.accepted) {
      this.setState({
        view: 'deliverPage'
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let {request} = this.props
    if (this.state.view ==='requestPage' && request.accepted) {
      this.setState({
        view: 'deliverPage'
      })
    }

    if (prevState.view === 'requestPage' && request.accepted) {
      this.setState({
        view: 'deliverPage'
      })
    }
  }

  accept() {
    this.props.onAccepted(this.props.request)
  }

  goBackRequest() {
    this.props.onGoBack()
  }

  decline(request) {
    console.log('DECLINE ----> ', request)
    this.props.onReject(request)
    this.props.history.push('/home')
  }

  addToFirebase() {
    this.props.onAddRequest(this.props.request)
  }

  renderView() {
    let {userInfo, request, onLogout, onGoBack} = this.props
    switch (this.state.view) {
      case 'requestPage':
        return (<RequestPage userInfo={userInfo} request={request} onLogout={onLogout} onGoBack={onGoBack} onAccept={this.accept} onDecline={this.decline} />)
      case 'deliverPage':
        return (<DeliverPage userInfo={userInfo} request={request} onLogout={onLogout} onGoBack={this.goBackRequest} onCompleteRequest={this.addToFirebase} onCompleteGoBack={onGoBack}/>)
      default:
        return (<RequestPage userInfo={userInfo} request={request} onLogout={onLogout} onGoBack={onGoBack} onDecline={this.decline} />)
    }
  }

  render() {
    let {userInfo} = this.props

    return (
      <div className="AcceptWrapper">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={true} />
        {this.renderView()}
      </div>
    )
  }
}

export default withRouter(AcceptWrapper)
