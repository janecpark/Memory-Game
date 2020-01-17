const card = document.querySelectorAll('.card')
let cards = [...card]
const grid = document.querySelector('.grid');
const newGame = document.querySelector('#reset')
const moves = document.querySelector('#moves')
const winner = document.querySelector('#winner')
const localUI = document.querySelector('#local')
let flipped = [];
let counter = 0;
let matches = 0;
let winningScore = cards.length/2;
let highscore = 0;
let clicked = false;

localUI.textContent = '';
cards.forEach(card=> card.addEventListener('click', flipcard));

newGame.addEventListener('click', function(){
    shuffle()
    flipped = [];
    for(let card of cards){
        card.classList.remove('match')
        card.classList.remove('flip')
        card.classList.remove('disable')
    }
    counter=0;
    matches =0;
    winner.textContent = '';
    moves.textContent = counter;
});

function shuffle(){
    cards.forEach(card=>{
        let random = Math.floor(Math.random() * 8)
        card.style.order = random;
    });
};

function flipcard(e){
    let clickedCard;
    if(clicked){
        return;
    }
    clickedCard = e.target.parentElement;
    clickedCard.classList.add('flip')
    flipped.push(clickedCard)
    clickedCard.classList.add('disable')
    if(flipped.length === 2){
        counter++;
        moves.textContent = counter;
            if(flipped[0].dataset.name === flipped[1].dataset.name){
                match();
                matches++;
                if(matches === winningScore){
                    winner.textContent = `Completed in ${counter} moves!`
                    disableClick()
                    if(highscore === 0){
                        localScore();
                    }else if(counter < highscore){
                        localScore();
                    }
                } 
                
            }else{
                unmatch();
                
            }
    }
        this.classList.add('flip')
        flipped.push(this)
        this.classList.add('disable')
        if(flipped.length === 2){
            counter++;
            moves.textContent = counter;
                if(flipped[0].dataset.name === flipped[1].dataset.name){
                    match();
                    matches++;
                    if(matches === winningScore){
                        winner.textContent = `Completed in ${counter} moves!`
                        disableClick()
                        if(highscore === 0){
                            localScore();
                        }else if(counter < highscore){
                           localScore();
                        }
                    } 
                    
                }else{
                    unmatch();
                    
                }
        }
};

function match(){
    clicked = true;
    setTimeout(() => {      
        flipped[0].classList.add('match')
        flipped[1].classList.add('match')
        flipped=[];
        clicked = false;
    }, 1000);
    
};

function unmatch(){
    clicked = true;
    setTimeout(() => {
        flipped[0].classList.add('close');
        flipped[1].classList.add('close');
        flipped[0].classList.remove('flip')
        flipped[1].classList.remove('flip')
        flipped[0].classList.remove('close');
        flipped[1].classList.remove('close');
        flipped[0].classList.remove('disable')
        flipped[1].classList.remove('disable')
        flipped=[];
        clicked = false;
    },1000);
      
};

function localScore(){ 
    localStorage.setItem('highscore', counter)
    highscore= localStorage.getItem('highscore')
    highscore = parseInt(highscore)
    localUI.textContent = ` Your best score: ${highscore} moves`;    
}


function disableClick(){
    for(let card of cards){
        card.classList.add('disable')
    }
}


function enableClick(){
    for(let card of cards){
        card.classList.remove('disable')
    }
}
