<script setup bem-block="users_counter">

import User from "@/components/User.vue";
</script>

<template>
  <div v-if="align === 'right'" :class="bem('wrap', align)">
    <span :class="bem('cnt')">x{{text_cnt}}</span>
    <div :class="bem('users')">
      <User v-for="user in users.slice(0, show_users_cnt)" :key="user" :align="align"
            :style="{'z-index': user['z-index']}"
            :img_url="user['img']"></User>
    </div>
  </div>
  <div v-else :class="bem('wrap', align)">
    <div :class="bem('users')">
      <User v-for="user in users.slice(0, show_users_cnt)" :key="user" :align="align"
            :style="{'z-index': user['z-index']}"
            :img_url="user['img']"></User>
    </div>
    <span :class="bem('cnt')">{{text_cnt}}x</span>
  </div>
</template>

<script>
export default {
  props: {
    align: String,
    a: Number,
    trigger: Boolean,
  },
  data() {
    return {
      circles_cnt: 0,
      real_cnt: 0,
      show_users_cnt: 0,
      text_cnt: 0,
      height: 100,
      cnt_width: 'auto',
      users: []
    }
  },
  methods: {
    async count_votes(votes) {
      console.log(votes)
      this.real_cnt = votes['cnt']
      this.$.subTree.el.classList.add('users-counter__wrap--show')
      if (this.real_cnt === 0) {
        return
      }

      this.users = votes['users']
      this.circles_cnt = Math.min(votes['cnt'], 15)

      let interval = setInterval(() => {
        if (this.show_users_cnt % 5 === 0) {
          this.height = String(34 * (this.show_users_cnt / 5 + 1)) + 'px'
        }
        if (this.text_cnt % 10 === 0) {
          this.cnt_width = String(80 * (Math.ceil(Math.log10(this.text_cnt))) + 34) + 'px'
        }
        this.show_users_cnt += 1
        this.text_cnt += 1
        if (this.show_users_cnt === this.circles_cnt) {
          clearInterval(interval)
          if (this.show_users_cnt < this.real_cnt) {
            interval = setInterval(() => {
              this.text_cnt += 1
              if (this.text_cnt === this.real_cnt) {
                clearInterval(interval)
              }
            }, 75)
          }
        }
        return 1
      }, 200)
    },
  },
  watch: {
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
.users-counter {
  &__wrap {
    position: absolute;
    display: flex;
    opacity: 0;
    transition: .3s opacity;

    &--show {
      opacity: 1;
    }
    //height: v-bind(height);

    &--right {
      .users-counter__users {justify-content: flex-start;}
      left: calc(100% + 65px);
      top: 0px;
      gap: 10px;
      justify-content: flex-start;
    }

    &--left {
      right: calc(100% + 29.82px + 65px);
      top: 0px;
      gap: 38px;
      .users-counter__users {justify-content: flex-end;}
    }
  }

  &__cnt {
    color: #8C9AFF;
    leading-trim: both;
    text-edge: cap;
    font-family: Blue curve;
    font-size: 70.2px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    z-index: 500;
    width: v-bind(cnt_width);
    text-align: center;
  }

  &__users {
    width: 105px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
}
</style>
