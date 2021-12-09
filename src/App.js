import { createContext, useReducer, useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import Flowchart from './components/Flowchart/Flowchart';
import Navbar from './components/UI/Navbar/Navbar';

import storyReducer from './store/story';

import './App.css';
import Title from './components/Canvas/Title/Title';

export const StoryContext = createContext();

function App() {

  const initialStoryState = {
    title: '',
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


  return (
    <>
      <Navbar />
      <StoryContext.Provider
        value={{
          storyState,
          dispatchStory
        }}>
        <Title/>
        <div className="App">
          <Canvas pageNum={pageNum} onPageChange={changePageHandler} />
          <Flowchart pageNum={pageNum} onPageChange={changePageHandler} />
        </div>
      </StoryContext.Provider>
    </>
  );
}

export default App;
