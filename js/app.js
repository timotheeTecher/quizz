const form           = document.querySelector('.quizz__form');
const resultTitle    = document.querySelector('.result-title');
const mark           = document.querySelector('.quizz__mark');
const help           = document.querySelector('.quizz__help');
const allQuestions   = document.querySelectorAll('.question');

let userAnswers    = [];
let checkTable     = [];
const quizzAnswers = ['c', 'a', 'b', 'a', 'c'];
const emojis       = ['✅','✨','👀','😭','👎'];

const displayResults = answersArray => {
    const nbOfMistakes = answersArray.filter(answer => answer === false).length;
    switch (nbOfMistakes) {
        case 0:
            resultTitle.innerText = "✅ Bravo, c'est un sans faute ! ✅";
            help.innerText = '';
            mark.innerText = '5/5';
            break;
        case 1:
            resultTitle.innerText = `✨ Vous y êtes presque ! ✨`
            help.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
            mark.innerText = '4/5'
            break;
        case 2:
            resultTitle.innerText = `✨ Encore un effort ... 👀`
            help.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            mark.innerText = '3/5'
            break;
        case 3:
            resultTitle.innerText = `👀 Il reste quelques erreurs. 😭`
            help.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            mark.innerText = '2/5'
            break;
        case 4:
            resultTitle.innerText = `😭 Peux mieux faire ! 😭`
            help.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            mark.innerText = '1/5'
            break;
        case 5:
            resultTitle.innerText = `👎 Peux mieux faire ! 👎`
            help.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            mark.innerText = '0/5'
            break;

        default:
            'Woops, cas innatendu.';
    }
}

const giveAColor = answersArray => {
    for (let i = 0; i < answersArray.length; i++) {
        if (answersArray[i] === true) {
            allQuestions[i].style.background = 'lightgreen';
        } else {
            allQuestions[i].style.background = '#ffb8b8';
            allQuestions[i].classList.add('failure');
            setTimeout(() => {
                allQuestions[i].classList.remove('failure');
            }, 500)
        }
    }
}

const checkUserAnswers = answersArray => {
    for (let i = 0; i < 5; i++) {
        if (answersArray[i] === quizzAnswers[i]) {
            checkTable.push(true);
        } else {
            checkTable.push(false);
        }
    }
    displayResults(checkTable);
    giveAColor(checkTable);
    checkTable = [];
}

form.addEventListener('submit', e => {
    e.preventDefault();
    for (let i = 1; i < 6; i++) {
        let userAnswer = document.querySelector(`input[name="q${i}"]:checked`).value;
        userAnswers.push(userAnswer);
    }
    checkUserAnswers(userAnswers);
    userAnswers = [];
});

allQuestions.forEach(question => {
    question.addEventListener('click', () => {
        question.style.background = 'white';
    });
});