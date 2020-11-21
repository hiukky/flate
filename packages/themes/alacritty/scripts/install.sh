#!/bin/bash

path_theme="$HOME/.config/alacritty"

python -c "import yq" &> /dev/null

if [[ "$?" -eq 1 ]]; then
  pip install yq -U
fi

read() {
  theme="$(yq .colors $1 --yaml-output)"
  echo "${theme}"
}

echo $(yq w "$path_theme/alacritty.yml" 'colors' "$(read $PWD/dist/flate.yml)")
