const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'bitwake',
	password: 'postgres',
	port: 5432,
})

const getUserByDeviceId = (request, response) => {
	const device_id = parseString(request.params.device_id)

	pool.query('SELECT * FROM users WHERE device_id = $1', [device_id], (error, results) => {
		if (error) {
			pool.query('INSERT INTO users (device_id, amount, count) VALUES ($1, 0, 0)', [device_id], (error, results) => {
				if (error) {
					throw error
				}
				response.status(200).json(results.rows)
			})
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const updateUserSawAd = (request, response) => {
	const device_id = parseString(request.params.device_id)

	pool.query(
		'UPDATE users SET amount = amount + 10, count = count + 1 WHERE device_id = $1',
		[device_id],
		(error, results) => {
			if (error) {
				throw error
			}
			response.status(200).send(`User increased ad count`)
		}
	)
}

const withdrawSats = (request, response) => {
	const device_id = parseString(request.params.device_id)
	const { amount, invoice } = request.body  
	// TODO: if invoice without amount we should extract the amount from the invoice

	// TODO: use Lightspark SDK to withdraw
	pool.query(
		'UPDATE users SET amount = amount - $1 WHERE device_id = $2',
		[amount, device_id],
		(error, results) => {
			if (error) {
				throw error
			}
			response.status(200).send(`User withdraw ${amount} sats`)
		}
	)
}

module.exports = {
getUserByDeviceId,	updateUserSawAd,withdrawSats}
