import fs from 'fs'
const path = require('path')

const dirs = [process.cwd(), __dirname]
let nickname = 'hiukky'
var age = 23

console.log({ dirs, nickname: `${nickname}`, age })

class Class {
  constructor() {}

  find() {
    return
  }

  get name() {
    return
  }

  static get rules() {
    return
  }
}

new Class()

const arrow = () => {
  return
}

arrow()

function func() {
  return
}

func()

try {
} catch (error) {}

switch (name) {
  case 'hiukky':
    break

  default:
    break
}

if (age <= 23) {
} else {
}

while (age < 23) {
  break
}

for (let i = 0; i < dirs.length; i++) {
  var element = dirs[i]
  break
}
