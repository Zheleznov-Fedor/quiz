<script setup>

</script>

<template>
<div class="timer_wrap">
  <svg class="timer" width="911" height="100" viewBox="0 0 911 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  </svg>
</div>
<!--  <div class="timer"></div>-->
</template>

<script>
export default {
  props: {
    x: Number,
    y: Number,
    align: String,
    data: Object
  },
  data() {
    return {
      step: window.screen.width * 0.8 / 1000,
      progress: window.screen.width * 0.8,
      progress_for_css: window.screen.width * 0.8 + 'px',
    }
  },
  methods: {
    increment() {
      this.count++
    },
    roundNumber(number, digits) {
      var multiple = Math.pow(10, digits);
      var rndedNum = Math.round(number * multiple) / multiple;
      return rndedNum;
    },
  },
  mounted() {
    // let x = setInterval(() => {
    //   this.progress = this.roundNumber(this.progress - this.step, 6)
    //   this.progress_for_css = this.progress + 'px'
    // }, 1)
  }
}
</script>

<style scoped lang="less">

@keyframes timer_end {
  0% {
    width:  v-bind(progress_for_css);
  }
  67% {
    background-color: white;
  }
  80% {
    background-color: #FD6F6E;
  }
  100% {
    background-color: #FD6F6E;
    width:  0;
  }
}

@keyframes timer_show {
   0% {
     height: 0;
   }
   100% {
     height:  100%;
   }
 }

.timer_wrap {
  height: 10.2%;
  display: flex;
  align-items: center;
}

.timer {
  height: 0;
  background-color: white;
  width: v-bind(progress_for_css);

  &--run {
    animation: 30s linear timer_end !important;
    width: 0;
  }
  &--show {
    animation: .4s linear timer_show;
    height: 100%;
  }
}

</style>
