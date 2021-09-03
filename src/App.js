import { createContext, useReducer, useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import Flowchart from './components/Flowchart/Flowchart';

import storyReducer from './store/story';

export const StoryContext = createContext();

function App() {
  
  const initialStoryState = {
    pages: [
      {
        text: ' ',
        editIndex: 0,
        edits: []
      }
    ]
  };

  const [pageNum, setPageNum] = useState(0);

  const changePageHandler = (pageNum) => {
    setPageNum(pageNum)
  }

  const [storyState, dispatchStory] = useReducer(storyReducer, initialStoryState)

  return (
      <StoryContext.Provider
        value={{
          storyState: storyState,
          dispatchStory: dispatchStory}}>
        <div className="App">
          <Canvas pageNum={pageNum} onPageChange={changePageHandler}/>
          <Flowchart pageNum={pageNum} onPageChange={changePageHandler}/>
        </div>
      </StoryContext.Provider>
  );
}

export default App;
