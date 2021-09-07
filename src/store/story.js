const storyReducer = (state, action) => {

    const { pages } = state;
    const { edit, pageNum } = action.payload;

    switch (action.type) {
        case 'UNDO_PAINTING':
            {
                const oldPages = [...state.pages]
                oldPages[pageNum].editIndex--;
                return { ...state, pages: oldPages }
            }
        case 'REDO_PAINTING':
            {
                const oldPages = [...state.pages]
                oldPages[pageNum].editIndex++;
                return { ...state, pages: oldPages }
            }
        case 'ADD_PAINTING':
            {
                const oldPages = [...state.pages]
                oldPages[pageNum].edits.splice(oldPages[pageNum].editIndex)
                pages[pageNum].edits.push(edit);
                pages[pageNum].editIndex++;
                return { ...state, pages: oldPages }
            }
        case 'ADD_PAGE':
            {
                const oldPages = [...state.pages]
                oldPages.push({ text: '', editIndex: 0, edits: [] })
                return { ...state, pages: oldPages };
            }
        case 'UPDATE_TEXT':
            {
                const oldPages = [...state.pages]
                oldPages[pageNum].text = action.payload.text
                return { ...state, pages: oldPages }
            }
            case 'UPDATE_TITLE':
                {
                    state.title = action.payload.title;
                    return { ...state }
                }
        default:
            alert('No action for this type')
    }
}



export default storyReducer;