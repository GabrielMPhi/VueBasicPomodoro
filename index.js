let app = Vue.createApp({ 

 })

 app.component('vue_pomodoro', {
    template: `
    <div>
      <div>Pomodoro de Gab & outil pour véro</div>
      {{ secondes_en_temps(secondes) }}
      <div>     
      <button v-on:click="start_timer">Commencer</button>
      <button v-on:click="stop_timer">Stop</button>
      <button v-on:click="secondes+=1">Plus 1 sec</button>
      </div>
      <vue_settings v-model:secondes="secondes"
      @changed="onSecondesChanged" />
      </div>
    `,
    data: function (){
        return {
            secondes: 10,
            timer: null,
        }
    },
    methods: {
        start_timer() {
            this.timer = window.setInterval(this.decrement, 1000)
        },
        decrement(){
            if(this.secondes > 0){
                this.secondes -= 1; 
            } else {
                this.stop_timer()
            }
        },
        stop_timer(){
            window.clearInterval(this.timer)
        },
        onSecondesChanged(value){
            this.secondes = value    
        },
        secondes_en_temps(n){
            let minutes = Math.floor(n / 60);
            let remaindersecondes = n % 60;
            let result = `${minutes}:${remaindersecondes < 10 ? '0' : ''}${remaindersecondes}`;
            return result
        }
    },
    components: ['vue_settings'],
  });

  app.component('vue_settings', {
    template: `
    <div>
    <form @submit.prevent="changeSecondes">
       Temps <input v-model="enfantSecondes">
        <button value="Submit"> Augmenter </button>
       </form>
    </div>
    `,
    props: ['secondes'],
    data: function(){
        return {
            enfantSecondes: this.secondes
        }
    },
    methods: {
        changeSecondes(event){
            this.$emit('changed', this.enfantSecondes)
        }
    }
  });



  app.mount("#app");