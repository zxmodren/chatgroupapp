
import { combineReducers } from "redux"
import { createErrorReducer, createISFetchingReducer } from './common'

const initialState = {
    user: null
};


const createLoginReducer = () =>
    combineReducers({
        isChecking: createISFetchingReducer('AUTH_LOGIN'),
        error: createErrorReducer('AUTH_LOGIN')
    })

const createRegisterReducer = () =>
    combineReducers({
        isChecking: createISFetchingReducer('AUTH_REGISTER'),
        error: createErrorReducer('AUTH_REGISTER')
    })

function loginReducer(state = { error: null }, action) {
    switch (action.type) {
        case 'AUTH_LOGIN_INIT':
            return { error: null };
        case 'AUTH_LOGIN_ERROR':
            return { error: action.error };
        default:
            return state;
    }
}

function registerReducer(state = { error: null }, action) {
    switch (action.type) {
        case 'AUTH_REGISTER_INIT':
            return { error: null };
        case 'AUTH_REGISTER_ERROR':
            return { error: action.error };
        default:
            return state;
    }
}

function authReducer (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

function createAuthReducer() {
   

    const user = (state = null, action) => {
        switch (action.type) {
            case 'AUTH_ON_ERROR':
            case 'AUTH_ON_INIT':
                return null;
            case 'AUTH_REGISTER_SUCCESS':
            case 'AUTH_LOGIN_SUCCESS':
            case 'AUTH_ON_SUCCESS':
                return action.user;
                case 'UPDATE_USER_DATA':
                    return {
                        ...state,
                        ...action.payload,
                    };
                    case 'UPDATE_USER_AVATAR':
                        return {
                            ...state,
                            avatar: action.payload,
                        };
                    default:
                    return state;
        }

    }

    const isChecking = (state = false, action) => {
        switch (action.type) {
            case 'AUTH_ON_INIT':
            case 'AUTH_REGISTER_INIT':
            case 'AUTH_LOGIN_INIT':
                return true;
            case 'AUTH_ON_ERROR':
            case 'AUTH_ON_SUCCESS':
            case 'AUTH_REGISTER_ERROR':
            case 'AUTH_LOGIN_ERROR':
                return false;
            default:
                return state;
        }

    }

    return combineReducers({
        user,
        isChecking: createISFetchingReducer('AUTH_ON'),
        login: createLoginReducer(),
        register: createRegisterReducer()
    })
}

export default createAuthReducer();

