import React, { useEffect, useState } from 'react'

interface IAppProps {
  loading: boolean
  background: string
}

const App = ({ loading = true, background = '#55efc4' }: IAppProps) => {
  const [title, setTitle] = useState('Orbit')

  useEffect(() => {
    document.title = title

    console.log({ loading, background })

    return () => {
      setTitle('')
    }
  }, [])

  return <h1>Dark Neutral Theme for VS Code</h1>
}

export default App
