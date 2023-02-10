import {defineStore} from "pinia";
import tasks from "../data/tasks";

export const useTasksStore = defineStore("tasksStore", {
    state: () => {
        return {
            tasks: tasks,
        }
    },
    getters:{
        getItemById: (state) => {
            return (id) => {
                const index = state.tasks.findIndex( item => item.id == id );
                if (index !== -1)  return state.tasks[index];
                return null
            }
        },
        getMyTasks: (state) => {
            return (user_id) => {
                const index = state.tasks.findIndex( item => item.id == id );
                if (index !== -1)  return state.tasks[index];
                return null
            }
        }
    },
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        on() {
            this.preloader = true;
        },
        off() {
            this.preloader = false;
        },
    },
    persist: true
})