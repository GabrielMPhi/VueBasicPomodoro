let app = Vue.createApp({ 

 })

 app.component('vue_pomodoro', {
    template: `
    <div>
      <div>Pomodoro de Gab & outil pour véro</div>
      <div class="title">{{ secondes_en_temps(secondes) }}</div>
      <progress class="progress" :value="secondes" :max="maximum">15%</progress>
      <div class="box">     
      <button class="button is-primary" v-on:click="start_timer">Commencer</button>
      <button class="button is-primary" v-on:click="stop_timer">Stop</button>
      <button class="button is-primary" v-on:click="secondes+=1">Plus 1 sec</button>
      <button class="button is-primary" v-on:click="secondes=1500">25 minutes</button>
      </div>
      <div class="box">
      <vue_settings @sec_changed="onSecondesChanged" @min_changed="onSecondesChanged" />
      </div>
      <div class="box is-primary"> Nombre de pomodoro complété : {{ pomodoro_complete }} </div>
      <button class="button is-primary" v-on:click="pomodoro_complete=0">Remettre les pomodoros complétés à 0</button>
      </div>
    `,
    data: function (){
        return {
            secondes: 10,
            timer: null,
            maximum: 10,
            pomodoro_complete:0,
            son_succes: new Audio('succes.mp3')
        }
    },
    mounted(){
        if(localStorage.temps){
            this.secondes = JSON.parse(localStorage.temps)
        }
        if(localStorage.nb_pomodoro){
            this.pomodoro_complete = JSON.parse(localStorage.nb_pomodoro)
        }
    }
    ,
    watch: {
        secondes(newTime){
            localStorage.temps = JSON.stringify(newTime)
        },
        pomodoro_complete(nbPomodo){
            localStorage.nb_pomodoro = JSON.stringify(nbPomodo)
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
                this.pomodoro_complete+=1
                this.play_sound()
                this.stop_timer()
            }
        },
        stop_timer(){
            window.clearInterval(this.timer)
        },
        onSecondesChanged(value){
            this.secondes = this.secondes + value
            this.maximum = this.maximum + value
        },
        secondes_en_temps(n){
            let minutes = Math.floor(n / 60);
            let remaindersecondes = n % 60;
            let result = `${minutes}:${remaindersecondes < 10 ? '0' : ''}${remaindersecondes}`;
            return result
        },
        play_sound(){
            this.son_succes.play()
        }
    },
    components: ['vue_settings'],
  });

  app.component('vue_settings', {
    template: `
    <div>
    Secondes 
    <button class="button is-primary" v-on:click="enfantSecondes+=1">+</button>
    <button class="button is-primary" v-on:click="enfantSecondes-=1">-</button>
    <form @submit.prevent="changeSecondes">
       <input v-model="enfantSecondes">
        <button class="button is-primary" value="Submit"> Augmenter les secondes</button>
       </form>
    </div>

    <div>
    Minutes 
    <button class="button is-primary" v-on:click="enfantMinutes+=1">+</button>
    <button class="button is-primary" v-on:click="enfantMinutes-=1">-</button>
    <form @submit.prevent="changeMinutes">
       <input v-model="enfantMinutes">
        <button class="button is-primary" value="Submit"> Augmenter les minutes</button>
       </form>
    </div>

    `,
    props: ['secondes'],
    emits: ['min_changed', 'sec_changed'],
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
