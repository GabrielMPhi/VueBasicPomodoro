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
      <vue_settings @sec_changed="onSecondesChanged" @min_changed="onSecondesChanged" />
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
            this.secondes = this.secondes + value    
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
        <button value="Submit"> Augmenter les secondes</button>
       </form>
    </div>

    <div>
    <form @submit.prevent="changeMinutes">
       Temps <input v-model="enfantMinutes">
        <button value="Submit"> Augmenter les minutes</button>
       </form>
    </div>

    `,
    props: ['secondes'],
    data: function(){
        return {
            enfantSecondes: 0,
            enfantMinutes: 0
        }
    },
    methods: {
        changeSecondes(event){
            this.$emit('sec_changed', parseInt(this.enfantSecondes, 10))
        },
        changeMinutes(event){
            this.$emit('min_changed', parseInt(this.enfantMinutes, 10)*60)
        }
    }
  });



  app.mount("#app");
