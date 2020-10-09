'use strict'

{
  // APIの呼び出し
  async function callApi(){
    const res = await fetch('https://opentdb.com/api.php?amount=10');
    const users = await res.json();
    console.log(users.results);

    // それぞれのIDの取得
        const questionnumber = document.getElementById('questionnumber');
        const question = document.getElementById('question');
        const genre = document.getElementById('genre');
        const difficulty = document.getElementById('difficulty');
        const answers = document.getElementById('answers');
        const scoreLabel = document.querySelector('#result > p ')
        
        let currentNum = 0;
        let score = 0;
      
        // クイズ表示の処理
        function setQuiz () {
          questionnumber.textContent = `${[currentNum + 1]}問題`
          question.textContent = users.results[currentNum].question;
          genre.textContent = `[ジャンル]:${users.results[currentNum].category}`;
          difficulty.textContent = `[難易度]:${users.results[currentNum].difficulty}`;

          while(answers.firstChild) {
            answers.removeChild(answers.firstChild);
          }

          const answerslist = [];
          answerslist.push(...users.results[currentNum].incorrect_answers);
          answerslist.push(users.results[currentNum].correct_answer);
          
            const shuffleAnswers = shuffle([...answerslist])
            console.log(shuffleAnswers);
            shuffleAnswers.forEach((answer, index) => {
              const li = document.createElement('li')
              li.textContent = answer;
              answers.appendChild(li);
              li.addEventListener('click', () => {
                console.log(users.results[currentNum].correct_answer);

                // 正解数の処理
                if (li.textContent === users.results[currentNum].correct_answer) {
                  score++;
                }

                // 結果と次の問題への処理
                if (currentNum === users.results.length - 1) {
                  scoreLabel.textContent = `あなたの正解数は${score}/ ${users.results.length}です`;
                  result.classList.remove('hidden');
                } else {
                  currentNum++;
                  console.log(currentNum);
                  setQuiz(); 
                }
              });
            });
        }

        // シャッフルの処理
        function shuffle(arr) {
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
          }
          return arr;
        }

        setQuiz();
  }

  // 非同期処理の待ち時間の処理
  function blockTime(timeout) { 
    const startTime = Date.now();
    while (true) {
        const diffTime = Date.now() - startTime;
        if (diffTime >= timeout) {
            return; 
        }
    }
}

// 非同期処理の機能
document.getElementById('start').addEventListener('click', () => {
  setTimeout(() => {
    home.classList.add('hidden');
    container.classList.remove('hidden');
      callApi();
      blockTime(2000); 
  }, 10);
  const container = document.getElementById('container')
  const home = document.getElementById('home')
  while(home.firstChild) {
    home.removeChild(home.firstChild);
  }

  const text1 = document.createElement('p')
  const text2 = document.createElement('p')

 text1.textContent =('取得中');
 text2.textContent =('少々お待ちください');
  home.appendChild(text1);
  home.appendChild(text2);

})




  
}