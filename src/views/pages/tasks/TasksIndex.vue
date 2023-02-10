<script setup>
import Layout from '../../../layouts/Main.vue'
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue'
import {useTasksStore} from "../../../stores/tasksStore";
import AssignedList from "../../../components/AssignedList.vue";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const tasksStore = useTasksStore()

const tasks = tasksStore.tasks

const submit = () => {
  router.push({name: 'dashboard'})
}

const stepsCounter = (steps) => {
  const total = steps.length;
  const completed = steps.filter( item => item.completed ).length

  return completed + '/' +  total
}

const splitDateTime = (date) => {
  const datetime = date.split(" ");
  return {
    date: datetime[0], time: datetime[1]
  }
}
</script>

<template>

  <Layout>
    <!-- Main Content Wrapper -->
    <main class="main-content todo-app w-full px-[var(--margin-x)] pb-8">
      <div class="grid sm:flex items-center justify-center sm:justify-between py-5">
        <div class="flex flex-col items-center justify-center">
          <div class="flex-1 align-center space-x-2">
            <p class=" text-xl font-medium text-slate-800 dark:text-navy-50">
              Tasks
            </p>
          </div>
          <p class="mt-1 text-xs">
            All Tasks
          </p>
        </div>

        <div class="relative flex -space-x-px mt-1">
          <input
              class="form-input peer w-full h-8 rounded-l-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
              placeholder="Search Task"
              type="text"
          />

          <div
              class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path
                  d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"
              />
            </svg>
          </div>

          <button
              class="btn rounded-l-none h-8 bg-navy-750 font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
          >
            Search
          </button>
        </div>
        <div class="justify-center hidden md:flex">

          <router-link
              :to="{ name:'tasks-create' }"
              class="btn space-x-2 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:shadow-accent/50 dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-indigo-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span> Create Task </span>
          </router-link>
        </div>
      </div>

      <div class="card px-4 pt-2 pb-4">
        <div id="todo-list">

          <div
              class="border-b border-slate-150 py-3 dark:border-navy-500"
              v-for="(task, index) in tasks"
              :key="index"
          >
            <div class="flex items-center space-x-2 sm:space-x-3">
              <label class="flex">
                <input
                    :checked="task.completed"
                    disabled
                    type="checkbox"
                    class="todo-checkbox form-checkbox is-outline h-5 w-5 rounded-full border-slate-400/70 before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent"
                />
              </label>
              <router-link
                  :to="{ name: 'tasks-view', params:{ id: task.id } }"
                  class="text-slate-600 line-clamp-1 dark:text-navy-100"
              >
                {{  task.title  }}
              </router-link>


              <div
                  v-if="task.steps"
                  class="badge space-x-1  py-1 px-1.5 "
                  :class=" {
                    'bg-error/10 dark:bg-error/15 text-error' : !task.completed,
                    'bg-success/10 dark:bg-success/15 text-success' : task.completed,
                  }"
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
                <span>{{ stepsCounter(task.steps) }}</span>
              </div>
            </div>
            <div class="mt-1 flex items-end justify-between">
              <div class="flex flex-wrap items-center font-inter text-xs">
                <p>{{ splitDateTime(task.due_date).date }}</p>
                <div
                    class="m-1.5 w-px self-stretch bg-slate-200 dark:bg-navy-500"
                ></div>
                <span class="flex items-center space-x-1">
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
                        stroke-width="1.5"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span>{{ splitDateTime(task.due_date).time }}</span>
                </span>
                <div
                    class="m-1.5 w-px self-stretch bg-slate-200 dark:bg-navy-500"
                ></div>
                <div
                    class="badge space-x-2.5 px-1"
                    :class="{
                      'text-success' : task.priority == 'low',
                      'text-error' : task.priority == 'high',
                      'text-warning' : task.priority == 'medium',
                    }"
                >
                  <div class="h-2 w-2 rounded-full bg-current"></div>
                  <span>{{ task.priority }}</span>
                </div>
                <div
                    class="m-1.5 w-px self-stretch bg-slate-200 dark:bg-navy-500"
                ></div>

                <div class="badge space-x-2.5 px-1 text-info" v-for="(tag, index) in task.tags">
                  <div class="h-2 w-2 rounded-full bg-current"></div>
                  <span>{{ tag }}</span>
                </div>

              </div>
              <div class="flex -space-x-1.5">
                <AssignedList :max_users="2" :users="task.assigned" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>

    <div
        class="fixed right-3 bottom-3 rounded-full bg-white dark:bg-navy-700"
    >
      <router-link
          :to="{ name:'tasks-create' }"
          class="btn h-14 w-14 rounded-full bg-info p-0 font-medium text-white hover:bg-info-focus focus:bg-info-focus active:bg-info-focus/90 sm:hidden"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
          />
        </svg>
      </router-link>
    </div>
  </Layout>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
