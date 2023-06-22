import { create, read, update, deletion } from "./connection.js"

export default async (app) => {
	app.get('/', (req, res) => {
		res.send('You can call "/create", "/read", "/update" or "/delete"')
	})
	
	app.post('/create', (req, res) => {
		const data = req.body
		
		if (data.message == null) {
			throw new Error('Missing message')
		}

		create(data.message)
		res.send('create successful')
	})
	
	app.get('/read', async (req, res) => {
		const messages = await read()
		res.send(messages)
	})
	
	app.post('/update', (req, res) => {
		const data = req.body
		
		if (data.newMessage == null || data.oldMessage == null) {
			throw new Error('Missing message')
		}

		update(data.newMessage, data.oldMessage)
		res.send('update successful')
	})
	
	app.post('/delete', (req, res) => {
		const data = req.body
		
		if (data.message == null) {
			throw new Error('Missing message')
		}
		deletion(data.message)
		res.send('delete successful')
	})
}

