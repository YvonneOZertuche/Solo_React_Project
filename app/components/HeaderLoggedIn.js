import React, {useContext} from "react"
import { Link } from 'react-router-dom'
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'

const HeaderLoggedIn = (props) => {

  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function handleLogout() {
    appDispatch({type: "logout"})
  }
  return (
    <div className="flex-row my-3 my-md-0">
      {/* <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span> */}
      <Link to={`/profile/${appState.user.username}`} className="mr-2">
        <img
          className="tiny-avatar"
          src={appState.user.avatar} />
      </Link>
      <Link className="btn btn-large btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleLogout} className="btn btn-large btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

export default HeaderLoggedIn
