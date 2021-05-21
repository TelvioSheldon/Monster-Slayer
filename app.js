function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
const app = Vue.createApp({
    data() {
        return {
            monster: {
                health: 100,
            },

            player: {
                health: 100,
            },
            currentRound: 0,
            winner: null,
            logMessages: [],
        }
    },

    methods: {
        startGame(){
            this.monster.health = 100
            this.player.health = 100
            this.currentRound = 0
            this.winner = null
            this.logMessages = []
        },

        attackMonster() {
            const attackValue = getRandom(5, 12)
            this.monster = { ...this.monster, health: this.monster.health - attackValue }
            this.currentRound++
            this.addLogMessage('Player', 'attack', attackValue)
            this.attackPlayer()
        },

        attackPlayer() {
            const attackValue = getRandom(8, 15)
            this.player = { ...this.player, health: this.player.health - attackValue }
            this.addLogMessage('Monster', 'attack', attackValue)
        },

        specialAttackMonster() {
            const attackValue = getRandom(10, 25)
            this.monster = { ...this.monster, health: this.monster.health - attackValue }
            this.addLogMessage('Player', 'Special attack', attackValue)
            this.attackPlayer()
            this.currentRound++
        },

        healPlayer() {
            const healValue = getRandom(8, 20)

            if (this.player.health + healValue > 100)
                this.player.health = 100;
            else
                this.player = { ...this.player, health: this.player.health + healValue }
            this.addLogMessage('Player', 'heal', healValue)
            this.attackPlayer()
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
        },
    },

    computed: {
        monsterHealthBar() {

            if(this.monster.health<0)
                return {width: '0%'}
            else 
                return {width: this.monster.health + '%'} 
        },

        playerHealthBar() {
            if(this.player.health<0)
                return {width:'0%'}
            
            else
                return { width: this.player.health + '%' }
        },
        isSpecialAttackAvailable() {
            return (this.currentRound % 3 === 0)
        },

        theWinner() {
            const possibilities = {'monster':'You Lost!', 'player':'You Won!', 'draw': 'It\'s a draw!'}
            return possibilities[this.winner]
         
        }
    },

    watch: {
        'player.health'(value) {
            if (value <= 0 && this.monster.health <= 0) {
                this.winner = 'draw'

            }
            else if (value <= 0) {
                this.winner = 'monster'
            }

        },

        'monster.health'(value) {
            if (value <= 0 && this.player.health <= 0) {
                this.winner = 'draw'

            }
            else if (value <= 0) {
                this.winner = 'player'
            }
        }
    }

});

app.mount('#game');