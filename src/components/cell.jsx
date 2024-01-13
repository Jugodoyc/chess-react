import { useEffect, useState } from 'react'

function Cell ({ index, hint, piece, selectPiece, selectedPiece }) {
  const [selected, setSelected] = useState('')
  const row = Math.floor(index / 8)
  const column = index % 8
  const cellColor = (row + column) % 2 === 0 ? 'black' : 'white'
  const capture = piece && hint
  const color = piece ? piece[0] : null

  const handleClick = async () => await selectPiece(index, color)

  useEffect(() => {
    if (selectedPiece === index) return setSelected('selected')
    return setSelected('')
  }, [selectedPiece])

  return (
    <>
      <div className={`cell ${(piece || hint) && 'hand'} ${!capture && hint ? 'hint' : ''} ${cellColor} ${selected}`} onClick={handleClick}>
        {piece && <img src={`https://images.chesscomfiles.com/chess-themes/pieces/neo/80/${piece}.png`} />}
        {capture && <div className='capture'></div>}
      </div>
    </>
  )
}

export default Cell
