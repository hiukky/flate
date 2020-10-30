import path from 'path'

enum Gender {
  'Not known',
  'Male',
  'Female',
  'Not applicable',
}

type TGender = 0 | 1 | 2 | 9

interface IData {
  name: string
  age: number
  gender?: TGender
}

const dirs = [process.cwd(), __dirname]
let nickname = 'hiukky'
var age = 23

const data: IData = {
  name: nickname,
  gender: 1,
  age,
}

console.log({ dirs, nickname: `${nickname}`, age }, data?.gender)

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
