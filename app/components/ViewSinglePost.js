import React, { useEffect, useState, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Page from "./Page"
import Axios from "axios"
import LoadingDotsIcon from "./LoadingDotsIcon"
import ReactMarkdown from "react-markdown"
import ReactTooltip from "react-tooltip"
import StateContext  from "../StateContext"
import DispatchContext  from "../DispatchContext"

const ViewSinglePost = () => {

  const navigate = useNavigate()
  const appState = useContext(StateContext) 
  const appDispatch = useContext(DispatchContext) 
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, {
          cancelToken: ourRequest.token
        })
        setPost(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("There is a problem.")
      }
    }
    fetchPost()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    )
  console.log(LoadingDotsIcon)

  const date = new Date(post.createdDate)
  const dateFormatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`

  function isOwner() {
    if (appState.loggedIn){
      return appState.user.username == post.author.username
    }
    return false
  }

  async function deleteHandler () {
    const areYouSure = window.confirm("Do you really want to delete this post?")
    if (areYouSure) {
      try {
        const response = await Axios.delete(`/post/${id}`,{data: {token:appState.user.token}} )
        if (response.data == "Success"){
          //1. display flash message
          appDispatch({type: "flashMessage", value: "Post was successfully deleted."})

          //2. redirect back to current users post
          navigate(`/profile/${appState.user.username }`)
        }
      } catch (error) {
        console.log("There was a problem")
        
      }
    }
  }
  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner() && (
          <span className="pt-2">
            <Link
              to={`/post/${post._id}/edit`}
              data-tip="Edit"
              data-for="edit"
              className="text-primary mr-2">
              <i className="fas fa-edit"></i>
            </Link>
            <ReactTooltip id="edit" className="custom-tooltip" />
            {"  "}
            <a onClick={deleteHandler}
              data-tip="Delete"
              data-for="delete"
              className="delete-post-button text-danger"
            >
              <i className="fas fa-trash"></i>
            </a>
            <ReactTooltip id="delete" className="custom-tooltip" />
          </span>
        )}
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        {"  "}
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on {dateFormatted}
      </p>
      <div className="body-content">
        <ReactMarkdown children={post.body} />
      </div>
    </Page>
  )
}

export default ViewSinglePost
