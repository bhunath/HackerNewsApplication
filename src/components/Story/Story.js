import React from 'react'
import classes from './Story.module.css'
import { BrowserRouter } from 'react-router-dom';

const story = (props) => {
    var url = '';
    if (props.story.url) {
        var pathArray = props.story.url.split('/');
        var protocol = pathArray[0];
        var host = pathArray[2];
        url = host;
    }


    const currentDateTime = new Date().getTime();
    const storyCreatedTime = new Date(props.story.created_at).getTime();
    const dayAgo = (currentDateTime - storyCreatedTime) / (1000 * 60 * 60 * 24);
    const hourAgo = (currentDateTime - storyCreatedTime) / (1000 * 60 * 60);
    const minuteAgo = (currentDateTime - storyCreatedTime) / (1000 * 60);
    const storyPostedTime = dayAgo >= 1 ? Math.trunc(dayAgo) + ' day' : (hourAgo >= 1 ? Math.trunc(hourAgo) + ' hour' : Math.trunc(minuteAgo) + ' minute');

    return (
        <React.Fragment>
            <tr className={classes.Story}>
                <td className={classes.Comments} >
                    <span>{props.story.num_comments}.</span>
                </td>
                <td>
                    <center>
                        <div className={classes.VoteArrow} onClick={props.upvote}></div>
                    </center>
                </td>
                <td>
                    <span className={classes.Title}>{props.story.title}
                        <a href={props.story.url}>({url})</a>
                    </span>
                </td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td  className={classes.MetaInfo}>
                    <small>
                        <span className={classes.MetaInfo}>
                           <small> {props.story.points} points by <strong>{props.story.author} {storyPostedTime} </strong> ago</small>
                        </span>
                        <span className={classes.Hide} onClick={props.hide}>
                            <small> hide |</small>
                        </span>
                        <span  onClick={props.hide}>
                            <small> {props.story.num_comments} comments </small>
                        </span>
                    </small>
                </td>

            </tr>
        </React.Fragment>
    );
}

export default story;