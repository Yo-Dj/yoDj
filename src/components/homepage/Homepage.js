import React from 'react'
import fire from '../../config/Fire'

class Homepage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      // console.log('User ---> ', user)
      if (user) {
        // console.log('User is Logged')
      } else {
        // console.log('User is NOT Logged IN')
      }
    })
  }

  render() {
    return (
      <div className="Homepage">
        Hello From Homepage
      </div>
    )
  }
}

export default Homepage
