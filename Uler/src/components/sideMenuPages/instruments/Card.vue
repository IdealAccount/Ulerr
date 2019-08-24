<template>
  <div class="card" :style="card.status ? cardStyle : ''">
    <div class="card-row">
      <div class="card-name">
        <img v-if="card.logo"
             :src="card.logo"
             class="card-logo"
             >
        <span>{{card.name}}</span>
      </div>
      <div class="card-instruments"
           @click="getTypeOfPopup"
      >
        <span data-control="edit">
          <!--<img src="./../../../assets/img/writer.svg">-->
          <svg :fill="card.color" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 411.3 411.3" style="enable-background:new 0 0 411.3 411.3;" xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M411.3,86.85c0-6.4-2.4-12.4-7.2-17.2l-61.6-62c-4.8-4.8-10.8-7.2-17.2-7.2s-12.4,2.4-17.2,7.2l-21.2,21.2
				c-0.4,0.4-0.8,0.8-1.6,1.2c-0.4,0.4-0.8,0.8-1.2,1.6l-172.4,171.6c-9.2-4.4-20.4-2.4-27.2,4.4l-5.6,5.6c-9.6,9.6-9.6,24.4,0,34
				l7.2,7.2l-56,16c-9.2,2.8-16,10.8-17.2,20.4L0.1,402.05c-0.4,2.4,0.4,4.8,2.4,6.4c1.6,1.6,3.6,2.4,5.6,2.4c0.4,0,0.8,0,0.8,0
				l111.2-12.8c10-1.2,17.6-8,20-17.6l16-55.6l7.6,7.6c4.8,4.8,10.8,7.2,17.2,7.2c6,0,12.4-2.4,17.2-7.2l5.6-5.6
				c4.8-4.8,7.2-10.8,7.2-17.2c0-3.6-0.8-7.2-2.4-10.4l196-195.6C408.9,99.25,411.3,92.85,411.3,86.85z M124.9,376.45
				c-0.8,3.2-3.2,5.6-6.4,6l-88.4,10l29.2-28.8c3.2-3.2,3.2-8,0-11.2c-3.2-3.2-8-3.2-11.2,0l-29.6,29.2l10-88.4c0.4-3.2,2.8-6,6-6.8
				l64.4-18.4l44,44L124.9,376.45z M192.1,315.65l-5.6,5.6c-3.2,3.2-8.4,3.2-11.6,0l-17.2-17.2l-35.2-35.2l-32.4-32.4
				c-3.2-3.2-3.2-8.4,0-11.6l5.6-5.6c1.6-1.6,3.6-2.4,5.6-2.4c1.2,0,2.8,0.4,4,0.8l2.4,1.6l84.4,84.4c1.6,1.6,2.4,3.6,2.4,5.6
				C194.5,312.05,193.7,314.05,192.1,315.65z M197.7,287.25l-73.6-73.6l167.2-166.4l73.2,73.2L197.7,287.25z M392.9,92.45
				l-16.8,16.8l-73.2-73.6l16.8-16.8c3.2-3.2,8.4-3.2,11.6,0l61.6,62c1.6,1.6,2.4,3.6,2.4,5.6S394.5,90.85,392.9,92.45z"/>
			<path d="M76.1,324.05l-8.4,8.4c-3.2,3.2-3.2,8,0,11.2c1.6,1.6,3.6,2.4,5.6,2.4s4-0.8,5.6-2.4l8.4-8.4c3.2-3.2,3.2-8,0-11.2
				S79.3,320.85,76.1,324.05z"/>
		</g>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
        </span>
        <span data-control="remove">
          <!--<img src="./../../../assets/img/trash.svg">-->
          <svg :fill="card.color"
               version="1.1" id="Capa_1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               x="0px" y="0px"
               width="15" height="15"
               viewBox="0 0 612 612"
               style="enable-background:new 0 0 612 612;" xml:space="preserve">
          <g>
            <g id="Trash_1_">
               <g>
                 <path d="M325.125,229.5h-38.25v267.75h38.25V229.5z M229.5,229.5h-38.25v267.75h38.25V229.5z M592.875,114.75H459V19.125
                            C459,8.568,450.432,0,439.875,0h-267.75C161.568,0,153,8.568,153,19.125v95.625H19.125C8.568,114.75,0,123.318,0,133.875
                            S8.568,153,19.125,153H76.5v439.875C76.5,603.432,85.068,612,95.625,612h420.75c10.557,0,19.125-8.568,19.125-19.125V153h57.375
                            c10.557,0,19.125-8.568,19.125-19.125S603.432,114.75,592.875,114.75z M191.25,38.25h229.5v76.5h-229.5V38.25z M497.25,573.75
                            h-382.5V153h382.5V573.75z M420.75,229.5H382.5v267.75h38.25V229.5z"/>
                        </g>
                      </g>
                    </g>
                    <g>
                  </g>
                <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
            </svg>
        </span>
      </div>
    </div>
    <div class="card-row">
      <span class="card-brand">
        <img :src="card.brand" alt="">
        <!--<span>{{card.brand}}</span>-->
      </span>
      <span :class="['card-status', card.status ? 'card-status--confirmed' : 'card-status--unconfirmed']">
        {{card.status ? 'Подтверждена' : 'Не подтверждена'}}
      </span>
    </div>
    <span class="card-num">{{card.number | hideNums(card.number)}}</span>
  </div>
</template>
<script>
  export default {
    props: ['card'],
    filters: {
      hideNums(str) {
        return str = str.slice(0,4) + '-' + str.slice(4,6) + 'xx-xxxx-' + str.slice(12,str.length)
      }
    },
    data() {
      return {
        show: false,
        cardProps: {},
      }
    },
    computed: {
      cardStyle()  {
        if (this.card.status) {
          return  {
            background: `linear-gradient(45deg, ${this.card.bg[0]}, ${this.card.bg[1]})`,
            color: this.card.color,
          }
        }
      }
    },
    methods: {
      getTypeOfPopup(event) {
        let target = event.target;
        let parent = this.$parent;
        let id = this.card.id;

        if (target.tagName !== 'SPAN') return;

        // Через родителя (Instruments) пробрасываем значения
        // Чтобы открылся нужный Popup по id и значению
        parent.$data.typeOfPopup = {
          id,
          type: target.dataset.control
        };
        // Закрываем Popup
        parent.isShow = !parent.isShow
      }
    }
  }
</script>
<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 250px;
    height: 120px;
    padding: 10px 15px;
    background: #fff;
    border: 1px solid #000;
    border-radius: 8px;
    margin: 0 15px 15px 0;
    cursor: default;
    &-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-instruments {
      span {
        position: relative;
        padding: 5px;
        cursor: pointer;
        &:before {
          content: '';
          position: absolute;
          z-index: 10;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
      img {
        width: 15px;
      }
      svg {
        width: 15px;
        height: 15px;
      }

    }
    &-status {
      font-size: 12px;
      margin-left: auto;
      &--confirmed {
        color: #79D98A;
      }
      &--unconfirmed {
        color: red;
      }
    }
    &-num {
      font-size: 22px;
      text-align: center;
    }
    &-name {
      display: flex;
      align-items: center;
    }
    &-logo {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    &-brand {
      width: 30px;
      img {
        display: block;
      }
    }
  }
</style>
