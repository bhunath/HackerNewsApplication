import React, { Component } from 'react'
import Story from '../../components/Story/Story'
import classes from './StoriesContainer.module.css'
import axios from 'axios'
import Footer from '../../components/Footer/Footer'

class StoriesContainer extends Component {

    state = {
        stories: {
            hits: []
        },
        pageNumber: 1
    };

    componentDidMount() {
        if (this.state.stories.hits.length == 0) {
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
        if (nextstate.pageNumber != this.state.pageNumber) {
            axios.get(this.props.url + this.state.pageNumber).then((response => {
                console.debug(response);
                this.setState({ stories: response.data });
            }));
        }
    }

    upvoteStory = (story) => {
        console.debug('StoryContainer.js | Upvote Story', story);

        const storyIndex = this.state.stories.hits.findIndex(s => {
            return (s.objectID == story.objectID);
        })

        console.debug('StoryContainer.js | Upvote Story ', storyIndex);
        let clonnedStory = { ...this.state.stories.hits[storyIndex] };
        console.debug('StoryContainer.js | Upvote Story ', story == clonnedStory)
        clonnedStory.points += 1;
        let clonnedStories = [...this.state.stories.hits];
        clonnedStories[storyIndex] = clonnedStory;
        this.setState(
            {
                stories: {
                    hits: clonnedStories
                }
            });
        localStorage.setItem(story.objectID, story.points + 1);
    }

    hideStory = (story, index) => {
        console.debug('StoryContainer.js | Hide Story', story);

        const storyIndex = this.state.stories.hits.findIndex(s => {
            return (s.objectID == story.objectID);
        })
        console.debug('StoryContainer.js | Hide Story ', index, storyIndex);
        let clonnedStory = { ...this.state.stories.hits[storyIndex] };
        console.debug('StoryContainer.js | Hide Story ', story == clonnedStory)
        clonnedStory.hide = true;
        let clonnedStories = [...this.state.stories.hits];
        clonnedStories[storyIndex] = clonnedStory;
        this.setState(
            {
                stories: {
                    hits: clonnedStories
                }
            });
        let hidedStories = JSON.parse(localStorage.getItem("HidedStories"));
        if (hidedStories) {
            hidedStories.push(story.objectID)
        } else {
            hidedStories = [story.objectID]
        }
        localStorage.setItem("HidedStories", JSON.stringify(hidedStories));
    }

    render() {
        let stories = null;
        let hidedStories = JSON.parse(localStorage.getItem("HidedStories"));
        if (this.state.stories) {
            stories = this.state.stories.hits.filter(story => {
                if (true == story.hide) {
                    return false;
                } else if (hidedStories && hidedStories.includes(story.objectID)) {
                    return false;
                }
                return true;
            }).map((story, index) => {
                const pointsFromStore = localStorage.getItem(story.objectID);
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