<template>
  <div>
    <div class="dropdown-wrapper">
      <div class="dropdown-container">
        <ul class="dropdown-list">
          <li class="dropdown-list__item" v-for="item of list">
              {{item.fullname || item.postalcode}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['list']
  }
</script>
