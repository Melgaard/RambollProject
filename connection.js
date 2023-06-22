import mysql from "promise-mysql"

//Method for creating a connection to the db
var connection = async () => {
	return await mysql.createConnection({
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
	});
}

//Creates a new 'message' in the db. Currently hardcoded to have 'message' be 'hello'
export const create = async (message) => {
	console.log("create is running")
	const db = await connection()

	db.query(`insert into messages(message) values('${message}')`, (err, res) => {
		if (err) throw err;
		console.log('create successful')
	})
}

//Extracts all messages from the db and returns them
export const read = async () => {
	console.log("read is running")
	const db = await connection()
	const res = await db.query("SELECT * FROM messages;")
	
	return res
}

//Updates all messages in the db
export const update = async (newMessage, oldMessage) => {
	console.log("update is running")
	const db = await connection()

	db.query(`UPDATE messages SET message = '${newMessage}' WHERE message = '${oldMessage}'`, (err, res) => {
		if (err) throw err;
		console.log('update successful')
	})
}

//Deletes the last 'message' in the db
export const deletion = async (message) => {
	console.log("deletion is running")
	const db = await connection()

	db.query(`DELETE FROM messages WHERE message = '${message}'`, (err, res) => {
		if (err) throw err;
		console.log('deletion successful')
	})
}


export default {
	create: create,
	read: read,
	update: update,
	deletion: deletion
}