import React, { useEffect, useState } from 'react'

const App = () => {
  const [title, setTitle] = useState('Orbit')

  useEffect(() => {
    document.title = title

    return () => {
      setTitle('')
    }
  }, [])

  return <h1>Dark Neutral Theme for VS Code</h1>
}

export default App
