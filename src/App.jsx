import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from './layout/Body'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Provider } from 'react-redux'
import store from './redux/Store'
import Feed from './pages/Feed'
import Profile from './pages/Profile'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>

  )
}

export default App