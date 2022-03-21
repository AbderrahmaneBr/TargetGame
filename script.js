var Score = 0, Time = 60, beforeTime = 3
const scoreHTML = document.getElementById('Score')
const timeHTML = document.getElementById('Time')
const beforeTimeHTML = document.getElementById('beforeTime')
const Screen = document.querySelector('.Screen')
const Target = document.createElement('div')
const startButton = document.getElementById('startButton')
const gameContent = document.querySelector('.AllContainer')
const StartMenu = document.querySelector('.StartMenu')
const endScreen = document.querySelector('.endScreen')
const replayButton = document.getElementById('replayButton')
const endScore = document.getElementById('endScore')

// Hiding game til user press start
gameContent.style.display = 'none'
endScreen.style.display = 'none'

Target.className = 'Target'
const TargetChild = document.createElement('div')
TargetChild.className = 'TargetChild'
const TargetChildTwo = document.createElement('div')
TargetChildTwo.className = 'TargetChildTwo'
TargetChild.appendChild(TargetChildTwo)
Target.appendChild(TargetChild)
Screen.appendChild(Target)


const setTarget = (Target, x, y)=>{
    Target.style.marginTop = `${y}px`
    Target.style.marginLeft = `${x}px`
}

var randX, randY, coefX, coefY

startButton.addEventListener('click', ()=>{
    StartMenu.style.display = 'none'
    gameContent.style.display = 'flex'

    const beforeTimeInterval = setInterval(()=>{
        beforeTime -= 1
        beforeTimeHTML.innerHTML = beforeTime

    if(beforeTime==0){
        clearInterval(beforeTimeInterval)
        beforeTimeHTML.style.display = 'none'
        const inter = setInterval(()=>{
            Target.style.opacity = '100'

            if (window.innerWidth>1300){
                coefX=0.74
                coefY=0.7
            } else if (window.innerWidth>=800&&window.innerWidth<=1300){
                coefX=0.7
                coefY=0.7
            } else if (window.innerWidth<800){
                coefX=0.64
                coefY=0.7
            }

            randX = Math.floor(Math.random()*window.innerWidth*coefX)
            randY = Math.floor(Math.random()*window.innerHeight*coefY)
            
            setTarget(Target, randX, randY)
            
        }, 700)

        const countDown = setInterval(() => {
            Target.style.pointerEvents = "all"

            // When The Game Ends
            if(Time==0){
                gameContent.style.display = 'none'
                endScreen.style.display = 'flex'
                endScore.innerHTML = Score

                replayButton.addEventListener('click', ()=>{location.reload()})
            }
            Time -= 1
            timeHTML.innerHTML = Time
        }, 1000);


        Target.addEventListener('click', ()=>{
            Score += 100
            scoreHTML.innerHTML = Score
            Target.style.opacity = '0'
            Target.style.pointerEvents = "none"
            
        })

    }
}, 1000)
})
