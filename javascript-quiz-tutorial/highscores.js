const highScoreList = document.querySelector('#highScoreList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoreList.innerHTML =
    highScores.map(score => {
        `return <li class="high-score">4{score.name} - ${score.score}</li>`

    })