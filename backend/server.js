// Arranque local y en Docker: node server.js (en Vercel se usa app.js)
import app from './app.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`)
})
