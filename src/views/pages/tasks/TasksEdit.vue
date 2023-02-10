<script setup>
import Layout from '../../../layouts/Main.vue'
import { useRoute, useRouter } from 'vue-router';
import {useTasksStore} from "../../../stores/tasksStore";
import {onMounted} from "vue";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const tasksStore = useTasksStore()

const tasks = tasksStore.tasks

const submit = () => {
  router.push({name: 'tasks-index'})
}

const init = () => {

  // Post Content (Quill Editor)
  const configPostConent = {
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{header: 1}, {header: 2}], // custom button values
        [{list: "ordered"}, {list: "bullet"}],
        [{script: "sub"}, {script: "super"}], // superscript/subscript
        [{indent: "-1"}, {indent: "+1"}], // outdent/indent
        [{direction: "rtl"}], // text direction
        [{size: ["small", false, "large", "huge"]}], // custom dropdown
        [{header: [1, 2, 3, 4, 5, 6, false]}],
        [{color: []}, {background: []}], // dropdown with defaults from theme
        [{font: []}],
        [{align: []}],
        ["clean"], // remove formatting button
      ],
    },
    placeholder: "Enter your content...",
    theme: "snow",
  };

  const postConentEl = document.querySelector("#postConent");
  postConentEl._editor = new Quill(postConentEl, configPostConent);


  // Post Authors (Tom Select)
  const configassignUsers = {
    valueField: "id",
    searchField: "title",
    options: [
      {
        id: 1,
        name: "John Doe",
        job: "Web designer",
        src: "/src/assets/images/200x200.png",
      },
      {
        id: 2,
        name: "Emilie Watson",
        job: "Developer",
        src: "/src/assets/images/200x200.png",
      },
      {
        id: 3,
        name: "Nancy Clarke",
        job: "Software Engineer",
        src: "/src/assets/images/200x200.png",
      },
    ],
    placeholder: "Select the user",
    render: {
      option: function (data, escape) {
        return `<div class="flex space-x-3">
                      <div class="avatar w-8 h-8">
                        <img class="rounded-full" src="${escape(
            data.src
        )}" alt="avatar"/>
                      </div>
                      <div class="flex flex-col">
                        <span> ${escape(data.name)}</span>
                        <span class="text-xs opacity-80"> ${escape(
            data.job
        )}</span>
                      </div>
                    </div>`;
      },
      item: function (data, escape) {
        return `<span class="badge rounded-full bg-primary dark:bg-accent text-white p-px mr-2">
                      <span class="avatar w-6 h-6">
                        <img class="rounded-full" src="${escape(
            data.src
        )}" alt="avatar">
                      </span>
                      <span class="mx-2">${escape(data.name)}</span>
                    </span>`;
      },
    },
  };
  const assignUsersEl = document.querySelector("#assignUsers");
  assignUsersEl._tom = new Tom(assignUsersEl, configassignUsers);

  // Task Priority (Tom Select)
  const taskPriorityEl = document.querySelector("#taskPriority");
  taskPriorityEl._tom = new Tom(taskPriorityEl, {
    create: false,
    sortField: {field: "text", direction: "asc"},
  });

  // Task Project (Tom Select)
  const taskProjectEl = document.querySelector("#taskProject");
  taskProjectEl._tom = new Tom(taskProjectEl, {
    create: false,
    sortField: {field: "text", direction: "asc"},
  });

  // Post Tags (Tom Select)
  const taskTagsEl = document.querySelector("#taskTags");
  taskTagsEl._tom = new Tom(taskTagsEl, {
    valueField: "id",
    labelField: "title",
    searchField: "title",
    options: [
      {
        id: 1,
        title: "Update"
      }
      ,{
        id: 2,
        title: "Development"
      }
      ,{
        id: 3,
        title: "Design"
      }
      ,{
        id: 4,
        title: "Testing"
      }
    ],});

  // Task Dates (Flatpickr)
  const taskStartDateEl = document.querySelector("#taskStartDate");
  taskStartDateEl._datepicker = flatpickr(taskStartDateEl);

  const taskEndDateEl = document.querySelector("#taskEndDate");
  taskEndDateEl._datepicker = flatpickr(taskEndDateEl);
}

onMounted( () => {
  init()
})

</script>

<template>

  <Layout>
    <!-- Main Content Wrapper -->
    <main class="main-content w-full px-[var(--margin-x)] pb-8">
      <div
          class="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6"
      >
        <div class="flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="1.2"
                  d="m8 13 4.228 3.382a1 1 0 0 0 1.398-.148L22 6"/>
            <path fill="currentColor" fill-opacity=".3" fill-rule="evenodd"
                  d="m10.565 12.368 4.9-5.988a.6.6 0 0 0-.93-.76L9.644 11.6l.922.768Zm-2.533 3.096-.922-.769-.967 1.183a.4.4 0 0 1-.55.067L2.36 13.52a.6.6 0 0 0-.72.96l3.233 2.425a1.6 1.6 0 0 0 2.198-.267l.961-1.174Z"/>
          </svg>
          <h2
              class="text-xl font-medium text-slate-700 line-clamp-1 dark:text-navy-50"
          >
            New Task
          </h2>
        </div>
        <div class="flex justify-center space-x-2">
          <button
              class="btn min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
          >
            Save
          </button>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
        <div class="col-span-12 lg:col-span-8">
          <div class="card">
            <div class="tabs flex flex-col">
              <div class="p-4 sm:p-5">
                <div class="space-y-5">
                  <label class="block">
                    <span class="font-medium text-slate-600 dark:text-navy-100">Title</span>
                    <input
                        class="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                        placeholder="Enter title"
                        type="text"
                    />
                  </label>
                  <div>
                    <span
                        class="font-medium text-slate-600 dark:text-navy-100">Description
                    </span>
                    <div class="mt-1.5 w-full">
                      <div id="postConent" class="h-48"></div>
                    </div>
                  </div>

                  <label class="block">
                    <span class="font-medium text-slate-600 dark:text-navy-100"
                    >Assign Users
                    </span
                    >
                    <select
                        multiple
                        id="assignUsers"
                        class="mt-1.5 w-full"
                    ></select>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="card space-y-5 p-4 sm:p-5">
            <label class="block">
              <span class="font-medium text-slate-600 dark:text-navy-100">Priority</span>
              <select class="mt-1.5 w-full" id="taskPriority">
                <option value>Select the priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <label class="block">
              <span class="font-medium text-slate-600 dark:text-navy-100">Project</span>
              <select class="mt-1.5 w-full" id="taskProject">
                <option value>Select the project</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Flutter Rock">Flutter Rock</option>
              </select>
            </label>
            <label class="block">
              <span class="font-medium text-slate-600 dark:text-navy-100">Tags</span>
              <input
                  id="taskTags"
                  class="mt-1.5 w-full"
                  placeholder="Enter Tags"
              />
            </label>

            <label>
              <span class="font-medium text-slate-600 dark:text-navy-100"
              >Start Date
              </span
              >
              <span class="relative mt-1.5 flex">
                <input
                    id="taskStartDate"
                    class="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                    placeholder="Choose date..."
                    type="text"
                />
                <span
                    class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 transition-colors duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.5"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </span>
            </label>

            <label>
              <span class="font-medium text-slate-600 dark:text-navy-100"
              >End Date
              </span
              >
              <span class="relative mt-1.5 flex">
                <input
                    id="taskEndDate"
                    class="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                    placeholder="Choose date..."
                    type="text"
                />
                <span
                    class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 transition-colors duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.5"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<style scoped>


</style>
