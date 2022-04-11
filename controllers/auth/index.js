const sql = require('../../lib/mysql')
const validator = require('validator')

class authController {
    async register(req, res) {
        try {
            const { first_name, last_name, password, email } = req.body
            if (!first_name || !last_name || !password || !email) {
                return res.status(204).send({ message: 'Введены не все данные' })
            }

            if (validator.isEmail(email) === false) {
                return res.status(205).send('Введите корректную почту')
            }

            const id = Date.now()

            await sql.request(`INSERT INTO users(id, username, first_name, last_name, password, email, status, online) VALUES (${id}, ${id}, '${first_name}','${last_name}','${password}','${email}', 'не установлен', true)`).catch(e => console.log(e))

            res.status(200).send({
                first_name: first_name,
                last_name: last_name,
                password: password,
                email: email,
                id: id
            })
            console.log(first_name, last_name, password, email, id);
        } catch (e) {
            console.log(e)
            return res.status(302).send({ message: 'не удача' })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            console.log(email, password);
            if (!email || !password)
                return res.status(202).send('Введены не все данные')

            const [check] = await sql.request(`SELECT email, password FROM users WHERE email="${email}"`).catch(e => console.log(e))
            if (check?.email == email && check?.password == password) {
                return res.status(200).send({
                    first_name: check.first_name,
                    last_name: check.last_name,
                    password: check.password,
                    email: check.email,
                    id: check.email
                })
            } else {
                return res.status(207).send({ message: `Данные введены не верно` })
            }


        } catch (e) {
            console.log(e)
            return res.status(404).send({ message: 'не удача' })
        }
    }
}


module.exports = new authController