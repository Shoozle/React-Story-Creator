const initState = { index: 0 };

function indexReducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { index: state.index + 1 };
        case 'decrement':
            return { index: state.index - 1 };
        default:
            throw new Error();
    }
}

export {indexReducer};