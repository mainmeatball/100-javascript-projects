const constQuotes = [
['The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.', 'Helen Keller'],
['Keep love in your heart. A life without it is like a sunless garden when the flowers are dead.','Oscar Wilde'],
['It is during our darkest moments that we must focus to see the light.','Aristotle'],
['Try to be a rainbow in someone\'s cloud.','Maya Angelou'],
['Find a place inside where there\'s joy, and the joy will burn out the pain.','Joseph Campbell'],
['Nothing is impossible, the word itself says "I\'m possible"!','Audrey Hepburn'],
['Don\'t judge each day by the harvest you reap but by the seeds that you plant.','Robert Louis Stevenson'],
['Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.','Buddha'],
['The only thing necessary for the triumph of evil is for good men to do nothing.','Edmund Burke'],
['Life is like a landscape. You live in the midst of it but can describe it only from the vantage point of distance.','Charles Lindbergh']
]

function generateQuote() {
  quote = constQuotes[Math.floor(Math.random() * constQuotes.length)]
  document.getElementById('quote-text').textContent = quote[0]
  document.getElementById('author').textContent = quote[1]
}