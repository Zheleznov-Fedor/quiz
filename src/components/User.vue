<script setup bem-block="user">

</script>

<template>
<div :class="bem('wrap', align)">
  <img :src="img_url" alt="">
</div>
</template>

<script>
export default {
  props: {
    x: Number,
    y: Number,
    align: String,
    img_url: String
  },
  data() {
    return {
      left: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    if (this.align === 'right') {
      this.left = String(window.screen.width -
        this.$.subTree.el.getBoundingClientRect().left) + 'px'
    } else {
      this.left = String(this.$.subTree.el.getBoundingClientRect().left + 49) + 'px'
    }
  }
}
</script>

<style scoped lang="less">

@keyframes left {
  from {
    left: v-bind(left);
  }

  to {
    left: 0;
  }
}
@keyframes right {
  from {
    right: v-bind(left);
  }

  to {
    right: 0;
  }
}

.user {
  &__wrap {
    display: flex;
    width: 21px;
    height: 34px;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
    position: relative;

    &--left {
      animation: .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) right;
    }

    &--right {
      animation: .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) left;
    }

    img {
      width: 49px;
      height: 49px;
      border-radius: 95px;
      border: 3px solid #8C9AFF;
      box-shadow: 3px 3px 11px 0px rgb(32 52 199 / 25%);
    }
  }
}
</style>
