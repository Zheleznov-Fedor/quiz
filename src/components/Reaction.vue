<script setup bem-block="reaction">

</script>

<template>
  <div :class="bem('wrap')">
    <span :class="bem('emoji')">{{emoji}}</span>
    <span :class="bem('cnt')">{{cnt}}</span>
  </div>
</template>

<script>

export default {
  props: ['emoji', 'cnt'],
  data() {
    return {
      showUsers: false,
      text: "«- Я думал, что там witness.\n" +
        "- Серьёзно? Такое бывает, что ты думаешь?»\n" +
        "© ученик и Наталья Борисовна соответственно\n4 строка\n5 стро, хотя такое врядли, но всё таки\n" +
        "ПРимечание:",
      good_answer: ""
    }
  },
  methods: {
    increment() {
      this.showUsers = true
    },
    show_good_answer() {
      this.good_answer = 'D'
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
.reaction {
  &__wrap {
    display: flex;
    width: 149.855px;
    height: 71.93px;
    padding: 5.994px 20.98px;
    align-items: center;
    gap: 11.988px;
    background: #143447;
    border-radius: 107.896px;
  }

  &__cnt {
    color: #55BCFF;
    leading-trim: both;
    text-edge: cap;
    font-variant-numeric: lining-nums proportional-nums;
    font-family: "Open Sans";
    font-size: 35.78px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -1.349px;
  }

  &__emoji {
    color: #FFF;
    font-variant-numeric: lining-nums proportional-nums;
    font-family: "Open Sans";
    font-size: 43.45px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.18px;
  }
}
</style>
