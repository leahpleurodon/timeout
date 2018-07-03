//answer arrays kept in answer.js for readability.
const q1Section = document.getElementById("q1");
const q1Input = q1Section.getElementsByTagName("input")[0];
const q1Btn = q1Section.getElementsByTagName("button")[0];
const q1Timer = q1Section.getElementsByClassName("timer")[0];
const q1Results = q1Section.getElementsByClassName("results")[0];

const q2Section = document.getElementById("q2");
const q2Input = q2Section.getElementsByTagName("input")[0];
const q2Btn = q2Section.getElementsByTagName("button")[0];
const q2Timer = q2Section.getElementsByClassName("timer")[0];
const q2Results = q2Section.getElementsByClassName("results")[0];


let isQ1Running = false;
let isQ2Running = false;
let q1PrevGuess = [];
let q2PrevGuess = [];
let q1CorrectAnswers = 0;
let q2CorrectAnswers = 0;
let activeCountDown = undefined;
let activeTimer = undefined;


q1Timer.innerText = "30";
q2Timer.innerText = "90";

const q1Checker = (answer) =>{
    answer = answer.replace(/[^\w \s]/g, '').toLowerCase();
    if (q1PrevGuess.indexOf(answer) === -1){
        q1PrevGuess.push(answer)
        if (q1Answers.indexOf(answer) > -1){
            q1Results.innerText = q1Results.innerText + 
            q1Answers[q1Answers.indexOf(answer)] + "\n";
            q1Input.value = "";
            q1CorrectAnswers++;            
            if(q1CorrectAnswers === 5){
                endQ1(true);
            };
        };    
    };
};

const q2Checker = (answer) =>{
    answer = answer.replace(/[^\w \s]/g, '').toLowerCase();
    if (q2PrevGuess.indexOf(answer) === -1){
        q2PrevGuess.push(answer)
        if (q2Answers.indexOf(answer) > -1){
            q2Results.innerText = q2Results.innerText + 
            q2Answers[q2Answers.indexOf(answer)] + "\n";
            q2Input.value = "";
            q2CorrectAnswers++;            
            if(q2CorrectAnswers === 10){
                endQ2(true);
            };
        };    
    };
};

const startTimer = (questionNum, timeInSecs) => {
    let timeLeft = timeInSecs;
    if(questionNum === 1){
        activeCountDown = setInterval(()=>{           
            q1Timer.innerText = timeLeft;
            timeLeft--;
        }, 1000);
    }else if(questionNum === 2){
        activeCountDown = setInterval(()=>{
            q2Timer.innerText = timeLeft;
            timeLeft--;
        }, 1000);
    };
};

const endQ2 = (wonQuestion)=>{
    clearInterval(activeCountDown);
    clearTimeout(activeTimer);
    q2Input.disabled = true;
    q2Btn.disabled = true;
    q1Input.disabled = false;
    q1Btn.disabled = false;
    if(!wonQuestion){
        alert("Im a loser... TIME UP"); 
        q2Results.classList.add("unanswered")
    }else{
        alert("goo goo gjoob... CORRECT");
        q2Results.classList.add("answered");
    };
    activeTimer = undefined;
    activeCountDown = undefined;
};

const endQ1 = (wonQuestion)=>{
    clearInterval(activeCountDown);
    clearTimeout(activeTimer);
    q1Input.disabled = true;
    q1Btn.disabled = true;
    q2Input.disabled = false;
    q2Btn.disabled = false;
    if(!wonQuestion){
        alert("Im a loser... TIME UP"); 
        q1Results.classList.add("unanswered")
    }else{
        alert("goo goo gjoob... CORRECT");
        q1Results.classList.add("answered")
    };
    activeTimer = undefined;
    activeCountDown = undefined;
};




q1Btn.addEventListener("click", ()=>{
    startTimer(1,29);
    activeTimer = setTimeout(endQ1, 30000);
    q1Results.innerText="";
    q1Input.addEventListener("keyup", () =>{
        q1Checker(q1Input.value.trim());
    });
    q2Input.disabled = true;
    q2Btn.disabled = true;
    q1Btn.disabled = true;
});


q2Btn.addEventListener("click", ()=>{
    startTimer(2,89);
    activeTimer =  setTimeout(endQ2, 90000);
    q2Results.innerText="";
    q2Input.addEventListener("keyup", () =>{
        q2Checker(q2Input.value.trim());
    });
    q1Input.disabled = true;
    q1Btn.disabled = true;
    q2Btn.disabled = true;
});
