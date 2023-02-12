<script setup>
import Layout from '../../../layouts/Main.vue'
import { useRoute, useRouter } from 'vue-router';
import {useTasksStore} from "../../../stores/tasksStore";
import {onMounted, reactive} from "vue";
import {useGlobalStore} from "../../../stores/globalStore";
import {useProjectsStore} from "../../../stores/projectsStore";
import SelectField from "../../../components/inputs/SelectField.vue";
import InputField from "../../../components/inputs/InputField.vue";
import SelectAssignUsers from "../../../components/SelectAssignUsers.vue";
import WYSIWYG from "../../../components/inputs/WYSIWYG.vue";

defineProps({
  msg: String,
})

const route = useRoute();
const router = useRouter();

const tasksStore = useTasksStore()
const tasks = tasksStore.tasks

const userStore = useGlobalStore()
const users = userStore.users
const tags = userStore.tags

const projectsStore = useProjectsStore()
const projects = projectsStore.projects

const init = () => {

}

onMounted( () => {
  init()
})

let task = reactive({
  tags: [],
  assigned: [],
})

const errors = reactive({})

const submit = () => {
  const { data, count } = tasksStore.validator(task);
  Object.keys(data).forEach( (item) => {
    errors[item] = data[item]
  })

  if(count > 0) {
    console.log('TASK', task)
    console.log('MESSAGES',data)
  } else {
    tasksStore.save(task)
  }

}
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
              @click="submit"
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

                  <InputField
                      id="taskTitle"
                      placeholder="Enter Title."
                      title="Title"
                      v-model="task.title"
                      type="text"
                      :error="errors.title"
                  />

                  <WYSIWYG
                    id="taskDescription"
                    placeholder="Enter description for the task"
                    title="Description"
                    v-model="task.description"
                    :error="errors.description"
                  />

                  <SelectAssignUsers v-model="task.assigned" :error="errors.assigned" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="card space-y-5 p-4 sm:p-5">

            <SelectField
                id="taskPriority"
                label-field="name"
                :options="[
                    {id:1, name:'High'},
                    {id:2, name:'Medium'},
                    {id:3, name:'Low'},
                ]"
                placeholder="Select Priority"
                search-field="name"
                title="Priority"
                value-field="id"
                v-model="task.priority"
                :multiple="false"
                :error="errors.priority"
            />

            <SelectField
                id="taskProject"
                label-field="name"
                :options="projects"
                placeholder="Select Project"
                search-field="name"
                title="Project"
                value-field="id"
                v-model="task.project"
                :multiple="false"
            />

            <SelectField
              id="taskTags"
              label-field="title"
              :options="tags"
              placeholder="Select Tags"
              search-field="title"
              title="Tags"
              value-field="id"
              v-model="task.tags"
              :multiple="true"
            />

            <InputField
                id="taskStartDate"
                placeholder="Chose Date..."
                title="Start Date"
                v-model="task.start_date"
                icon="calendar"
                type="date"
                :error="errors.start_date"
            />

            <InputField
                id="taskEndDate"
                placeholder="Chose Date..."
                title="End Date"
                v-model="task.end_date"
                icon="calendar"
                type="date"
                :error="errors.end_date"
            />
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<style scoped>


</style>
