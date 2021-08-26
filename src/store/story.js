
const storyReducer = (state, action) => {
    switch (action.type) {
        case 'UNDO_PAINTING':
            return { ...state };
        case 'REDO_PAINTING':
            return { ...state };
        case 'ADD_PAINTING':
            return { ...state };
        case 'NEXT_PAGE': {
            let newCurrentPage = state.pageNum + 1;
            return { ...state, pageNum: newCurrentPage };
        }
        case 'PREV_PAGE':
            let newCurrentPage = state.pageNum - 1;
            return { ...state, pageNum: newCurrentPage };
        case 'ADD_PAGE':
            const oldPages = [...state.pages]
            const pageNum = oldPages.length + 1;
            oldPages.push({ description: '', paintingIndex: 0, paintings: [] })

            return { pageNum, pages: oldPages };
        default:
        // throw new Error('Unexpected case');
    }
}



export default storyReducer;