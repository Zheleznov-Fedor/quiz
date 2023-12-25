<script setup>
import Lobby from './components/Lobby.vue'
import End from './components/End.vue'
import Questions from './components/Questions.vue'
</script>

<template>
  <Lobby msg="" v-if="SCREEN_TO_SHOW === 'Lobby'" ref="lobby"></Lobby>
  <Questions v-if="SCREEN_TO_SHOW === 'Questions'" ref="questions" :questions="questions"></Questions>
  <End v-if="SCREEN_TO_SHOW === 'End'" ref="end" :winners="winners"></End>
</template>

<script>
export default {
  // setup() {
  //   const questions = ref(null);
  //
  //   const myMethod = () => {
  //     console.log('Method called:', questions.value);
  //   };
  //
  //   // Return variables and functions to be accessed in the template
  //   return {
  //     questions,
  //     myMethod,
  //   };
  // },
    // const questions = ref(null);
    // console.log(123)
    // let connection = new WebSocket('ws://localhost:8765');
    // connection.onopen = () => {
    //   console.log('Websocket connected.');
    //   this.connectedStatus = 'Connected';
    //   connection.send("1234");
    // }
    //
    // connection.onmessage = (event) => {
    //   questions.parse_user_request('show_citata');
    //   this.bus.$emit('submit')
    // }
    //
    // connection.onclose = (event) => {
    //   console.log(event);
    // }
    //
    // return {
    //   questions
    // };
  data() {
    return {
      SCREEN_TO_SHOW: "Lobby",
      questions: [],
      winners: []
    }
  },
  methods: {
    hide_lobby(questions) {
      this.questions = questions
      this.$refs.lobby.$.ctx.hide_self()
      setTimeout(() => {
        this.SCREEN_TO_SHOW = 'Questions'
        setTimeout(() => {
          this.$refs.questions.$.ctx.first_time_show_questions(questions)
        }, 200)
      }, 500)
    },
    hide_questions() {
      this.$refs.questions.$.ctx.swap_to_end()
      setTimeout(() => {
        this.SCREEN_TO_SHOW = 'End'
      }, 500)
    }
  },
  created() {
    let connection = new WebSocket('ws://localhost:8765');
    connection.onopen = () => {
      console.log('Websocket connected.');
      connection.send("1234");
    }

    connection.onmessage = (event) => {
      console.log(event)
      if (event.data.startsWith('start_questions')) {
        this.hide_lobby(JSON.parse(event.data.split('::').at(-1)))
        return
      }
      if (event.data.startsWith('show_results')) {
        this.hide_questions()
        this.winners = JSON.parse(event.data.split('::').at(-1))
        return
      }
      else if (event.data.startsWith('lobby')) {
        this.$refs.lobby.$.ctx.parse_user_request(event)
      } else if (event.data.startsWith('question')) {
        this.$refs.questions.$.ctx.parse_user_request(event)
      } else if (event.data.startsWith('end')) {
        this.$refs.end.$.ctx.parse_user_request(event)
      }
    }

    connection.onclose = (event) => {
      console.log(event);
    }
  },
  mounted() {
  }
}
</script>

<style>
body {
  height: 100%;
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
