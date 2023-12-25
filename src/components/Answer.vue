<script setup bem-block="answer">

import UsersCounter from "@/components/UsersCounter.vue";
</script>

<template>
<div :class="bem('wrap', state ? 'good' : '')">
  {{title}}
  <UsersCounter ref="counter" :a="Number(title[0])" :align="align"></UsersCounter>
</div>
</template>

<script>
export default {
  props: {
    title: String,
    align: String,
    state: {
      type: Boolean
    },
  },
  data() {
    return {
      text: "«- Я думал, что там witness.\n" +
        "- Серьёзно? Такое бывает, что ты думаешь?»\n" +
        "© ученик и Наталья Борисовна соответственно\n4 строка\n5 стро, хотя такое врядли, но всё таки\n" +
        "ПРимечание:"
    }
  },
  methods: {
    count_votes(votes) {
      this.$refs.counter.$.ctx.count_votes(votes)
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
.answer {
  &__wrap {
    display: flex;
    position: relative;
    padding: 29.82px 47.351px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 118.956px;
    background: #5C6AD6;

    color: #FFF;
    font-family: Montserrat;
    font-size: 45.2px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    transition: .1s color, .1s background;

    &--good {
      color: #000900;
      background: #52FE86;
    }
  }
}
</style>
