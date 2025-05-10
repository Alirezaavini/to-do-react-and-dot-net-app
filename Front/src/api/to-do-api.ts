import { api } from './api';
import { apiConfig } from './config';

export const ToDoApi = {
    getToDo: () => api.call('get', `${apiConfig.toDoUrl}`),
};
