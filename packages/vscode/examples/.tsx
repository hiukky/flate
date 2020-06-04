import React, { useEffect, useState } from 'react'

interface IAppProps {
  loading: boolean
  colors: {
    background?: string
    foreground: string
  }
}

const App = ({ loading = true, colors }: IAppProps) => {
  const [title, setTitle] = useState('Flate')

  useEffect(() => {
    document.title = title

    console.log(loading, colors?.background)

    return () => {
      setTitle('')
    }
  }, [])

  return <h1 color={'dark'}>Dark Neutral Theme for VS Code</h1>
}

export default App
