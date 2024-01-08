import { useState } from 'react'
import './App.css'
import Cell from './components/cell.jsx'
import { NEW_BOARD } from './constants/borad.js'

function App () {
  const [board] = useState(NEW_BOARD)
  const [selected, setSelected] = useState(null)

  const selectPiece = index => {
    if (selected === index) return setSelected(null)
    if (board[index]) setSelected(index)
    else setSelected(null)
  }

  return (
    <>
    <div className='board'>
      {
        board.map((cell, index) => <Cell key={index} index={index} hint={false} piece={cell} selectPiece={selectPiece} selectedPiece={selected}></Cell>)
      }
      {
        selected && <p>{selected}</p>
      }
    </div>
    </>
  )
}

export default App
