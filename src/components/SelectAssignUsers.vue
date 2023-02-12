<template>
  <SelectField
      id="taskAssigned"
      label-field="name"
      :options="users"
      placeholder="Select User"
      search-field="name"
      title="Assigned Users"
      value-field="id"
      v-model="value"
      :multiple="true"
      :render="render"
      :error="error"
  />
</template>
<script setup>
import SelectField from "./inputs/SelectField.vue";
import {computed} from "vue";
import {useGlobalStore} from "../stores/globalStore";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {},
  error: { type: String, default: () => null }
})

const render = {
  option: function (data, escape) {
    return `<div class=" flex space-x-3">
                  <div class="avatar w-8 h-8">
                    <img class="rounded-full" src="${escape(data.src)}" alt="avatar"/>
                  </div>
                  <div class="flex flex-col">
                    <span> ${escape(data.name)}</span>
                    <span class="text-xs opacity-80"> ${escape(data.position)}</span>
                  </div>
                </div>`;
  },
  item: function (data, escape) {
    return `<span class="badge rounded-full bg-primary dark:bg-accent text-white p-px mr-2">
                <span class="avatar w-6 h-6">
                  <img class="rounded-full" src="${escape(data.src)}" alt="avatar">
                </span>
                <span class="mx-2">${escape(data.name)}</span>
              </span>`;
  },
}

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const globalStore = useGlobalStore()
const users = globalStore.users
</script>