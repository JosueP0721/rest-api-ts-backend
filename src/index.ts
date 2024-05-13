import server from './server'
import colors from 'colors'

// Start the server in a port, ej: 4000
const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})