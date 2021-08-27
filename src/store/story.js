import update from 'immutability-helper';

const storyReducer = (state, action) => {

    const { pageNum, pages } = state;

    switch (action.type) {
        case 'UNDO_PAINTING':
            {
                const pageToAlter = { ...pages[pageNum] };
                pageToAlter.paintingIndex -= 1;
                pages[pageNum] = pageToAlter;
                return { pageNum, pages }
            }
        case 'REDO_PAINTING':
            {
                const pageToAlter = { ...pages[pageNum] };
                pageToAlter.paintingIndex += 1;
                pages[pageNum] = pageToAlter;
                return { pageNum, pages }
            }
        case 'ADD_PAINTING':
            {
                const oldPage = { ...state.pages[state.pageNum] };
                const oldPaintings = oldPage.paintings;
                const newState = oldPaintings.concat(action.painting)
                const updatedPage = {
                    description: '',
                    paintingIndex: newState.length - 1,
                    paintings: newState
                }
                const pages = state.pages[state.pageNum] = updatedPage
                return { ...state }
            }
        case 'NEXT_PAGE':
            {
                const newCurrentPage = pageNum + 1;
                return { ...state, pageNum: newCurrentPage };
            }
        case 'PREV_PAGE':
            {
                const newCurrentPage = pageNum - 1;
                return { ...state, pageNum: newCurrentPage };
            }
        case 'ADD_PAGE':
            {
                const oldPages = [...state.pages]
                const pageNum = oldPages.length;
                oldPages.push({ description: '', paintingIndex: 0, paintings: [] })
                return { pageNum, pages: oldPages };
            }
        default:
            alert('No action for this type')
    }
}



export default storyReducer;