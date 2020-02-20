var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var uuidv4 = require('uuid/v4')
var { Client } = require('pg')

db_config = {
	user: 'dbuser',
	password: '1234',
	database: 'devdb'
}

var create_table = "CREATE TABLE IF NOT EXISTS app_content (\
							component_id UUID PRIMARY KEY, \
							room_id UUID NOT NULL, \
							location BOX NOT NULL, \
							data VARCHAR \
						);"

default_data = {
	'text' : 'Enter text here',
	'web'  : 'http://ec2-54-184-200-244.us-west-2.compute.amazonaws.com'
	// 'image': 'images/default_image.jpg'
}
// TODO: How to send image back

var client = new Client(db_config)
client.connect()
client.query(create_table)

var index_path = '/home/ubuntu/team-A4/public/index.html'
server.listen(80)

app.get('/', function (req, res) {
    res.sendFile(index_path)
})

app.post('/create_room', function (req, res) {
    current_uuid = uuidv4()
    res.send({uuid: current_uuid})
})

app.post('/create_component', function (req, res) {
	
	if (req.query.component_type in default_data){
		
		current_component_id = uuidv4()
		client.query("INSERT INTO web_table VALUES($1, $2, '((0, 0), (100, 100))', $3);", 
					[current_component_id, req.query.room_id, default_data[req.query.component_type]])
		
		if (req.query.component_type == 'image'){
			// TODO: How to send image back
		}else{
			res.send({
				component_id: current_component_id,
				component_data: default_data[req.query.component_type]
			})
		}

	}else{
		console.error("ERROR: Unrecognized component type")
		res.send("Please send valid request")
	}	
})

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' })
    socket.on('my other event', function (data) {
        console.log(data)
    })
})