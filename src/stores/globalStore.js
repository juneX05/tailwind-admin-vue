import {defineStore} from "pinia";
import icons from "../data/icons";
import menus from  "../data/menus"
import users from  "../data/users"
import tags from  "../data/tags"

export const useGlobalStore = defineStore("globalStore", {
    state: () => {
        return {
            preloader: true,
            menus: menus,
            icons: icons,
            users: users,
            tags: tags,
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
        login: () => {
            return (data) => {
                const user = users.filter(item => {
                    return item.email === data.email && item.password === data.password
                })

                if (user.length > 0) return {
                    status: true,
                    message: "Login Successful"
                }
                else return {
                    status: false,
                    message: "Incorrect Username or password"
                }
            }
        }
    },
    persist: true
})