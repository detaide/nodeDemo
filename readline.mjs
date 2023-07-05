/*
 * @Author: hyman
 * @Date: 2023-06-20 11:43:29
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-20 12:01:21
 * @Description: 请填写简介
 */

import readline from 'readline'
import keypress from 'keypress'
import { stdin as input, stdout as output } from 'node:process';


const options = ['Option 1', 'Option 2', 'Option 3'];
let selectedOptionIndex = 0;

const rl = readline.createInterface({ input, output })

function renderOptions() {
    const output = options.map((option, index) => {
        if (index === selectedOptionIndex) {
            return `> \x1b[36m${option}\x1b[0m`; // 当前选项高亮显示
        } else {
            return `> ${option}`;
        }
    }).join('\n');
    console.clear(); // 清屏
    console.log(output);
}

keypress(input)

// 监听键盘输入事件
input.on('keypress', (ch, key) => {
    if (key && key.name === 'up') {
      selectedOptionIndex = Math.max(0, selectedOptionIndex - 1);
    } else if (key && key.name === 'down') {
      selectedOptionIndex = Math.min(options.length - 1, selectedOptionIndex + 1);
    } else if (key && key.name === 'return') {
      console.log(`Selected option ${selectedOptionIndex + 1}: ${options[selectedOptionIndex]}`);
    }
    renderOptions();
  });

renderOptions();