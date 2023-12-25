<script setup>
import Question from './Question.vue'
</script>

<template>
  <div @click="swap_to_end" class="questions">
    <Question id="first_question" ref="first_question" v-if="show_first"  :data="first_question_data"
              :class="first_class_list.join(' ')"></Question>
    <Question id="second_question" ref="second_question" v-if="show_second" :data="second_question_data"
              :class="second_class_list.join(' ')"></Question>
  </div>
</template>


<script bem-block="questions">

export default {
  props: ['questions'],
  data() {
    return {
      count: 0,
      curr_question: 'first',
      first_question_data: 1,
      second_question_data: 2,
      question_index: 0,
      show_first: true,
      show_second: false,
      first_class_list : ['question__wrap--header_hide'],
      second_class_list : ['question__wrap--next', 'question__wrap--opac']
    }
  },
  methods: {
    arrayRemove(arr, value) {

      return arr.filter(function (geeks) {
        return geeks !== value;
      });

    },
    parse_user_request(req) {
      if (req.data === 'question::next_question') {
        this.swap()
        return
      }

      if (this.curr_question === 'first') {
        console.log(req)
        this.$refs.first_question.$.ctx.parse_user_request(req)
      }
      else {
        console.log(req)
        this.$refs.second_question.$.ctx.parse_user_request(req)
      }
    },
    first_time_show_questions(questions) {
      this.first_question_data = questions[0]
      this.second_question_data = questions[1]
      console.log(this.first_question_data)
      let q = document.getElementById('first_question').classList
      q.add('question__wrap--header_show')
      setTimeout(() => {
        q.add('question__wrap--header_move')
        setTimeout(() => {
          q.add('question__wrap--main_show')
          q.add('question__wrap--show')
          setTimeout(() => {
            q.remove('question__wrap--header_hide',
              'question__wrap--header_show', 'question__wrap--header_move', 'question__wrap--main_show')
          }, 700)
        }, 700)
      }, 1000)
    },
    swap() {
      // console.log(this.$refs.first_question.$)
      this.question_index += 1
      if (this.curr_question === 'first') {
        this.show_second = true
        this.curr_question = 'second'
      } else {
        this.show_first = true
        this.curr_question = 'first'
      }
    },
    swap_to_end() {
      if (this.curr_question === 'first') {
        this.first_question_data = this.questions[this.question_index + 1]
        this.$refs.first_question.$.subTree.el.classList.add('question__wrap--hide')
        setTimeout(() => {
          this.$refs.first_question.$.subTree.el.classList.remove('question__wrap--hide')
          this.$refs.first_question.$.subTree.el.classList.add('question__wrap--opac')
          this.$refs.first_question.$.subTree.el.classList.add('question__wrap--next')
        }, 400)
        this.$refs.first_question.$.subTree.el.classList.remove('question__wrap--show')
      } else {
        this.second_question_data = this.questions[this.question_index + 1]
        this.$refs.second_question.$.subTree.el.classList.add('question__wrap--hide')
        setTimeout(() => {
          this.$refs.second_question.$.subTree.el.classList.remove('question__wrap--hide')
          this.$refs.second_question.$.subTree.el.classList.add('question__wrap--opac')
          this.$refs.second_question.$.subTree.el.classList.add('question__wrap--next')
        }, 400)
        this.$refs.second_question.$.subTree.el.classList.remove('question__wrap--show')
      }
    }
  },
  watch: {
    show_second(newShow, oldSHow) {
      console.log(oldSHow, newShow)
      if (newShow === true) {
        console.log('second')
        setTimeout(() => {
          // this.$refs.first_question.$.subTree.el.classList.add('question__wrap--hide')
          this.first_class_list.push('question__wrap--hide')
          setTimeout(() => {
            this.first_class_list = this.arrayRemove(this.first_class_list, 'question__wrap--hide')
            this.first_class_list = this.arrayRemove(this.first_class_list, 'question__wrap--header_hide')
            // this.$refs.first_question.$.subTree.el.classList.remove('question__wrap--hide',
            //   'question__wrap--header_hide')
            this.first_class_list.push('question__wrap--opac')
            this.first_class_list.push('question__wrap--next')
            // this.$refs.first_question.$.subTree.el.classList.add('question__wrap--opac')
            // this.$refs.first_question.$.subTree.el.classList.add('question__wrap--next')
            this.show_first = false
          }, 400)
          this.first_class_list = this.arrayRemove(this.first_class_list, 'question__wrap--show')
          // this.$refs.first_question.$.subTree.el.classList.remove('question__wrap--show')
          this.second_class_list = this.arrayRemove(this.second_class_list, 'question__wrap--opac')
          // this.$refs.second_question.$.subTree.el.classList.remove('question__wrap--opac')
          this.second_class_list.push('question__wrap--show')
          // this.$refs.second_question.$.subTree.el.classList.add('question__wrap--show')
          this.second_class_list = this.arrayRemove(this.second_class_list, 'question__wrap--next')
          // this.$refs.second_question.$.subTree.el.classList.remove('question__wrap--next')
          this.first_question_data = this.questions[this.question_index + 1]
        }, 700)
      }
    },
    show_first(newShow, oldShow) {
      if (newShow === true) {
        console.log('first')
        setTimeout(() => {
          this.second_class_list.push('question__wrap--hide')
          // this.$refs.second_question.$.subTree.el.classList.add('question__wrap--hide')
          setTimeout(() => {
            this.second_class_list = this.arrayRemove(this.second_class_list, 'question__wrap--hide')
            this.second_class_list = this.arrayRemove(this.second_class_list, 'question__wrap--header_hide')
            // this.$refs.second_question.$.subTree.el.classList.remove('question__wrap--hide',
            //   'question__wrap--header_hide')
            this.second_class_list.push('question__wrap--opac')
            this.second_class_list.push('question__wrap--next')
            // this.$refs.second_question.$.subTree.el.classList.add('question__wrap--opac')
            // this.$refs.second_question.$.subTree.el.classList.add('question__wrap--next')
            this.show_second = false
          }, 400)
          this.first_class_list = this.arrayRemove(this.first_class_list, 'question__wrap--opac')
          this.first_class_list = this.arrayRemove(this.first_class_list, 'question__wrap--header_hide')
          // this.$refs.first_question.$.subTree.el.classList.remove('question__wrap--opac',
          //   'question__wrap--header_hide')
          this.first_class_list.push('question__wrap--show')
          // this.$refs.first_question.$.subTree.el.classList.add('question__wrap--show')
          this.first_class_list = this.arrayRemove(this.first_class_list, 'question__wrap--next')
          // this.$refs.first_question.$.subTree.el.classList.remove('question__wrap--next')
          this.second_question_data = this.questions[this.question_index + 1]
        }, 700)
      }
    }
  },
  created() {
    this.questions.push(this.questions[0])
    this.first_question_data = this.questions[0]
    this.second_question_data = this.questions[1]
    // setTimeout(() => {
    //   this.$refs.back_question.$.ctx.show_citata()
    // }, 2000)
    // this.bus.$on('parse_user_request', this.parse_user_request)
  }
}
</script>

<style lang="less">
.questions {
  position: absolute;
  top: 4.6%;
  left: 0.5%;
  bottom: 4.6%;
  right: 0.5%;
  height: 90.8%;
}

#main_question {
  z-index: 100;
  //display: none;
}

#back_question {
  z-index: 1;
}

</style>
