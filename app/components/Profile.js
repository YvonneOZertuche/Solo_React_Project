import React, { useEffect } from 'react'
import Page from './Page'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import StateContext from '../StateContext'

const Profile = () => {

  const {username} = useParams()

  return (
    <Page title="Profile Screen">
      <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action">
          <img
            className="avatar-tiny"
            src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
          />{" "}
          <strong>Example Post #1</strong>
          <span className="text-muted small">on 2/10/2020 </span>
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          <img
            className="avatar-tiny"
            src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
          />{" "}
          <strong>Example Post #2</strong>
          <span className="text-muted small">on 2/10/2020 </span>
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          <img
            className="avatar-tiny"
            src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
          />{" "}
          <strong>Example Post #3</strong>
          <span className="text-muted small">on 2/10/2020 </span>
        </a>
      </div>
    </Page>
  )
}

export default Profile