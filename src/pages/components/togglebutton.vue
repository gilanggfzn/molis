<template>
    <div :class="modelValue ? 'bg-cyan-600' : 'bg-gray-300'" @click="toggle" class="flex items-center h-8 p-1 transition-all duration-500 rounded-full w-14">
        <div :class="{'translate-x-6': modelValue}" class="w-6 h-6 transition-all duration-500 transform bg-white rounded-full shadow-md"></div>
      </div>
  </template>
  
  <script>
 export default {
    props: {
        modelValue: {
            type: Boolean
        }
    },
    methods: {
        toggle() {
            this.$emit('update:modelValue', !this.modelValue)
        }
    }
}
  </script>