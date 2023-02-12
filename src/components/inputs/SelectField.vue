<template>
  <label class="block">
    <span class="font-medium text-slate-600 dark:text-navy-100">
      {{ title }}
    </span>
    <select
        v-model="value"
        :multiple="multiple"
        :id="id"
        class="mt-1.5 w-full"
        :class="{ 'border border-error rounded-lg' : error }"
    >
    </select>

    <span v-if="error" class="text-tiny+ text-error">
      {{ error }}
    </span>
  </label>
</template>

<script setup>
import {onMounted, computed, onUpdated, nextTick} from "vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {},
  title: { type: String, default: () => "" },
  placeholder: { type: String, default: () => "" },
  id: { type: String, default: () => "" },
  valueField: { type: String, default: () => "id" },
  labelField: { type: String, default: () => "title" },
  searchField: { type: String, default: () => "title" },
  options: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: false },
  render: { type: Object, default: ()  => {} },
  error: { type: String, default: () => null }
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const manageSelector = (rerender = false) => {


  const element = document.querySelector("#" + props.id);

  if (rerender)
    if (element._tom) element._tom.destroy();

  element._tom = new Tom(element,  {
    valueField: props.valueField,
    labelField: props.labelField,
    searchField: props.searchField,
    options: props.options,
    items: props.modelValue,
    // create: false,
    // sortField: {field: "text", direction: "asc"},
    placeholder: props.placeholder,
    render: props.render,
  });

}

onMounted(() => {

  manageSelector()

})

onUpdated(async () => {

    // await nextTick()
    manageSelector(true)

})

</script>
