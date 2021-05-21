function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },

    methods:{
        startGame(){
            this.playerHealth= 100,
            this.monsterHealth= 100,
            this.currentRound= 0,
            this.winner= null,
            this.logMessages = []
        },
        attackMonster(){
            const attackValue = getRandom(5,12)
            this.monsterHealth -= attackValue;
            this.currentRound++
            this.addLogMessage('Player','attack', attackValue)
            this.attackPlayer()
        },
        attackPlayer(){
            const attackValue = getRandom(8,15)
            this.playerHealth-= attackValue
            this.addLogMessage('Monster','attack', attackValue)
        },
        specialAttack(){
            const attackValue = getRandom(10,25)
            this.monsterHealth -= attackValue
            this.addLogMessage('Player','attack', attackValue)
            this.attackPlayer()
            this.currentRound++
        },

        healPlayer(){
            const healValue = getRandom(8,20)
            if(this.playerHealth + healValue>100)
                this.playerHealth = 100
            else{
                this.playerHealth += healValue
            }
            this.attackPlayer()
            this.addLogMessage('Player','heal', healValue)
        },
        surrender(){
            this.winner = 'monster'
        },

        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },

    computed: {
        playerHealthBar(){
            if(this.playerHealthBar < 0)
                return {width: '0%'}
            else 
                return {width: this.playerHealth+'%'}    
        },

        monsterHealthBar(){
            if(this.monsterHealthBar < 0)
                return {width: '0%'}
            else 
                return {width: this.monsterHealth+'%'}
        },
        
        isSpecialAttackAvailable(){
            return this.currentRound % 3 === 0
        },

        theWinner(){
            const possibilities = {'monster': 'You Lost!', 'player':'You Won!', 'draw':'It\'s a draw!'}
            return possibilities[this.winner]
        }
    },
    
    watch:{
        playerHealth(value){
            if(this.monsterHealth<=0 && value==0)
                this.winner='draw'

            else if(value <=0 )
                this.winner = 'monster'
        },

        monsterHealth(value){
            if(this.playerHealth<=0 && value==0)
                this.winner='draw'

            else if(value <=0 )
                this.winner = 'player'
        },
    }

});

app.mount('#game');