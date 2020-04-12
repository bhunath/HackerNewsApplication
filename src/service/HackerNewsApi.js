
export function isHideStory(story){
    let hidedStories = JSON.parse(localStorage.getItem("HidedStories"));
    if (true === story.hide) {
        return true;
    } else if (hidedStories && hidedStories.includes(story.objectID)) {
        return true;
    }
    return false;
}


export function getStoryPoints(story) {
    const pointsFromStore = localStorage.getItem(story.objectID);
    return pointsFromStore;
}


export function hideStory(story) {
    let hidedStories = JSON.parse(localStorage.getItem("HidedStories"));
    if (hidedStories) {
        hidedStories.push(story.objectID)
    } else {
        hidedStories = [story.objectID]
    }
    localStorage.setItem("HidedStories", JSON.stringify(hidedStories));
}

export function upvoteStory(story){
    localStorage.setItem(story.objectID, story.points + 1);
}

