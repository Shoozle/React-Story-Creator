import { createContext, useReducer, useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import Flowchart from './components/Flowchart/Flowchart';
import Navbar from './components/UI/Navbar/Navbar';

import storyReducer from './store/story';

import './App.css';

export const StoryContext = createContext();

function App() {

  const [storyTitle, setStoryTitle] = useState('');

  const initialStoryState = {
    title: storyTitle,
    pages: [
      {
        text: '',
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

  const onUpdateTitle = (e) => {
    setStoryTitle(e.target.value)
  }

  return (
    <>
      <Navbar />
      <StoryContext.Provider
        value={{
          storyState,
          dispatchStory
        }}>
        <input
          className="StoryTitle"
          placeholder="Story title"
          type="text"
          onChange={onUpdateTitle}
          value={storyTitle}
        />
        <div className="App">
          <Canvas pageNum={pageNum} onPageChange={changePageHandler} />
          <Flowchart pageNum={pageNum} onPageChange={changePageHandler} />
        </div>
      </StoryContext.Provider>
    </>
  );
}

export default App;
