import update from 'immutability-helper';

const storyReducer = (state, action) => {

    const { pages } = state;
    const { edit, pageNum } = action.payload;

    switch (action.type) {
        case 'UNDO_PAINTING':
            {
                const oldPages = [...state.pages]
                oldPages[pageNum].editIndex--;
                return { pages: oldPages }
            }
        case 'REDO_PAINTING':
            {
                const oldPages = [...state.pages]
                oldPages[pageNum].editIndex++;
                return { pages: oldPages }
            }
        case 'ADD_PAINTING':
            {
                pages[pageNum].edits.push(edit);
                pages[pageNum].editIndex++;
                return { ...state }
            }
        case 'ADD_PAGE':
            {
                const oldPages = [...state.pages]
                console.log(oldPages)
                oldPages.push({ description: '', editIndex: 0, edits: [] })
                console.log(oldPages)
                return { pages: oldPages };
            }
        default:
            alert('No action for this type')
    }
}



export default storyReducer;