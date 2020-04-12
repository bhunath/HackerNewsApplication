import React, { Component } from 'react'
import Story from '../../components/Story/Story'
import classes from './StoriesContainer.module.css'
import axios from 'axios'
import Footer from '../../components/Footer/Footer'
import {isHideStory,getStoryPoints,hideStory,upvoteStory} from '../../service/HackerNewsApi'

class StoriesContainer extends Component {

    state = {
        stories: {
            hits: []
        },
        pageNumber: 1
    };

    componentDidMount() {
        if (this.state.stories.hits.length === 0) {
            axios.get(this.props.url + this.state.pageNumber).then((response => {
                console.debug(response);
                this.setState({ stories: response.data });
            }));
        }
    }

    fetchMoreStories = () => {
        let pageNum = this.state.pageNumber + 1;
        this.setState({ pageNumber: pageNum })
    }

    componentDidUpdate(nextprops, nextstate) {
        console.debug('StoriesContainer.js  |Component Updated ', nextprops, nextstate, this.state.pageNumber);
        if (nextstate.pageNumber !== this.state.pageNumber) {
            axios.get(this.props.url + this.state.pageNumber).then((response => {
                console.debug(response);
                this.setState({ stories: response.data });
            }));
        }
    }

    upvoteStory = (story) => {
        console.debug('StoryContainer.js | Upvote Story', story);
        const storyIndex = this.state.stories.hits.findIndex(s => {
            return (s.objectID === story.objectID);
        })

        console.debug('StoryContainer.js | Upvote Story ', storyIndex);
        let clonnedStory = { ...this.state.stories.hits[storyIndex] };
        console.debug('StoryContainer.js | Upvote Story ', story === clonnedStory)
        clonnedStory.points += 1;
        let clonnedStories = [...this.state.stories.hits];
        clonnedStories[storyIndex] = clonnedStory;
        this.setState(
            {
                stories: {
                    hits: clonnedStories
                }
            });
        upvoteStory(clonnedStory);
    }

    hideStory = (story, index) => {
        console.debug('StoryContainer.js | Hide Story', story);

        const storyIndex = this.state.stories.hits.findIndex(s => {
            return (s.objectID === story.objectID);
        })
        console.debug('StoryContainer.js | Hide Story ', index, storyIndex);
        let clonnedStory = { ...this.state.stories.hits[storyIndex] };
        console.debug('StoryContainer.js | Hide Story ', story === clonnedStory)
        clonnedStory.hide = true;
        let clonnedStories = [...this.state.stories.hits];
        clonnedStories[storyIndex] = clonnedStory;
        this.setState(
            {
                stories: {
                    hits: clonnedStories
                }
            });
        hideStory(clonnedStory);
    }

    render() {
        let stories = null;
        if (this.state.stories) {
            stories = this.state.stories.hits.filter(story => {
                return !isHideStory(story);
            }).map((story, index) => {
                let pointsFromStore = getStoryPoints(story);
                if (pointsFromStore) {
                    story.points = parseInt(pointsFromStore, 10);
                }
                return (
                    <Story
                        key={story.objectID}
                        story={story}
                        hide={() => { this.hideStory(story, index) }}
                        upvote={() => { this.upvoteStory(story) }}
                    />
                )
            })
        }
        return (
            <React.Fragment>
                <div className={classes.StoriesContainer} id="main">
                    <table>
                        <tbody>
                            {stories}
                        </tbody>
                    </table>
                    <div className={classes.More} onClick={this.fetchMoreStories}>More</div>
                    <hr></hr>
                    <footer >
                        <Footer ></Footer>
                    </footer>
                </div>
            </React.Fragment>
        );
    }

}

export default StoriesContainer;