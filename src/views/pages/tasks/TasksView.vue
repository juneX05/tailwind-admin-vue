<script setup>
import Layout from '../../../layouts/Main.vue'
import {useRoute, useRouter} from 'vue-router';
import {useTasksStore} from "../../../stores/tasksStore";
import {onMounted} from "vue";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const tasksStore = useTasksStore()

const task_id = route.params.id;
const task = tasksStore.getItemById(task_id);

const submit = () => {
  router.push({name: 'tasks-index'})
}

const init = () => {

// Todolist Drag & Drop
  const todoList = document.querySelector("#todo-list");

  todoList._sortable = Sortable.create(todoList, {
    animation: 200,
    easing: "cubic-bezier(0, 0, 0.2, 1)",
    direction: "vertical",
    delay: 150,
    delayOnTouchOnly: true,
  });

  new Modal('#newStep')
  new Modal('#editStep')
  new Modal('#deleteStep')

  new Modal('#newFile')
  new Modal('#deleteFile')
  new Modal('#viewFile')

  new Modal('#manageUsers')

  // Todo Checkbox
  const todoCheckbox = document.querySelectorAll(".todo-checkbox");

  todoCheckbox.forEach((node) => {
        node.disabled = 'disabled';
        node.addEventListener("click", (e) => e.stopPropagation())
      }
  );

  // Media Tags Dropdown
  new PopperMultiple(".popper-multiple", ".popper-ref", ".popper-root", {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ],
  });


  // Task Files (Filepond)
  const taskFileEl = document.querySelector("#taskFile");
  taskFileEl._filepond = FilePond.create(taskFileEl);

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
}

onMounted(() => {
  init()
})

</script>

<template>

  <Layout>

    <!-- Main Content Wrapper -->

    <main class="main-content todo-app w-full px-[var(--margin-x)] pb-8">
      <div class="flex items-center justify-between py-5">
        <div class="w-full">
          <div class="flex flex-col md:flex-row mb-2 justify-between">

            <div class="flex flex-col items-center justify-center md:flex-row space-x-2">
              <router-link
                  :to="{ name:'tasks-index' }"
                  class="flex h-8 p-4 items-center justify-center rounded-lg bg-info/10 text-slate-600 dark:text-info"
              >
                <i class="fa fa-arrow-left text-base mr-2"></i> Back
              </router-link>
              <p class="text-xl mt-1 sm:mt-0 font-medium text-slate-800 dark:text-navy-50">
                {{ task.title }}
              </p>
            </div>

            <div
                class="flex flex-wrap mt-2 sm:mt-0 space-x-1 sm:space-x-1 space-y-1 sm:space-y-0 items-center justify-center">
              <router-link
                  :to=" { name: 'tasks-edit', params: { id: task_id } } "
                  class="flex h-8 p-4 items-center justify-center rounded-lg bg-warning text-white"
              >
                <i class="fa fa-edit text-base mr-2"></i> Edit
              </router-link>

              <button
                  data-toggle="modal"
                  data-target="#newStep"
                  class="btn h-8 min-w-[7rem] m-0 bg-success font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                <i class="fa fa-check text-base mr-2"></i>
                Complete
              </button>

              <button
                  data-toggle="modal"
                  data-target="#newStep"
                  class="btn h-8 min-w-[7rem] bg-warning font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                <i class="fa fa-lock text-base mr-2"></i>
                Close
              </button>

              <button
                  data-toggle="modal"
                  data-target="#newStep"
                  class="btn h-8 min-w-[7rem] bg-black font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                <i class="fa fa-lock-open text-base mr-2"></i>
                Re-Open
              </button>
            </div>

          </div>


          <div class="flex mt-3 space-x-1">
            <div>Due Date:</div>
            <div
                class="badge bg-info/10 py-1 text-info dark:bg-info/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{{ task.due_date }}</span>
            </div>
          </div>

          <div class="flex flex-wrap mt-1">

            <div v-for="(tag, index) in task.tags" :key="index"
                 class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
            >
              {{ tag }}
            </div>

          </div>


          <p v-html="task.description" class="mt-3 text-sm"></p>
        </div>
      </div>
      <div
          class="mt-4 grid grid-cols-12 gap-4 transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:gap-6 "
      >
        <div class="col-span-12">
          <div class="flex justify-between">
            <div class="flex items-center justify-start">
              <h2
                  class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
              >
                TASK STEPS
              </h2>
              <div
                  class="ml-2 badge space-x-1 bg-error/10 py-1 px-1.5 text-error dark:bg-error/15"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>1/5</span>
              </div>
            </div>
            <button
                data-toggle="modal"
                data-target="#newStep"
                class="btn h-8 min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
            >
              <i class="fa fa-plus-circle text-base mr-2"></i>
              Add Step
            </button>
          </div>

          <div class="card mt-3 space-y-3.5 p-4 text-xs+">
            <div id="todo-list">


              <div
                  class="border-b border-slate-150 py-3 dark:border-navy-500"
              >
                <div class="group flex items-center justify-between">
                  <div class="flex items-center space-x-2 sm:space-x-3">
                    <label class="flex">
                      <input
                          type="checkbox"
                          class="todo-checkbox form-checkbox is-outline h-5 w-5 rounded-full border-slate-400/70 before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent"
                      />
                    </label>
                    <h2
                        class="cursor-pointer text-slate-600 line-clamp-1 dark:text-navy-100"
                    >
                      Step 1
                    </h2>
                  </div>

                  <div class="popper-multiple">
                    <button
                        class="popper-ref btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                      >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    <div class="popper-root">
                      <div
                          class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700"
                      >
                        <ul>
                          <li>
                            <a
                                data-target="#editStep"
                                data-toggle="modal"
                                href="#"
                                class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                            >Edit</a
                            >
                          </li>
                        </ul>
                        <div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                        <ul>
                          <li>
                            <a
                                data-target="#deleteStep"
                                data-toggle="modal"
                                href="#"
                                class="flex h-8 items-center text-error px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                            >
                              <i class="fa fa-trash-alt mr-2"></i>
                              Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div
                  class="border-b border-slate-150 py-3 dark:border-navy-500"
              >
                <div class="group flex items-center justify-between">
                  <div class="flex items-center space-x-2 sm:space-x-3">
                    <label class="flex">
                      <input
                          type="checkbox" checked
                          class="todo-checkbox form-checkbox is-outline h-5 w-5 rounded-full border-slate-400/70 before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent"
                      />
                    </label>
                    <h2
                        class="cursor-pointer text-slate-600 line-clamp-1 dark:text-navy-100"
                    >
                      Step 2
                    </h2>
                  </div>

                  <div class="popper-multiple">
                    <button
                        class="popper-ref btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                      >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    <div class="popper-root">
                      <div
                          class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700"
                      >
                        <ul>
                          <li>
                            <a
                                data-target="#editStep"
                                data-toggle="modal"
                                href="#"
                                class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                            >Edit</a
                            >
                          </li>
                        </ul>
                        <div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                        <ul>
                          <li>
                            <a
                                data-target="#deleteStep"
                                data-toggle="modal"
                                href="#"
                                class="flex h-8 items-center text-error px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                            >
                              <i class="fa fa-trash-alt mr-2"></i>
                              Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div
                  class="border-b border-slate-150 py-3 dark:border-navy-500"
              >
                <div class="group flex items-center justify-between">
                  <div class="flex items-center space-x-2 sm:space-x-3">
                    <label class="flex">
                      <input
                          type="checkbox" checked
                          class="todo-checkbox form-checkbox is-outline h-5 w-5 rounded-full border-slate-400/70 before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent"
                      />
                    </label>
                    <h2
                        class="cursor-pointer text-slate-600 line-clamp-1 dark:text-navy-100"
                    >
                      Step 3
                    </h2>
                  </div>

                  <div class="popper-multiple">
                    <button
                        class="popper-ref btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                      >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    <div class="popper-root">
                      <div
                          class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700"
                      >
                        <ul>
                          <li>
                            <a
                                data-target="#editStep"
                                data-toggle="modal"
                                href="#"
                                class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                            >Edit</a
                            >
                          </li>
                        </ul>
                        <div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                        <ul>
                          <li>
                            <a
                                data-target="#deleteStep"
                                data-toggle="modal"
                                href="#"
                                class="flex h-8 items-center text-error px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                            >
                              <i class="fa fa-trash-alt mr-2"></i>
                              Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div
                  class="border-b border-slate-150 py-3 dark:border-navy-500"
              >
                <div class="group flex items-center justify-between">
                  <div class="flex items-center space-x-2 sm:space-x-3">
                    <label class="flex">
                      <input
                          type="checkbox"
                          class="todo-checkbox form-checkbox is-outline h-5 w-5 rounded-full border-slate-400/70 before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent"
                      />
                    </label>
                    <h2
                        class="cursor-pointer text-slate-600 line-clamp-1 dark:text-navy-100"
                    >
                      Step 4
                    </h2>
                  </div>

                  <div class="popper-multiple">
                    <button
                        class="popper-ref btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                      >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    <div class="popper-root">
                      <div
                          class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700"
                      >
                        <ul>
                          <li>
                            <a
                                data-target="#editStep"
                                data-toggle="modal"
                                href="#"
                                class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                            >Edit</a
                            >
                          </li>
                        </ul>
                        <div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                        <ul>
                          <li>
                            <a
                                data-target="#deleteStep"
                                data-toggle="modal"
                                href="#"
                                class="flex h-8 items-center text-error px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                            >
                              <i class="fa fa-trash-alt mr-2"></i>
                              Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div
                  class="border-b border-slate-150 py-3 dark:border-navy-500"
              >
                <div class="group flex items-center justify-between">
                  <div class="flex items-center space-x-2 sm:space-x-3">
                    <label class="flex">
                      <input
                          type="checkbox"
                          class="todo-checkbox form-checkbox is-outline h-5 w-5 rounded-full border-slate-400/70 before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent"
                      />
                    </label>
                    <h2
                        class="cursor-pointer text-slate-600 line-clamp-1 dark:text-navy-100"
                    >
                      Step 5
                    </h2>
                  </div>

                  <div class="popper-multiple">
                    <button
                        class="popper-ref btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                      >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                    <div class="popper-root">
                      <div
                          class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700"
                      >
                        <ul>
                          <li>
                            <a
                                data-target="#editStep"
                                data-toggle="modal"
                                href="#"
                                class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                            >Edit</a
                            >
                          </li>
                        </ul>
                        <div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                        <ul>
                          <li>
                            <a
                                data-target="#deleteStep"
                                data-toggle="modal"
                                href="#"
                                class="flex h-8 items-center text-error px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                            >
                              <i class="fa fa-trash-alt mr-2"></i>
                              Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>


            </div>
          </div>
        </div>
      </div>
      <div
          class="mt-2 grid grid-cols-12 gap-4 transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:gap-6"
      >
        <div class="col-span-12 lg:col-span-8 ">
          <div class="flex items-center justify-between">
            <h2
                class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
            >
              Files
            </h2>

            <button
                data-toggle="modal"
                data-target="#newFile"
                class="btn h-8 min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
            >
              <i class="fa fa-plus-circle text-base mr-2"></i>
              Add File
            </button>
          </div>
          <div class="card mt-3 space-y-3.5 p-4 text-xs+ h-[35vh] overflow-auto">

            <div class="group flex items-center justify-between">

              <div class="flex space-x-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                >


                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5.5 w-5.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                    <path
                        fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"
                    />
                  </svg>


                </div>
                <div>
                  <a href="#" class="text-slate-600 dark:text-navy-100"
                  >
                    Image001
                  </a
                  >
                  <div
                      class="mt-1 flex text-xs text-slate-400 dark:text-navy-300"
                  >
                    <p>
                      1.2 KB
                    </p>
                  </div>
                </div>

              </div>
              <div class="flex">
                <button
                    data-toggle="modal"
                    data-target="#viewFile"
                    class="popper-ref text-primary btn mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <i class="fa fa-eye"></i>
                </button>
                <button
                    data-toggle="modal"
                    data-target="#deleteFile"
                    class="popper-ref text-error btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <i class="fa fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <div class="group flex items-center justify-between">

              <div class="flex space-x-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                >


                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5.5 w-5.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                    <path
                        d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                    />
                  </svg>

                </div>
                <div>
                  <a href="#" class="text-slate-600 dark:text-navy-100"
                  >
                    Video002
                  </a
                  >
                  <div
                      class="mt-1 flex text-xs text-slate-400 dark:text-navy-300"
                  >
                    <p>
                      198 MB
                    </p>
                  </div>
                </div>

              </div>
              <div class="flex">
                <button
                    data-toggle="modal"
                    data-target="#viewFile"
                    class="popper-ref text-primary btn mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <i class="fa fa-eye"></i>
                </button>
                <button
                    data-toggle="modal"
                    data-target="#deleteFile"
                    class="popper-ref text-error btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <i class="fa fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <div class="group flex items-center justify-between">

              <div class="flex space-x-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                >


                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5.5 w-5.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                    <path
                        fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"
                    />
                  </svg>


                </div>
                <div>
                  <a href="#" class="text-slate-600 dark:text-navy-100"
                  >
                    Image003
                  </a
                  >
                  <div
                      class="mt-1 flex text-xs text-slate-400 dark:text-navy-300"
                  >
                    <p>
                      4 MB
                    </p>
                  </div>
                </div>

              </div>
              <div class="flex">
                <button
                    data-toggle="modal"
                    data-target="#viewFile"
                    class="popper-ref text-primary btn mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <i class="fa fa-eye"></i>
                </button>
                <button
                    data-toggle="modal"
                    data-target="#deleteFile"
                    class="popper-ref text-error btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <i class="fa fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <div class="group flex items-center justify-between">

              <div class="flex space-x-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                >

                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5.5 w-5.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                    <path
                        d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"
                    />
                    <path
                        d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                    />
                  </svg>


                </div>
                <div>
                  <a href="#" class="text-slate-600 dark:text-navy-100"
                  >
                    Document002
                  </a
                  >
                  <div
                      class="mt-1 flex text-xs text-slate-400 dark:text-navy-300"
                  >
                    <p>
                      40 MB
                    </p>
                  </div>
                </div>

              </div>
              <div class="flex">
                <button
                    data-toggle="modal"
                    data-target="#viewFile"
                    class="popper-ref text-primary btn mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <i class="fa fa-eye"></i>
                </button>
                <button
                    data-toggle="modal"
                    data-target="#deleteFile"
                    class="popper-ref text-error btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <i class="fa fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <div class="group flex items-center justify-between">

              <div class="flex space-x-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                >


                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5.5 w-5.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                    <path
                        d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                    />
                  </svg>

                </div>
                <div>
                  <a href="#" class="text-slate-600 dark:text-navy-100"
                  >
                    Video004
                  </a
                  >
                  <div
                      class="mt-1 flex text-xs text-slate-400 dark:text-navy-300"
                  >
                    <p>
                      30 MB
                    </p>
                  </div>
                </div>

              </div>
              <div class="flex">
                <button
                    data-toggle="modal"
                    data-target="#viewFile"
                    class="popper-ref text-primary btn mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <i class="fa fa-eye"></i>
                </button>
                <button
                    data-toggle="modal"
                    data-target="#deleteFile"
                    class="popper-ref text-error btn -mr-2 h-8 w-8 opacity-0 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 focus:opacity-100 active:bg-slate-300/25 group-hover:opacity-100 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <i class="fa fa-trash-alt"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="flex items-center justify-between">
            <h2
                class="text-base font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100"
            >
              Assigned Users
            </h2>
            <button
                data-toggle="modal"
                data-target="#manageUsers"
                class="btn h-8 min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
            >
              <i class="fa fa-link text-base mr-2"></i>
              Manage
            </button>
          </div>
          <div class="card mt-3 space-y-3.5 p-4 text-xs+ h-[35vh] overflow-auto">

            <div class="group flex items-center justify-between">
              <div class="flex space-x-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                >

                  <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAIAAAByquWKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNS0yMlQxODoxMjoyOCswNTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZDcyNGIyOS04NzFkLThhNGQtYmVlYS04N2JiNDI0MWM2ZmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxODM0M2VkYy03NzQ0LTdkNDQtYmNm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"
                      class="h-5.5 w-5.5"
                  />

                </div>
                <div class="flex items-center">
                  <a href="#" class="text-slate-600 dark:text-navy-100"
                  >
                    Jane Doe
                  </a>
                </div>
              </div>
            </div>

            <div class="group flex items-center justify-between">
              <div class="flex space-x-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                >


                  <div class="avatar h-6 w-6 sm:h-8 sm:w-8">
                    <div
                        class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                    >
                      PJ
                    </div>
                  </div>

                </div>
                <div class="flex items-center">
                  <a href="#" class="text-slate-600 dark:text-navy-100"
                  >
                    Peter Julius Machange
                  </a>
                </div>
              </div>
            </div>

            <div class="group flex items-center justify-between">
              <div class="flex space-x-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                >

                  <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAIAAAByquWKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNS0yMlQxODoxMjoyOCswNTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZDcyNGIyOS04NzFkLThhNGQtYmVlYS04N2JiNDI0MWM2ZmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxODM0M2VkYy03NzQ0LTdkNDQtYmNm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"
                      class="h-5.5 w-5.5"
                  />

                </div>
                <div class="flex items-center">
                  <a href="#" class="text-slate-600 dark:text-navy-100"
                  >
                    Jane Doe
                  </a>
                </div>
              </div>
            </div>

            <div class="group flex items-center justify-between">
              <div class="flex space-x-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                >

                  <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAIAAAByquWKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNS0yMlQxODoxMjoyOCswNTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZDcyNGIyOS04NzFkLThhNGQtYmVlYS04N2JiNDI0MWM2ZmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxODM0M2VkYy03NzQ0LTdkNDQtYmNm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"
                      class="h-5.5 w-5.5"
                  />

                </div>
                <div class="flex items-center">
                  <a href="#" class="text-slate-600 dark:text-navy-100"
                  >
                    Jane Doe
                  </a>
                </div>
              </div>
            </div>

            <div class="group flex items-center justify-between">
              <div class="flex space-x-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white dark:bg-accent"
                >


                  <div class="avatar h-6 w-6 sm:h-8 sm:w-8">
                    <div
                        class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                    >
                      JD
                    </div>
                  </div>

                </div>
                <div class="flex items-center">
                  <a href="#" class="text-slate-600 dark:text-navy-100"
                  >
                    Jane Doe
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>

    <div
        id="newStep"
        class="modal modal-scale fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60 pointer-events-none"></div>
      <div
          class="modal-content relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white dark:bg-navy-700"
      >
        <div
            class="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5"
        >
          <h3 class="text-base font-medium text-slate-700 dark:text-navy-100">
            Add Step
          </h3>
          <button
              data-close-modal
              class="btn -mr-1.5 h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="scrollbar-sm overflow-y-auto px-4 py-4 sm:px-5">
          <p>
            Create a New Step for this Task
          </p>
          <div class="mt-4 space-y-4">
            <label class="block">
              <span>Description:</span>
              <textarea
                  rows="4"
                  placeholder=" Description "
                  class="form-textarea mt-1.5 w-full resize-none rounded-lg border border-slate-300 bg-transparent p-2.5 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
              ></textarea>
            </label>

            <div class="space-x-2 text-right">
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
              >
                Cancel
              </button>
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        id="editStep"
        class="modal modal-scale fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60 pointer-events-none"></div>
      <div
          class="modal-content relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white dark:bg-navy-700"
      >
        <div
            class="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5"
        >
          <h3 class="text-base font-medium text-slate-700 dark:text-navy-100">
            Edit Step
          </h3>
          <button
              data-close-modal
              class="btn -mr-1.5 h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="scrollbar-sm overflow-y-auto px-4 py-4 sm:px-5">
          <p>
            Create a New Step for this Task
          </p>
          <div class="mt-4 space-y-4">
            <label class="block">
              <span>Description:</span>
              <textarea
                  rows="4"
                  placeholder=" Description "
                  class="form-textarea mt-1.5 w-full resize-none rounded-lg border border-slate-300 bg-transparent p-2.5 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
              ></textarea>
            </label>

            <div class="space-x-2 text-right">
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
              >
                Cancel
              </button>
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        class="modal fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        id="deleteStep"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60"></div>
      <div
          class="modal-content scrollbar-sm relative flex max-w-lg flex-col items-center overflow-y-auto rounded-lg bg-white px-4 py-10 text-center dark:bg-navy-700 sm:px-5"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline h-28 w-28 shrink-0 text-error"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          <path stroke="currentColor" stroke-width="2" d="m9 15 6-6m0 6L9 9"/>
        </svg>

        <div class="mt-4">
          <h2 class="text-2xl text-slate-700 dark:text-navy-100">
            Delete Step
          </h2>
          <p class="mt-2">
            Are you sure you want to delete this step?
          </p>
          <button
              data-close-modal
              class="btn mt-6 bg-error font-medium text-white hover:bg-error-focus focus:bg-error-focus active:bg-error-focus/90"
          >
            Yes I am sure.
          </button>
        </div>
      </div>
    </div>

    <div
        id="newFile"
        class="modal modal-scale fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60 pointer-events-none"></div>
      <div
          class="modal-content relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white dark:bg-navy-700"
      >
        <div
            class="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5"
        >
          <h3 class="text-base font-medium text-slate-700 dark:text-navy-100">
            Add File
          </h3>
          <button
              data-close-modal
              class="btn -mr-1.5 h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="scrollbar-sm overflow-y-auto px-4 py-4 sm:px-5">
          <p>
            Add file to this task.
          </p>
          <div class="mt-4 space-y-4">
            <div>
              <span
                  class="font-medium text-slate-600 dark:text-navy-100"
              >Task Files
              </span
              >
              <div
                  class="filepond fp-bordered fp-grid mt-1.5 [--fp-grid:2]"
              >
                <input id="taskFile" type="file" multiple/>
              </div>
            </div>

            <div class="space-x-2 text-right">
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
              >
                Cancel
              </button>
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        id="manageUsers"
        class="modal modal-scale fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60 pointer-events-none"></div>
      <div
          class="modal-content relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white dark:bg-navy-700"
      >
        <div
            class="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5"
        >
          <h3 class="text-base font-medium text-slate-700 dark:text-navy-100">
            Manage Users
          </h3>
          <button
              data-close-modal
              class="btn -mr-1.5 h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="scrollbar-sm overflow-y-auto px-4 py-4 sm:px-5">
          <p>
            Add or Remove users in this task
          </p>
          <div class="mt-4 space-y-4">

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

            <div class="space-x-2 text-right">
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
              >
                Cancel
              </button>
              <button
                  data-close-modal
                  class="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        id="viewFile"
        class="modal shift-up fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60"></div>
      <div
          class="modal-content scrollbar-sm relative flex max-w-md flex-col overflow-y-auto rounded-lg bg-white pt-10 pb-4 text-center dark:bg-navy-700"
      >
        <img
            class="rounded-full"
            src="/src/assets/images/200x200.png"
            alt="avatar"
        />

      </div>
    </div>

    <div
        class="modal fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        id="deleteFile"
        role="dialog"
    >
      <div class="modal-overlay absolute inset-0 bg-slate-900/60 pointer-events-none"></div>
      <div
          class="modal-content scrollbar-sm relative flex max-w-lg flex-col items-center overflow-y-auto rounded-lg bg-white px-4 py-10 text-center dark:bg-navy-700 sm:px-5"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline h-28 w-28 shrink-0 text-error"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          <path stroke="currentColor" stroke-width="2" d="m9 15 6-6m0 6L9 9"/>
        </svg>

        <div class="mt-4">
          <h2 class="text-2xl text-slate-700 dark:text-navy-100">
            Delete File
          </h2>
          <p class="mt-2">
            Are you sure you want to delete this file?
          </p>


          <div class="my-4 mt-16 h-px bg-slate-200 dark:bg-navy-500"></div>

          <div class="space-x-3">
            <button
                data-close-modal
                class="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
            >
              Cancel
            </button>
            <button
                data-close-modal
                class="btn min-w-[7rem] rounded-full bg-error font-medium text-white hover:bg-error-focus focus:bg-error-focus active:bg-error-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
            >
              Yes, I am sure
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>


</style>
