import React, { useEffect, useState } from 'react'

const App = () => {
  const [title, setTitle] = useState('Flate')

  useEffect(() => {
    document.title = title

    console.log({ title })

    return () => {
      setTitle('')
    }
  }, [])

  return <h1 color={'blue'}>Dark Neutral Theme for VS Code {title}</h1>
}

export default App
