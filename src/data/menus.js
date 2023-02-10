import icons from "./icons";

const menus = [
    {
        type: 'header',
        title: 'MENU',
        name: 'menu'
    },
    {
        type: 'link',
        link: '/dashboard',
        title: 'Dashboard',
        name: 'dashboard',
        icon: icons.dashboard
    },
    {
        type: 'link',
        link: '/my-tasks',
        title: 'My Tasks',
        name: 'my_tasks',
        icon: icons.home
    },
    {
        type: 'link',
        link: '#',
        title: 'Tasks',
        name: 'tasks',
        icon: icons.task,
        children: [
            {
                type: 'link',
                link: '/tasks/index',
                title: 'All Tasks',
                name: 'all_tasks',
                icon: icons.home
            },
            {
                type: 'link',
                link: '/tasks/create',
                title: 'Create Task',
                name: 'create_task',
                icon: icons.home
            }
        ]
    },
    {
        type: 'link',
        link: '#',
        title: 'Projects',
        name: 'projects',
        icon: icons.project,
        children: [
            {
                type: 'link',
                link: '/projects/index',
                title: 'All Projects',
                name: 'all_projects',
                icon: icons.home
            },
            {
                type: 'link',
                link: '/projects/create',
                title: 'Create Project',
                name: 'create_project',
                icon: icons.home
            }
        ]
    }
]

export default menus