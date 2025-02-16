import { createContext, useReducer, useEffect } from "react";
export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            };
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            };
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state;
    }
};

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    });

    // Only dispatch the action once on component mount
    useEffect(() => {
        dispatch({ type: 'SET_WORKOUTS', payload: [{}, {}] });
    }, []); // The empty array ensures it runs only once when the component mounts

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};
