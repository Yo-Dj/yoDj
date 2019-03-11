import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import LoginWrapper from 'src/components/loginWrapper'
import MainPage from 'src/components/mainPage'

ReactDOM.render((
  <BrowserRouter>
    <MainPage />
  </BrowserRouter>
), document.getElementById('root'))
