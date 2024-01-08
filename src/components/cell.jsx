import { useEffect, useState } from 'react'

function Cell ({ index, hint, piece, selectPiece, selectedPiece }) {
  const [selected, setSelected] = useState('')
  const row = Math.floor(index / 8)
  const column = index % 8
  const cellColor = (row + column) % 2 === 0 ? 'white' : 'black'

  const handleClick = () => selectPiece(index)

  useEffect(() => {
    console.log('xxxx')
    if (selectedPiece === index) return setSelected('selected')
    return setSelected('')
  }, [selectedPiece])

  return (
    <>
      <div className={`cell ${cellColor} ${selected} ${hint ? 'hint' : ''}`} onClick={handleClick}>
        {piece && <img src={`https://images.chesscomfiles.com/chess-themes/pieces/neo/80/${piece}.png`} />}
      </div>
    </>
  )
}

export default Cell