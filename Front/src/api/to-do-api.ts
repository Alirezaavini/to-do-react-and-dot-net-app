import { api } from './api';
import { apiConfig } from './config';

export const toDoApi = {
    getToDo: () => api.call('get', `${apiConfig.toDoUrl}`),
    addTask: (data: CreateTaskRequestType) => api.call('post', `${apiConfig.toDoUrl}`, data),
    completeTask: (id: number) => api.call('post', `${apiConfig.toDoUrl}/${id}/complete`),
};
