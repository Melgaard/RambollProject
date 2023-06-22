import environment from "dotenv"
environment.config()

import express from "express"
import addRoutes from "./routes.js"

const port = process.env.PORT
const app = express()
app.use(express.json())

await addRoutes(app)

app.listen(port, () => {
	console.log(`Ramboll interview task listening on port: ${port}`)
})
