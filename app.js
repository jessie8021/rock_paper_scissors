new Vue({
    el: '#app',
    data: {
        count: 3,
        userChoice: null,
        comChoice: null,
        rock_paper_scissors: [
            {name: '가위', value: 'scissors'},
            {name: '바위', value: 'rock'},
            {name: '보', value: 'paper'}
        ],
        winner: null,
        userLife: 3,
        comLife: 3,
        fullLife: 3,
        isSelectable: true,
        logs: [],
        isGameOver: false
    },
    watch:{},
    computed:{
        selectUserChoiceImage: function(){
            return this.userChoice === null? 'question' : this.userChoice
        },
        selectComChoiceImage: function(){
            return this.comChoice === null? 'question' : this.comChoice
        }

    },
    methods:{
        playGame: function(){
            if(this.userChoice === null){
                alert('가위, 바위, 보를 선택해 주세요.')
                return false
            }
            this.isSelectable = false
            this.comChoice = null

            let countDown = setInterval(()=>{
                this.count --
                if(this.count === 0){
                    clearInterval(countDown)
                    this.selectComChoice()
                    this.decideWinner()
                    this.setLife()
                    this.count = 3
                    this.isSelectable = true

                    this.setLogs()
                    this.resetGame()

                }

            }, 1000)
        },
        selectComChoice: function(){
            if(this.count === 0){
                let number = Math.random()
                if(number > 0.33){
                    this.comChoice = 'scissors'
                }else if(number > 0.66){
                    this.comChoice = 'rock'
                }else{
                    this.comChoice = 'paper'
                }
            }
        },
        decideWinner: function () {

            if(this.userChoice === this.comChoice){
                this.winner = null
                return false
            }

            switch (this.userChoice){
                case 'scissors':
                    this.winner = this.comChoice === 'paper'? 'user': 'com'
                    break;
                case 'rock':
                    this.winner = this.comChoice === 'scissors'? 'user': 'com'
                    break;
                case 'paper':
                    this.winner = this.comChoice === 'rock'? 'user': 'com'
                    break;
            }
        },
        setLife: function () {

            if(this.winner === 'com') {
                this.userLife --
            }
            if(this.winner === 'user') {
                this.comLife --
            }

        },
        setLogs: function () {
            this.logs.unshift({winner: this.winner, message: `YOU: ${this.userChoice}, COMPUTER: ${this.comChoice}`})
        },
        resetGame: function () {
            if(this.userLife === 0 || this.comLife === 0){
                let msg = this.winner === 'user' ? 'YOU WIN!' : 'COMPUTER WIN!'
                this.logs.unshift({winner: this.winner, message: `GAMEOVER! ${msg} `})
                this.isGameOver = true
            }

        }

    },
})