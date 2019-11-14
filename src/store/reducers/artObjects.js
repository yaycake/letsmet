import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    artObjects: []
}
const startInitObjects = (state, action) => {
    return updateObject( state, {
        loading: false, 
    })
}

const initObjectsSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false, 
        artObjects: action.artObjects
    })
}

const initObjectsFailed = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.START_INIT_OBJECTS: 
            return startInitObjects(state, action)
        case actionTypes.INIT_OBJECTS_SUCCESS:
            return initObjectsSuccess(state, action)
        case actionTypes.INIT_OBJECTS_FAILED:
            return initObjectsFailed(state, action)
        default: 
            return state
    }
}

export default reducer;