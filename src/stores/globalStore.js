import {defineStore} from "pinia";
import icons from "../data/icons";
import menus from  "../data/menus"

export const useGlobalStore = defineStore("globalStore", {
    state: () => {
        return {
            preloader: true,
            menus: menus,
            icons: icons
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