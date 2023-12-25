<script setup bem-block="question">
import Timer from "@/components/Timer.vue";
import Answer from "@/components/Answer.vue";
import Citata from "@/components/Citata.vue";
</script>

<template>
<div :class="bem('wrap')">
  <div :class="bem('content')">
    <div :class="bem('header')">
      ВОПРОС №{{data.question_index}}
    </div>
    <div :class="bem('main_wrapper')">
      <div :class="bem('main', citata_show ? 'citata-show' : '')">
        <p :class="bem('text')">{{data.text}}</p>
        <div :class="bem('media')">
          <div :class="bem('answers')">
            <Answer ref="AnsA" id="A" align="left"
                    :title="data.answers[0]" :state="good_answer === 0"></Answer>
            <Answer ref="AnsB" id="B" align="right"
                    :title="data.answers[1]" :state="good_answer === 1"></Answer>
            <Answer ref="AnsC" id="C" align="left"
                    :title="data.answers[2]" :state="good_answer === 2"></Answer>
            <Answer ref="AnsD" id="D" align="right"
                    :title="data.answers[3]" :state="good_answer === 3"></Answer>
          </div>
          <Citata :data="data.citata"></Citata>
        </div>
<!--        <button id="button" v-on:click="increment"></button>-->
<!--        <button id="button2" v-on:click="increment"></button>-->
      </div>
    </div>
  </div>
  <timer></timer>
</div>
</template>

<script>
import end from "@/components/End.vue";

export default {
  props: ['data'],
  data() {
    return {
      showUsers: false,
      text: "«- Я думал, что там witness.\n" +
          "- Серьёзно? Такое бывает, что ты думаешь?»\n" +
          "© ученик и Наталья Борисовна соответственно\n4 строка\n5 стро, хотя такое врядли, но всё таки\n" +
          "ПРимечание:",
      results: {
        "A": [
          {
            "id": 200,
            "img": 7
          },
          {
            "id": 199,
            "img": 3
          },
          {
            "id": 198,
            "img": 7
          },
          {
            "id": 197,
            "img": 5
          },
          {
            "id": 196,
            "img": 6
          },
          {
            "id": 195,
            "img": 7
          },
          {
            "id": 194,
            "img": 1
          },
          {
            "id": 193,
            "img": 1
          },
          {
            "id": 192,
            "img": 3
          },
          {
            "id": 191,
            "img": 2
          },
          {
            "id": 190,
            "img": 5
          },
          {
            "id": 189,
            "img": 0
          },
          {
            "id": 188,
            "img": 3
          },
          {
            "id": 187,
            "img": 4
          },
          {
            "id": 186,
            "img": 4
          },
          {
            "id": 185,
            "img": 4
          },
          {
            "id": 184,
            "img": 6
          },
          {
            "id": 183,
            "img": 3
          },
          {
            "id": 182,
            "img": 2
          },
          {
            "id": 181,
            "img": 1
          },
          {
            "id": 180,
            "img": 2
          },
          {
            "id": 179,
            "img": 6
          },
          {
            "id": 178,
            "img": 7
          },
          {
            "id": 177,
            "img": 7
          },
          {
            "id": 176,
            "img": 4
          }
        ],
        "B": [
          {
            "id": 300,
            "img": 3
          },
          {
            "id": 299,
            "img": 7
          }
        ],
        "C": [],
        "D": [
          {
            "id": 500,
            "img": 7
          },
          {
            "id": 499,
            "img": 1
          },
          {
            "id": 498,
            "img": 0
          },
          {
            "id": 497,
            "img": 4
          },
          {
            "id": 496,
            "img": 7
          },
          {
            "id": 495,
            "img": 6
          },
          {
            "id": 494,
            "img": 2
          },
          {
            "id": 493,
            "img": 1
          }
        ]
      },
      good_answer: "",
      media_height: 'auto',
      citata_show: false
    }
  },
  methods: {
    parse_user_request(req) {
      if (req.data === 'question::show_good_answer') {
        this.show_good_answer()
      } else if (req.data === 'question::show_citata') {
        this.show_citata()
      } else if (req.data.startsWith('question::count_votes')) {
        this.count_votes(JSON.parse(req.data.split('::').at(-1)))
      } else if (req.data === 'question::start_timer') {
        this.timer()
      }
    },
    count_votes(votes) {
      console.log(votes)
      this.$refs.AnsA.$.ctx.count_votes(votes[0])
      this.$refs.AnsB.$.ctx.count_votes(votes[1])
      this.$refs.AnsC.$.ctx.count_votes(votes[2])
      this.$refs.AnsD.$.ctx.count_votes(votes[3])
    },
    show_good_answer() {
      this.good_answer = this.data.good_option_index
    },
    show_citata() {
      this.citata_show = true
      let answers = this.$.subTree.el.getElementsByClassName('question__answers')[0]
      answers.classList.add('question__answers--hidden')
      let citata = this.$.subTree.el.getElementsByClassName('citata__wrap')[0]
      citata.classList.add('citata__wrap--show')
      this.media_height = citata.getBoundingClientRect().height / 0.9
      let main = this.$.subTree.el.getElementsByClassName('question__main')[0]
      this.main_old_height = String(main.getBoundingClientRect().height) + 'px'
      console.log(this.$.subTree.el.getElementsByClassName('question__text')[0].getBoundingClientRect().height)
      console.log(this.media_height)
      this.main_height = String(
        this.$.subTree.el.getElementsByClassName('question__text')[0].getBoundingClientRect().height +
        this.media_height + parseFloat(window.getComputedStyle(main).paddingTop.slice(0, -2)) * 2 + 40
      ) + 'px'
      this.media_height = String(this.media_height) + 'px'
    },
    timer() {
      this.$.subTree.el.getElementsByClassName('timer')[0].classList.add('timer--show')
      setTimeout(() => {
        this.$.subTree.el.getElementsByClassName('timer')[0].classList.add('timer--run')
      }, 400)
    },
    to_next_question() {
      this.$.subTree.el.getElementsByClassName('question__header'.classList.add('question__header--hide'))
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>

@keyframes fade-out-zoom {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes height-zoom {
  0% {
    height: v-bind(main_old_height);
  }
  100% {
    height: v-bind(main_height);
  }
}

@keyframes move_header {
  0% {
    position: absolute;
    top: 453px;
    font-weight: 700;
    font-size: 90px;
  }
  100% {
    position: absolute;
    top: 0;
    font-weight: 300;
    font-size: 70px;
  }
}

.question {
  &__wrap {
    transition: left .4s ease;
    height: 100%;

    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 0;
    width: 100%;

    &--show {
      left: 0;
    }
    &--hide {
      left: -1920px;
    }
    &--next {
      left: 1920px;
    }
    &--opac {
       opacity: 0;
     }
    &--header_hide {
      .question__header {
        position: absolute;
        top: 443px;
        font-weight: 700;
        font-size: 90px;
        //animation: 1s ease-out first_time_show;
        //animation-delay: 1s;
        transition: opacity .5s ease-in;
        opacity: 0;
      }

      .question__main_wrapper {
        opacity: 0;
        transition: .7s opacity ease-in;
      }
    }
    &--header_show {
      .question__header {
        opacity: 1;
      }
    }
    &--header_move {
      .question__header {
        animation: .7s ease-out move_header;
        position: unset;
        font-weight: 300;
        font-size: 70px;
      }
    }
    &--main_show {
      .question__main_wrapper {
        opacity: 1;
      }
    }
  }
  &__content {
    height: 86.8%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  &__header {
    display: inline-block;
    color: #FFF;
    font-family: Blue curve,serif;
    font-size: 70px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
  &__main_wrapper {
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__main {
    min-width: 1000px;
    height: max-content;
    display: flex;
    padding: 34px;
    flex-direction: column;
    align-items: flex-start;
    gap: 57.75px;
    align-self: stretch;
    border-radius: 36.957px;
    background: #2034C7;
    transition: .3s max-height, .3s gap;;
    &--citata-show {
      gap: 40px;
      animation: .3s ease-in-out height-zoom;
      height: v-bind(main_height);
    }
  }
  &__text {
    white-space: pre;
    color: #FFF;
    font-family: Montserrat, serif;
    font-size: 42.2px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &__media {
    width: 100%;
    position: relative;
    transition: height 3s;
    height: v-bind(media_height);
  }
  &__answers {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr;
    gap: 57.75px;
    width: 100%;
    justify-items: stretch;
    align-items: stretch;

    &--hidden {
      position: absolute;
      animation: .3s ease-in-out fade-out-zoom;
      opacity: 0;
    }
  }
}
</style>
