import {defineStore} from "pinia";
import projects from "../data/projects";

export const useProjectsStore = defineStore("projectsStore", {
    state: () => {
        return {
            projects: projects,
        }
    },
    getters:{
        getItemById: (state) => {
            return (id) => {
                const index = state.projects.findIndex( item => item.id == id );
                if (index !== -1)  return state.projects[index];
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