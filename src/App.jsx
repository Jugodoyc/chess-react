import { useEffect, useState } from 'react'
import './App.css'
import Cell from './components/cell.jsx'
import GameButton from './components/gameButton.jsx'

const ENDPOINT = 'http://localhost:3000'

function App () {
  const [board, setBoard] = useState([])
  const [games, setGames] = useState([])
  const [hints, setHints] = useState([])
  const [gameId, setGameId] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getGames()
    fetch(`${ENDPOINT}/games`)
      .then(res => res.json())
      .then(data => fetch(`${ENDPOINT}/game/${data[0]}`)
        .then(res => res.json())
        .then(data2 => setBoard(data2.board)))
  }, [])

  const getHints = async (index) => {
    if (!index) return
    const res = await fetch(`${ENDPOINT}/game/${gameId}/hints/${index}`)
    const data = await res.json()
    setHints(data.hints)
  }

  const selectPiece = async index => {
    if (selected === index) {
      setHints([])
      return setSelected(null)
    }
    if (board[index].piece) {
      await getHints(index)
      setSelected(index)
    } else {
      if (selected && hints && hints.includes(index)) {
        const body = {
          prevMove: selected,
          move: index
        }
        const customHeaders = {
          'Content-Type': 'application/json'
        }
        const res = await fetch(`${ENDPOINT}/game/${gameId}/move`, { method: 'POST', body: JSON.stringify(body), headers: customHeaders })
        const data = await res.json()
        setBoard(data.board)
      }
      setSelected(null)
      setHints([])
    }
  }

  const getGames = () => fetch(`${ENDPOINT}/games`).then(res => res.json()).then(data => setGames(data))

  const changeGame = name => {
    fetch(`${ENDPOINT}/game/${name}`).then(res => res.json()).then(data => setBoard(data.board))
    setGameId(name)
  }

  const newGame = () => {
    fetch(`${ENDPOINT}/game`, { method: 'POST' }).then(res => res.json()).then(data => {
      setBoard(data.board)
      setGameId(data.id)
      getGames()
    })
  }

  return (
    <>
    <div className='screen'>
      <div className='board'>
        {
          board.map((cell, index) => {
            const hint = hints.includes(index)
            return <Cell key={index} index={index} hint={hint} piece={cell.piece} selectPiece={selectPiece} selectedPiece={selected}></Cell>
          })
        }
      </div>
      <div className='buttonMap'>
        {
          games.map(game => <GameButton key={game} name={game} changeGame={changeGame}></GameButton>)
        }
        <GameButton name='New Game' changeGame={newGame}></GameButton>
      </div>
    </div>
    </>
  )
}

export default App
