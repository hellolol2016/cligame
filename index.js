#!/usr/bin/env node
import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

let playerName;

const sleep = (ms = 2000) => new Promise((r)=>setTimeout(r,ms))

async function welcome(){
  const rainbowTitle = chalkAnimation.rainbow(
    'Who is dennis Wang? \n'
  )
  await sleep();
  rainbowTitle.stop()
  console.log(`
  ${chalk.bgBlue(`HOW TO PLAY`)}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...
  `)
}

async function handleAnswer(isCorrect){
  const spinner = createSpinner("Checking answer...").start();
  await sleep();
  if(isCorrect){
    spinner.success({text:`Nice work ${playerName}. Solid answer `})
  }
}


async function askName(){
  const answers = await inquirer.prompt({
    name:'player_name',
    type:'input',
    mesage:'What is your name?',
    default(){
      return 'Player';
    }
  })
  playerName = answers.player_name
}

async function question1(){
  const answers = await inquirer.prompt({
    name:'question_1',
    type:"list",
    message:"When was Dennis Wang?",
    choices:[
      'August 12th, 2004',
      "July 14th, 2005",
      "September 12th,2004",
      "August 12th, 2005"
    ],

  })
  return handleAnswer(answers.question_1==="August 12th, 2005")
}

async function question2(){
  const answers = await inquirer.prompt({
    name:'question_2',
    type:"list",
    message:"Who is Dennis Wang?",
    choices:[
      'Yicheng',
      "Wennis",
      "DN",
      "Dang"
    ],

  })
  return handleAnswer(answers.question_2==="Yicheng")
}
async function question3(){
  const answers = await inquirer.prompt({
    name:'question_3',
    type:"list",
    message:"How was Dennis Wang?",
    choices:[
      'Good',
      "Bad",
      "Better than ever",
      "Okay"
    ],

  })
  return handleAnswer(answers.question_3==="Better than ever")
}
function winner(){
  console.clear();
  figlet(`Congrats, ${playerName} \n You did it!`,(err,data)=>{
    console.log(gradient.pastel.multiline(data)+'\n');
  
    console.log("Goodbye");
    process.exit(0)
  })
}
await welcome()
await askName()
await question1()
await question2()
await question3()
winner()