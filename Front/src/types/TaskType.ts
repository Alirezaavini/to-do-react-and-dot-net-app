type TaskType = {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
};

type CreateTaskRequestType = {
    title: string;
    description: string;
};
