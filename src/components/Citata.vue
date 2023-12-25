<script setup bem-block="citata">
import Reaction from "@/components/Reaction.vue";
</script>

<template>
<div :class="bem('wrap')">
  <span :class="bem('text')">{{data.text}}</span>
  <div :class="bem('reactions')">
    <Reaction v-for="reaction in data.reactions" :key="reaction.emoji"
              :emoji="reaction.emoji" :cnt="reaction.cnt"></Reaction>
  </div>
</div>
</template>

<script>

export default {
  props: ['data'],
  data() {
    return {
      showUsers: false,
      text: "«А блоки питания мама Карло нести будет??»\n" +
            "© Виталий Александрович цгсгшникам при подготовке актового зала к олимпиаде по информатике",
      good_answer: "",
      width: '100px'
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
    this.width = String(Math.max(document.getElementsByClassName('question__text')[0]
      .getBoundingClientRect().width - 42 * 2, 848)) + 'px'
  }
}
</script>

<style scoped lang="less">


@keyframes fade-in-zoom {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.citata {
  &__wrap {
    display: none;
    width: v-bind(width);
    padding: 24px 42px;
    flex-direction: column;
    align-items: flex-start;
    gap: 23.977px;
    border-radius: 53.918px;
    background: #142534;
    position: relative;
    top: 0;
    left: 0;
    box-sizing: unset;

    &--show {
      display: flex;
      animation: .3s ease-in-out fade-in-zoom;
    }
  }

  &__text {
    color: #FFF;
    font-family: Open Sans;
    font-size: 35.78px;
    font-weight: 400;
    white-space: pre-line;
  }

  &__reactions {
    display: flex;
    align-items: flex-start;
    gap: 11.988px;
  }
}
</style>
