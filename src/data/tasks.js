import {makeId} from "../assets/js/utils/helpers";

const tasks = [
    {
        id: 'task-' + makeId(16),
        title: 'Design UI'
        ,description: 'Design UI for Factory App. This will help us in generating required resources for the customers to know what is going to happen'
        ,completed: false
        ,completed_date: null
        ,due_date: '2022-05-01 07:00'
        ,tags: ['Update', 'Design']
        ,priority: 'low'
        ,project: null
        ,assigned: [
            { id: 1, name: 'Jane Doe', profile_pic: '/src/assets/images/200x200.png'},
            { id: 2, name: 'Joseph Doe', profile_pic: null },
            { id: 3, name: 'Jack Doe', profile_pic: null },
            { id: 4, name: 'Pete Doe', profile_pic: '/src/assets/images/200x200.png'},
            { id: 5, name: 'Hansen Doe', profile_pic: null }
        ]
        , steps : [
            {title:'Step 1',completed:false}
            ,{title:'Step 2',completed:true}
            ,{title:'Step 3',completed:true}
            ,{title:'Step 4',completed:false}
            ,{title:'Step 5',completed:false}
        ]
        , files : [
            {name:'Image001',type:'image', size: '1.2 KB'}
            ,{name:'Video002',type:'video', size: '198 MB'}
            ,{name:'Image003',type:'image', size: '4 MB'}
            ,{name:'Document002',type:'document', size: '40 MB'}
            ,{name:'Video004',type:'video', size: '30 MB'}
        ]
    }
    ,{
        id: 'task-' + makeId(16),
        title: 'Unit Testing'
        ,description: 'Dog Tracker APP module register app needs to be tested.'
        ,completed: true
        ,completed_date: '2022-05-01 06:52'
        ,due_date: '2022-05-01 07:00'
        ,tags: ['Testing']
        ,priority: 'high'
        ,project: 'Dog Tracker App'
        ,assigned: [
            { id: 1, name: 'Jane Doe', profile_pic: '/src/assets/images/200x200.png'},
            { id: 4, name: 'Pete Doe', profile_pic: '/src/assets/images/200x200.png'},
            { id: 5, name: 'Hansen Doe', profile_pic: null }
        ]
        , steps : [
            {title:'Step 1',completed:true}
            ,{title:'Step 2',completed:true}
            ,{title:'Step 3',completed:true}
            ,{title:'Step 4',completed:true}
        ]
        , files : [
            {name:'Image001',type:'image', size: '1.2 KB'}
            ,{name:'Video002',type:'video', size: '198 MB'}
            ,{name:'Image003',type:'image', size: '4 MB'}
            ,{name:'Document002',type:'document', size: '40 MB'}
            ,{name:'Video004',type:'video', size: '30 MB'}
        ]
    }
    ,{

        id: 'task-' + makeId(16),
        title: 'API Documentation'
        ,description: 'The API needs to be documented so that to ease the pressure for the frontend developers on how to utilize the system'
        ,completed: true
        ,completed_date: '2022-05-01 06:52'
        ,due_date: '2022-05-01 07:00'
        // ,due: {date: '2022-05-01', time: '07:00'}
        // ,steps: { total: 10, completed: 5}
        // ,completed_date: {date: '2022-05-01', time: '07:00'}
        ,tags: ['Documentation', 'Update']
        ,priority: 'high'
        ,project: 'Factory App'
        ,assigned: [
            { id: 2, name: 'Joseph Doe', profile_pic: null },
            { id: 3, name: 'Jack Doe', profile_pic: null },
            { id: 4, name: 'Pete Doe', profile_pic: '/src/assets/images/200x200.png'},
        ]
        , steps : [
            {title:'Step 1',completed:true}
            ,{title:'Step 2',completed:true}
        ]
        , files : [
            {name:'Image001',type:'image', size: '1.2 KB'}
            ,{name:'Video002',type:'video', size: '198 MB'}
            ,{name:'Image003',type:'image', size: '4 MB'}
            ,{name:'Document002',type:'document', size: '40 MB'}
            ,{name:'Video004',type:'video', size: '30 MB'}
        ]
    }
]

export default tasks