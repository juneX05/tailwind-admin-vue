import {defineStore} from "pinia";

export const useGlobalStore = defineStore("globalStore", {
    state: () => {
        return {
            preloader: true
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
})