import React from 'react'
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
  }

  accept() {
    this.setState({
      view: 'deliverPage'
    })
  }

  goBackRequest() {
    this.setState({
      view: 'requestPage'
    })
  }

  decline() {
  }

  renderView() {
    let {userInfo, request, onLogout, onGoBack} = this.props
    switch (this.state.view) {
      case 'requestPage':
        return (<RequestPage userInfo={userInfo} request={request} onLogout={onLogout} onGoBack={onGoBack} onAccept={this.accept} />)
      case 'deliverPage':
        return (<DeliverPage userInfo={userInfo} request={request} onLogout={onLogout} onGoBack={this.goBackRequest} />)
      default:
        return (<RequestPage userInfo={userInfo} request={request} onLogout={onLogout} onGoBack={onGoBack} />)
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

export default AcceptWrapper
