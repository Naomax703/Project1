'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');
    const level=document.querySelector('#level');
    const audio = document.querySelector('.not');
    const audio2 = document.querySelector('.good');
    const btn1 = document.getElementById('btn-1');
    // const audio3 = document.querySelector('.main').play();
    // audio3.volume = 0.2;

    

    
    const quiz = [
        {q: 'What was the first capital in Japan?', 
        answers:[{answer: "Nara", img: "./img/nara.jpg"},
        {answer: "Kyoto", img: "./img/kyoto.jpg"},
        {answer: "Tokyo", img: "./img/tokyo.jpg"},
        {answer: "Versailles", img: "./img/versailles.jpg"}]},
        {q: 'What did the romans drop in wine to improve the health before drinking?', 
        answers:[{answer: "Toast", img: "./img/toast.jpg"},
        {answer: "Egg", img: "./img/egg.jpg"},
        {answer: "Water", img: "./img/water.jpg"},
        {answer: "Olive oil", img: "./img/olive.jpeg"}]},
        {q: 'Who introduced cutlery in France?', 
        answers:[{answer:"Catherine de Médicis", img: "./img/Catherine de medicis.jpg"},
        {answer: "Marie Antoinette", img: "./img/marie.jpg"},
        {answer: "'Napoléon", img: "./img/napoleon.jpg"},
        {answer: "Henri ll", img: "./img/henri.jpg"}]},

        {q: 'Which country does not have a capital?', 
        answers:[{answer:"Republic of Nauru", img:"./img/nauru.jpg"},
        {answer: "Vanuatu", img:"./img/vanautu.jpg"},
        {answer: "Tuvalu", img:"./img/tuvaku.jpg"},
        {answer: "Niue", img:"./img/niue.jpg"}]},
        {q: 'What was the first European civilization in Japan?', 
        answers:[{answer: "Portuguese", img: "./img/portugal.jpg"},
        {answer: "Spanish", img: "./img/spain.jpg"},
        {answer: "Dutch", img:"./img/dutch.jpg"},
        {answer: "German", img:"./img/germany.jpg"}]},
        {q: 'Who built Quebec city in Canada ?',
        answers:[{answer:"Samuel de champlain", img:"./img/samuel.jpg"},
        {answer: "Jacques Cartier", img:"./img/jacques.jpeg"},
        {answer: "Céline Dion", img:"./img/celine.jpg"},
        {answer: "John Cabot", img:"./img/jhon.jpeg"}]}
        ];


    let currentNum = 0;
    let answerd = false;
    let score = 0;
    // console.log(quiz[0].img[0])


    function shuffle(arr){
        for (let i = arr.length -1; i >0; i--){
        const x = Math.floor(Math.random() * (i+1));
        [arr[x],arr[i]] = [arr[i], arr[x]];
        }
        return arr;
    }

    function checkAnswer(li){
        if (answerd === true){
            return;
        }
        answerd = true;

        if(li.textContent === quiz[currentNum].answers[0].answer) {
          li.classList.add('correct');

          if(score < 300){
            score+=100;

          }else if (score >= 300){
            score+=200;
        }
          const score1 = document.querySelector('.score');
          score1.textContent = `Your score is ${score}!`
        
          audio2.play();
          audio2.volume = 0.2;
        } 


        else {
            li.classList.add('wrong');
            audio.play();
            audio.volume = 0.2;
          }
          btn.classList.remove('disabled');
        }  

  function levelUP(li){
    if(li.textContent === quiz[currentNum].answers[0].answer && score === 300) {
      btn1.textContent = `Level UP! Your score will be +200!`
      btn1.classList.add('continue');
  } else {
    btn1.classList.remove('continue');
  }
}
        
  function Quiz() {
    answerd = false;
    question.textContent = quiz[currentNum].q;
    btn1.classList.remove('continue');

  if(currentNum === 0 && answerd === false){
    const score1 = document.querySelector('.score');
    score1.textContent = `Your score is ${score}!`
  }

    while(choices.firstChild){
       choices.removeChild(choices.firstChild);

       const score1 = document.querySelector('.score');
       score1.textContent = `Your score is ${score}!`
    }


    const shuffledChoices = shuffle([...quiz[currentNum].answers]);
    // console.log((quiz[currentNum].answers));
    // console.log((quiz[currentNum].img));
    shuffledChoices.forEach(choice => {

       const li = document.createElement('li');
       const img = document.createElement('img');
    //    <li></li>
       li.textContent = choice.answer;
       img.src = choice.img;
       li.addEventListener('click', () => {
        checkAnswer(li);
        levelUP(li);
       });
       choices.appendChild(li);  
       li.appendChild(img);  
    // //    <img src="https://images.app.goo.gl/mDXM3KmcKrooogdK7">


    });


    if(currentNum === quiz.length-1){
      btn.textContent = "Show Score";
    }
  }
  Quiz();

  btn.addEventListener('click', () => {
      if(btn.classList.contains('disabled')){
        return;
      }
      btn.classList.add('disabled');

      if(currentNum === quiz.length-1){
        //   console.log(`Your score is ${score}`);
          scoreLabel.textContent = `Your Total score is ${score}`;
          result.classList.remove('hidden');
      } else {
        currentNum++;
        Quiz();
      }
  });
}
