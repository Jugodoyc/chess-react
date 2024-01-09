function GameButton ({ name, changeGame }) {
  const parsedName = name.split('.json')[0]
  const handleClick = e => {
    e.preventDefault()
    changeGame(parsedName)
  }
  return (
    <>
      <button className='gameButton' onClick={handleClick}>
        {parsedName}
      </button>
    </>
  )
}

export default GameButton
