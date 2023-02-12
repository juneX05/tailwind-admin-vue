<template>
  <label>
    <span class="font-medium text-slate-600 dark:text-navy-100"
    > {{ title }}
    </span
    >
    <span class="relative mt-1.5 flex">
      <input
          v-model="value"
          :id="id"
          :class=" { 'border border-error': error, 'border-slate-300 dark:border-navy-450' : !error, 'pl-9': icon } "
          class="form-input peer w-full rounded-lg border  bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary  dark:hover:border-navy-400 dark:focus:border-accent"
          :placeholder="placeholder"
          type="text"
      />
      <span
          v-if="icon"
          v-html="icon ? icons[icon] :  ''"
          :class=" { 'text-error': error, 'text-slate-400 dark:text-navy-300': !error } "
          class="pointer-events-none absolute flex h-full w-10 items-center justify-center  peer-focus:text-primary dark:peer-focus:text-accent"
      >

      </span>
    </span>

    <span v-if="error" class="text-tiny+ text-error">
      {{ error }}
    </span>
  </label>
</template>

<script setup>
import icons from "../../data/icons";
import {onMounted, computed} from "vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {},
  title: { type: String, default: () => "" },
  placeholder: { type: String, default: () => "" },
  id: { type: String, default: () => "" },
  icon: { type:String, default: () => null },
  type: { type: String, default: () => 'text' },
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

onMounted(() => {
  if (props.type == 'date') {
    const element = document.querySelector("#" + props.id);
    element._datepicker = flatpickr(element);
  }

})

</script>
