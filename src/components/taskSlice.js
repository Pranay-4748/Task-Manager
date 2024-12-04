import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filteredTasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.filteredTasks = [...state.tasks];
    },
    editTask: (state, action) => {
      const { index, task } = action.payload;
      state.tasks[index] = task;
      state.filteredTasks = [...state.tasks];
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
      state.filteredTasks = [...state.tasks];
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks[action.payload];
      task.completed = !task.completed;
      state.filteredTasks = [...state.tasks];
    },
    filterTasks: (state, action) => {
      switch (action.payload) {
        case 'Completed':
          state.filteredTasks = state.tasks.filter((task) => task.completed);
          break;
        case 'Pending':
          state.filteredTasks = state.tasks.filter((task) => !task.completed);
          break;
        case 'Overdue':
          const currentDate = new Date().toISOString().split('T')[0];
          state.filteredTasks = state.tasks.filter((task) => task.dueDate < currentDate && !task.completed);
          break;
        default:
          state.filteredTasks = [...state.tasks];
      }
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTaskCompletion, filterTasks } = taskSlice.actions;
export default taskSlice.reducer;
