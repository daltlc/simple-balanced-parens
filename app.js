// *********************************
// CHECK IF PARENTHESIS ARE BALANCED
// *********************************
// USE A STACK!

let tokens = [ ['{','}'] , ['[',']'] , ['(',')'] ];

let btn = document.getElementById('btn');
btn.addEventListener('click', isBalanced);

document.getElementById("input-one").addEventListener("keyup", function(event) {
    event.preventDefault(); // Left this in case I convert to a form in the future
    if (event.keyCode == 13) {
        isBalanced();
    }
});

// *** Check if character is an opening bracket ***
let isOpenParenthesis = (parenthesisChar) => {
  for (let j = 0; j < tokens.length; j++) {
    if (tokens[j][0] === parenthesisChar) {
      return true;
    }
  }
  return false;
}

// *** Check if opening bracket matches closing bracket ***
let matches = (topOfStack, closedParenthesis) => {
  for (let k = 0; k < tokens.length; k++) {
    if (tokens[k][0] === topOfStack && tokens[k][1] === closedParenthesis) {
      return true;
    }
  }
  return false;
}

// *** Checks if item is any sort of paranthesis ***
let isParanthesis = (char) => {
  let str = '{}[]()';
  if (str.indexOf(char) > -1) {
    return true;
  } else {
    return false;
  }
}

// *** Prints answer of the string to the HTML page  ***
let printToScreen = (bool) => {
  let parensStr = document.getElementById('input-one');
  let inputStr = parensStr.value
  let answer = document.getElementById('answer');
  if (bool) {
    answer.innerHTML = `Nice! Your string <div class='bold'>\" ${inputStr}\ "</div> is <span class='bolder-too'>balanced</span>!`;
  } else {
    answer.innerHTML = `Try again! Your string <div class='bold'>\" ${inputStr} \"</div> is <span class='bolder-too'>unbalanced</span>, check your string again.`;
  }
}

// *** We excute this function upon the event ***
let isBalanced = () => {
  let parensStr = document.getElementById('input-one');
  let inputStr = parensStr.value
  if (inputStr === null) { printToScreen(true); }

  let expression = inputStr.split('');
  let stack = [];

  for (let i = 0; i < expression.length; i++) {
    if (isParanthesis(expression[i])) {
      if (isOpenParenthesis(expression[i])) {
        stack.push(expression[i]);
      } else {
        if (stack.length === 0) {
          return printToScreen(false);
        }
        let top = stack.pop(); // pop off the top element from stack
        if (!matches(top, expression[i])) {
          return printToScreen(false);
        }
      }
    }
  }

  let returnValue = stack.length === 0 ? true : false;
  printToScreen(returnValue)

}