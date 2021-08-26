import update from 'immutability-helper';

const storyReducer = (state, action) => {

    switch (action.type) {
        case 'UNDO_PAINTING':
            const newState = {...state};
            console.log(newState)
            return { ...state };
        case 'REDO_PAINTING':
            return { ...state };
        case 'ADD_PAINTING':
            {
                console.log(action.painting)
                const oldPage = { ...state.pages[state.pageNum] };
                const oldPaintings = oldPage.paintings;
                const newState = oldPaintings.concat(action.painting)
                const updatedPage = {
                    description: '',
                    paintingIndex: newState.length - 1,
                    paintings: newState
                }
                const pages = state.pages[state.pageNum] = updatedPage
                console.log(updatedPage)
                return { ...state}
            }
        case 'NEXT_PAGE':
            {
                let newCurrentPage = state.pageNum + 1;
                return { ...state, pageNum: newCurrentPage };
            }
        case 'PREV_PAGE':
            {
                let newCurrentPage = state.pageNum - 1;
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