import { useEffect, useState } from 'react'
import './App.css'
import Cell from './components/cell.jsx'

const ENDPOINT = 'http://localhost:3000'
const GAME_ID = '6392f76d-1ab4-476e-af17-25c4aeaf929b'

function App () {
  const [board, setBoard] = useState([])
  const [games, setGames] = useState([])
  const [selected, setSelected] = useState(null)
  const [hints, setHints] = useState([])
  useEffect(() => {
    fetch(`${ENDPOINT}/game/${GAME_ID}`).then(res => res.json()).then(data => setBoard(data.board))
    fetch(`${ENDPOINT}/games`).then(res => res.json()).then(data => setGames(data))
  }, [])
  const getHints = async (index) => {
    if (!index) return
    const res = await fetch(`${ENDPOINT}/game/${GAME_ID}/hints/${index}`)
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
        const res = await fetch(`${ENDPOINT}/game/${GAME_ID}/move`, { method: 'POST', body: JSON.stringify(body), headers: customHeaders })
        const data = await res.json()
        setBoard(data.board)
      }
      setSelected(null)
      setHints([])
    }
  }

  return (
    <>
    <div className='board'>
      {
        board.map((cell, index) => {
          const hint = hints.includes(index)
          return <Cell key={index} index={index} hint={hint} piece={cell.piece} selectPiece={selectPiece} selectedPiece={selected}></Cell>
        })
      }
    </div>
    {
      games.map(game => <div key={game}>{game}</div>)
    }
    </>
  )
}

export default App
