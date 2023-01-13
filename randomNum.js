function randomUrl(length) {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

  for (let i = 0; i < length; i++) {
    index = Math.floor(Math.random() * characters.length)
    result += characters[index]
  }

  return result
}

module.exports = randomUrl