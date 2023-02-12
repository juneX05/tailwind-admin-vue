import {defineStore} from "pinia";
import tasks from "../data/tasks";
import {makeId} from "../assets/js/utils/helpers";

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
        },
        validator: () => {
            return (data) => {
                let errors = {
                    count: 0,
                    data: {
                        title: '',
                        description: '',
                        assigned: '',
                        priority: '',
                        start_date: '',
                    }
                };

                if (data.title == "" || data.title == null || data.title == undefined) {
                    errors.count++
                    errors.data.title = 'Title is required'
                }

                if (data.description == "" || data.description == null || data.description == undefined) {
                    errors.count++
                    errors.data.description = 'Description is required'
                }

                if (data.assigned == null || data.assigned == undefined || data.assigned.length == 0) {
                    errors.count++
                    errors.data.assigned = 'Please select atleast one user'
                }

                if (data.priority == null || data.priority == undefined || data.priority == "" ) {
                    errors.count++
                    errors.data.priority = 'Please select task priority'
                }

                if (dayjs(data.start_date) > dayjs(data.end_date) ) {
                    errors.count++
                    errors.data.end_date = 'End Date is earlier than start date'
                }

                return errors
            }
        }
    },
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        save (data) {
            data.id = 'task-' + makeId(16)
            this.tasks.push(data)
        },
        off() {
            this.preloader = false;
        },
    },
    persist: true
})