import { useState, useEffect } from 'react'
import { getArticleById } from '../api'
import { useParams } from 'react-router'
import CommentsList from './CommentsList'
import { formatDate } from '../utils'
import VotesCounter from './VotesCounter'

const SingleArticle = (props) => {
    const { article_id } = useParams()
    const [singleArticle, setSingleArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [showComments, setShowComments] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id)
        .then((singleArticle) => {
            setSingleArticle(singleArticle)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
        })
    },[])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Sorry, there was an error</p>
    }

    function handleCommentsClick(event) {
        setShowComments(!showComments)
    }

    const articleDate = formatDate(singleArticle.created_at)

    return (
        <>
        <section id="single-article">
            <h2>{singleArticle.title}</h2>
            <h4>Topic: <span className='lighter'>{singleArticle.topic}</span></h4>
            <div>
                <img className="responsive" src={singleArticle.article_img_url}></img>
            </div>
            <p>By <span className='bold'>{singleArticle.author}</span> on {articleDate}</p>
            <p className='body-text'>{singleArticle.body}</p>
            <div className='votes-comments-line'>
                <VotesCounter article_id={article_id} votes={singleArticle.votes}/>
                <button onClick={ handleCommentsClick } className='comments-link'>Comments: </button><p><span className="lighter">{singleArticle.comment_count}</span></p>
            </div>
        </section>
        <CommentsList showComments={showComments} article_id={singleArticle.article_id}/>
        </>
        )
    }

export default SingleArticle

// <h4 className='votes'>Votes: </h4><p><span className='lighter'>{singleArticle.votes}</span></p>