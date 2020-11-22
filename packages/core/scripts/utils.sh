#!/bin/bash
# By @hiukky https://hiukky.com

. config.sh

getURLTheme() {
  local theme=$1

   if ! printf '%s\n' "${THEMES[@]}" | grep -P "^$theme$" > /dev/null; then
      echo 'Invalid theme name!'
      exit 0
   fi

  echo "https://raw.githubusercontent.com/hiukky/flate/$BRANCH/packages/themes/$theme/release"
}

checkPkg() {
  local pkg=$1

   bash $pkg &> /dev/null

  if [[ "$?" -eq 127 ]]; then
    sudo snap install "$pkg"
  fi
}

colorfy() {
  checkPkg lolcat
  echo "$1" | lolcat
}

printfy() {
  checkPkg figlet
  figlet "$1" | lolcat
}
