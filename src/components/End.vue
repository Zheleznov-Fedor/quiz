<script setup bem-block="end">
</script>
<template>
  <div :class="bem('wrap')">
    <div :class="bem('pedestals')">
      <div @click="show_first_user" id="first_place" :class="bem('pedestal')">
        <span class="end__pedestal_place_num">1</span>
        <span class="end__nickname">{{winners[0]['nickname']}}</span>
        <div class="end__user">
          <img :src="winners[0]['img_url']">
        </div>
      </div>
      <div @click="show_second_user" id="second_place" :class="bem('pedestal')">
        <span class="end__pedestal_place_num">2</span>
        <span class="end__nickname">{{winners[1]['nickname']}}</span>
        <div class="end__user">
          <img :src="winners[1]['img_url']">
        </div>
      </div>
      <div @click="show_third_user" id="third_place" :class="bem('pedestal')">
        <span class="end__pedestal_place_num">3</span>
        <span class="end__nickname">{{winners[2]['nickname']}}</span>
        <div class="end__user">
          <img :src="winners[2]['img_url']">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['winners'],
  data() {
    return {
      count: 0
    }
  },
  methods: {
    parse_user_request(req) {
      if (req.data.startsWith('end::show_winner')) {
        switch (req.data.split('::').at(-1)) {
          case '1':
            this.show_first_user()
            break
          case '2':
            this.show_second_user()
            break
          case '3':
            this.show_third_user()
            break
        }
      }
    },
    show_first_user() {
      this.$.subTree.el.getElementsByClassName('end__user')[0].classList.add('end__user--show')
      setTimeout(() => {
        this.$.subTree.el.getElementsByClassName('end__nickname')[0].classList.add('end__nickname--show')
      }, 200)
    },
    show_second_user() {
      this.$.subTree.el.getElementsByClassName('end__user')[1].classList.add('end__user--show')
      setTimeout(() => {
        this.$.subTree.el.getElementsByClassName('end__nickname')[1].classList.add('end__nickname--show')
      }, 250)
    },
    show_third_user() {
      this.$.subTree.el.getElementsByClassName('end__user')[2].classList.add('end__user--show')
      setTimeout(() => {
        this.$.subTree.el.getElementsByClassName('end__nickname')[2].classList.add('end__nickname--show')
      }, 300)
    }
  },

  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<style scoped lang="less">
.end {
  &__wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
  }

  &__pedestal {
    display: flex;
    width: 466px;
    padding: 34px;
    justify-content: center;
    align-items: flex-start;
    flex-shrink: 0;
    border-radius: 37px 37px 0px 0px;
    background: #2034C7;
    position: absolute;
  }
  &__pedestal_place_num {
    font-family: Blue curve;
    font-size: 166px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  &__nickname {
    color: #FFF;
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    font-family: Blue curve;
    font-size: 51px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position: absolute;
    top: -65px;
    opacity: 0;
    transition: opacity .2s ease-in;
    &--show {
      opacity: 1;
    }
  }
}

@keyframes show_first_place {
  0% {
    top: 1080px;
  }
  100% {
    top: 546px;
  }
}

#first_place {
  height: 534px;
  top: 546px;
  left: 727px;
  animation: .5s ease-in show_first_place;
}

#first_place > .end__pedestal_place_num {
  color: #FFD700;
}

@keyframes show_first_user {
  0% {
    top: -758px;
  }
  100% {
    top: -302px;
  }
}

#first_place > .end__user {
  top: -758px;
  &--show {
    opacity: 1;
    top: -302px;
    animation: .2s ease-in show_first_user;
  }
}

@keyframes show_second_place {
  0% {
    top: 1080px;
  }
  100% {
    top: 646px;
  }
}

#second_place {
  height: 434px;
  top: 646px;
  left: 228px;
  animation: .42s ease-in show_second_place;
}

#second_place > .end__pedestal_place_num {
  color: #C0C0C0;
}

@keyframes show_second_user {
  0% {
    top: -858px;
  }
  100% {
    top: -302px;
  }
}

#second_place > .end__user {
  top: -858px;
  &--show {
    opacity: 1;
    top: -302px;
    animation: .25s ease-in show_second_user;
  }
}

@keyframes show_third_place {
  0% {
    top: 1080px;
  }
  100% {
    top: 760px;
  }
}

#third_place {
  height: 320px;
  top: 760px;
  left: 1220px;
  animation: .36s ease-in show_third_place;
}

#third_place > .end__pedestal_place_num {
  color: #CD7F32;
}

@keyframes show_third_user {
  0% {
    top: -972px;
  }
  100% {
    top: -302px;
  }
}

#third_place > .end__user {
  top: -972px;
  &--show {
    opacity: 1;
    top: -302px;
    animation: .3s ease-in show_third_user;
  }
}

.end__user {
  opacity: 0;
  display: flex;
  width: 212px;
  height: 212px;
  align-items: center;
  border-radius: 300px;
  border: 2px solid #8C9AFF;
  overflow: hidden;
  position: absolute;
  //top: -212px;
  //&--show {
  //  opacity: 1;
  //  top: -302px;
  //  bottom: unset;
  //  animation: 2s ease-in show_user;
  //}
}
.end__user > img {
  width: 100%;
}

</style>
