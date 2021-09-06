<script setup>
  import { ref } from 'vue'
  const count = ref(0)
  fetch('https://rickandmortyapi.com/api/character')
  .then(res => res.json())
  .then(res => count.value = res.info.count)
</script>

<template>
  <code>{{count}}</code>
</template>