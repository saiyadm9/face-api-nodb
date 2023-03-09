const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const image = require('./image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'Jhon',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			has: '',
			email: 'john@gmail.com'
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	const {email, password} = req.body;
	let userr;
	database.users.forEach(user => {
		if(user.email === email){
			userr = user;
		}
	})

	if(userr){
		if(password == userr.password){
			res.json(userr);
		}else{
			res.status(400).json('wrong password');
		}
	}else{
		res.status(400).json("User doesn't exist, register to continue...");
	}
})

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			return res.json(user)
		}
	})
	if(!found){
		res.status(400).json('no such user');
	}
})

app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false;
	let entries;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			user.entries++;
			entries = user.entries;
		}
	})
	if(found){
		res.json(entries);
	}else{
		res.status(400).json('not found ');
	}
})

app.post ('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 9000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})
