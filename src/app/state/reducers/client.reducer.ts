import { createReducer, on } from '@ngrx/store';
import {createClient, createdClient, loadClients, loadedClients} from '@app/state/actions/clients.actions';
import {ClientsState} from '@app/core/api/models/client/client.state';

// TODO: Estado Inicial
export const initialState: ClientsState = {
    closeModal: false,
    loading: false,
    clients: []
};

// TODO: Reducers
export const clientsReducer = createReducer(
    initialState,
    on(loadClients, (state) => {
        return { ... state, loading: true }
    }),
    on(loadedClients, (state, { clients }) => {
        return {
            ...state,
            loading: false,
            clients
        };
    }),
    on(createClient, (state) => {
        return { ... state, loading: true, closeModal: false }
    }),
    on(createdClient, (state, { client }) => {
        return {
            ... state,
            loading: false,
            closeModal: true,
            clients: [
                ...state.clients,
                client
            ]
        };
    })
)

// export const initialState: ReadonlyArray<ClientModel> = [];
// import { addBook, removeBook } from './books.actions';
//
// export const initialState: ReadonlyArray<string> = [];
//
// export const collectionReducer = createReducer(
//     initialState,
//     on(removeBook, (state, { bookId }) => state.filter((id) => id !== bookId)),
//     on(addBook, (state, { bookId }) => {
//         if (state.indexOf(bookId) > -1) return state;
//
//         return [...state, bookId];
//     })
// );
