/* You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.

Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories. If you only need a single instance of something (e.g. the gameboard, the displayController etc.) then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances. */

let score = 0
let matches = 0
let turn = 0
let boardclick = document.querySelector('body')
let allsquares = document.getElementsByClassName('gamesquare')




let game = {
    
    //0 event watcher for buttons to trigger rest of script 0
    'clickwatcher': boardclick.addEventListener('click', (event) =>
     {

        let gameclick = document.getElementById('gamecontainer')
        let startgame = document.getElementById('newgame')
       

        

       if (event.target === startgame || turn === 0 || turn > 8) {
            game.newgame(event.target)
        }
        
     

        if (event.target.parentElement === gameclick) {
        //take a turn   
            if (firstPlayer.order === 0 ) {
                first = firstPlayer
                second = secondPlayer
            } else {
                first = secondPlayer
                second = firstPlayer

            }

            
            if (turn % 2 === 0) {
            player = first
            } else {
            player = second
            }
        
        let selection = event.target.id
        event.target.classList.add(player.symbol)

        let firstplayermoves = firstPlayer.moves
        let secondplayermoves = secondPlayer.moves

      


        let dupcheck = (first, second, selection) => {
            for (let move of first) {
                if (move.toString() === selection) {
                    return true
                }
            } 
    
            for (let move of second) {
                if (move.toString() === selection) {
                    return true
                }
             } 

            }

            if (dupcheck(firstplayermoves, secondplayermoves, selection)) {
                event.preventDefault()
            } else {game.taketurn(player, selection)
            }
      
        
     }
        
              
    }),

    //1 board state/win condition arrays 1
    'templates': [
           
            //board ID template array
            [
                0, 1, 2, 3, 4, 5, 6, 7, 8
            ] ,

            //win conditions, if can think of how change background of winning line to gold
            [   
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ] ,

            //change this array as play splicing selected entries.
            [
                0, 1, 2, 3, 4, 5, 6, 7, 8
            ] 
                
    ],

    //2 reset and initiate game 2
    'newgame': function newgame()    
    {
            turn = 0
            let whox = document.getElementsByClassName('radiox')
            let whoo = document.getElementsByClassName('radioo')
            let whofirst = document.getElementsByName('whofirst')
            let whoami = document.getElementsByClassName('playername')

          
        
            //copy board template to playboard
            game.templates[2] = [...game.templates[0]]

            //remove x and o classes to remove images
            for (const square of allsquares) {
                square.classList.remove('x', 'o')
                }

        function createPlayers() {
            if (whox[0].checked && whoo[0].checked !== true) {
                firstPlayer.symbol = 'x'

            }else {
                secondPlayer.symbol = 'x'
            }

            if (whoo[0].checked && whox[0].checked !== true) {
                firstPlayer.symbol = 'o'

            }else{
                secondPlayer.symbol = 'o'
            }
       
            if (whofirst[0].checked) {
                firstPlayer.order = 0
                secondPlayer.order = 1

            } else {
                firstPlayer.order = 1
                secondPlayer.order = 0
            }
            firstPlayer.name[1] = whoami[0].value
            secondPlayer.name[1] = whoami[1].value

            firstPlayer.moves = []
            secondPlayer.moves = []
            firstPlayer.matches = []
            secondPlayer.matches = []
        }
        createPlayers()    
    },
    
    //3 playing the game 3
    'taketurn': function taketurn(player, selection)         
    {
        // selection = Math.floor(Math.random((game.templates[2].length)) * (game.templates[2].length))
        let arraylength = player.moves.length
        
        
     
      
        if (arraylength < 9) {
          
    
           player.moves[arraylength] = game.templates[0][selection]
        };
       


      
        function winchecker(player, wincon) {
            let p1results = document.getElementById('p1results')
            let p2results = document.getElementById('p2results')       
            let moves = player.moves

            if (player.name[1] === '') {
                player.name[1] = player.name[0]
            }


            checkconditions = wincon.forEach(conditions => {

                let compare = (moves, condition) => condition.every((condmatches) => moves.includes(condmatches));

            
                if (compare(moves, conditions)) {
                    player.score++

                    if (player === firstPlayer) {
                        p1results.textContent = `${player.name[1]} has ${player.score} wins!`
                    } else {
                        p2results.textContent = `${player.name[1]} has ${player.score} wins!`
                        }

                    game.newgame()
                }
            })          
        };

        turn++
   
        if (player.moves.length >= 3) {
            winchecker(player, game.templates[1])
         }
    }  
    
}

let firstPlayer =  {
    'order': 1,
    'score': 0,
    'moves': [],
    'name': ['Player 1'],
}

let secondPlayer =  {
    'order': 2,
    'score': 0,
    'moves': [],
    'name':['Player 2'],
} 