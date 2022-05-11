import React, { createContext, useReducer } from "react";

const initialState = {
    columns: [
        { accessor: 'name', label: 'Name' },
        { accessor: 'price', label: 'Price' },
        { accessor: 'is_completed', label: 'Completed', format: (value) => (value ? '✔️' : '✖️') },
        { accessor: 'delete', label: 'Delete' },
        { accessor: 'view', label: 'View' },
    ],
    rows: [
        { id: 1, name: 'Item 1', price: 136, is_completed: true },
        { id: 2, name: 'Item 2', price: 240, is_completed: true },
        { id: 3, name: 'Item 3', price: 339, is_completed: false },
        { id: 4, name: 'Item 4', price: 40, is_completed: false },
        { id: 5, name: 'Item 5', price: 1000, is_completed: false },
        { id: 6, name: 'Item 6', price: 420, is_completed: true },
        { id: 7, name: 'Item 7', price: 361, is_completed: false },
    ],
    isLogin: false
};

const AppReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return {
                ...state,
                rows: [...state.rows, action.payload]
            };
        case "DELETE_ITEM":
            const rows = state.rows.filter(
                employee => employee.id !== action.payload
            );

            return {
                ...state,
                rows
            };
        case "LOGIN":
            return {
                ...state,
                isLogin: true
            };
        default:
            return state;
    }
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};
