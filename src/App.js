import { createContext, useReducer } from 'react';
import Canvas from './components/Canvas/Canvas';
import Flowchart from './components/Flowchart/Flowchart';
import storyReducer from './store/story';

export const StoryContext = createContext();

function App() {
  
  const initialStoryState = {
    pages: [
      {
        description: '',
        editIndex: 0,
        edits: []
      }
    ]
  };

  const [storyState, dispatchStory] = useReducer(storyReducer, initialStoryState)

  return (
    <StoryContext.Provider
      value={{storyState: storyState, pageNum: 0, dispatchStory: dispatchStory}}>
      <div className="App">
        <Canvas />
        <Flowchart />
      </div>
    </StoryContext.Provider>
  );
}

export default App;
