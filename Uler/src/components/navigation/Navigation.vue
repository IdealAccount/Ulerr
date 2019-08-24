<template>
  <div class="nav-row">
    <nav>
      <ul class="menu-list">
        <li v-for="item of navMenu" class="menu-list__item">
          <a :href="item.url" class="menu-list__link">{{item.title}}</a>
        </li>
      </ul>
    </nav>
    <a href="#!" class="user-profile">елизавета</a>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        navMenu: [
          {
            id: 1,
            title: 'Взять турбозайм',
            url: '#!'
          },{
            id: 2,
            title: 'погасить турбозайм',
            url: '#!'
          },{
            id: 3,
            title: 'продлить срок займа',
            url: '#!'
          },{
            id: 4,
            title: 'условия договора',
            url: '#!'
          },{
            id: 5,
            title: 'вопрос-ответ',
            url: '#!'
          },
        ]
      }
    }
  }
</script>
<style lang="scss">
  .nav-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #c4c4c4;
    text-transform: uppercase;
  }
  .menu-list {
    display: flex;
    &__link {
      position: relative;
      display: block;
      padding: 15px;
      color: #333;
      white-space: nowrap;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        height: 3px;
        background: #000;
        width: 0;
        transition: .3s ease-in-out;
      }
      &:hover:after {
        width: 100%;
      }
    }
  }
  .user-profile {
    padding: 15px ;
  }
</style>
