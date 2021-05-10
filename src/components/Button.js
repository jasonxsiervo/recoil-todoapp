function Button({setFontSize, fontSize}) {
  return (
    <button onClick={() => {setFontSize(fontSize + 1)}} >
      Increase font size
    </button>
  )
}

export default Button;