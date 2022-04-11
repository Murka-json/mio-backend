const sql = require('../../lib/mysql')

class profileController {

    async editPassword(req, res) {
        try {
            const { newPassword, id, oldPassword } = req.body

            if (!newPassword || !oldPassword) {
                return res.status(204).send({ status: 204, message: 'Указаны не все данные' })
            }

            const [user] = await sql.request(`SELECT * FROM users WHERE password='${oldPassword}' AND id=${id}`)
            if (user?.password == oldPassword) {
                await sql.request(`UPDATE users SET password="${newPassword}" WHERE id="${id}"`).catch(e => console.log(e))
                
                return res.status(200).send({ 
                    status: 200, 
                    message: `Вы успешно изменили пароль` 
                })
            } else {
                return res.status(202).send("Введен не верный пароль. Попробуйте еще раз")
            }


        } catch (e) {
            console.log(e)
            return res.status(400).send('Ашыпка :(')
        }
    }


    async edit(req, res) {
        console.log(req.body.username);
        try {
            const { id, last_name, first_name, password, status, username } = req.body

        if(!id || !last_name || !first_name || !status || !password || !username) {
            return res.status(204).send('Данные не были указаны')
        }

        if(status) {
            await sql.request(`UPDATE users SET status="${status}" WHERE id=${id}`).catch(e => console.log(e))
            res.status(200)
        }

        if(username) {
            // не сделано
            await sql.request(`UPDATE users SET username="${username}" WHERE id=${id}`).catch(e => console.log(e))
            res.status(200)
        }

        if(last_name) {
            await sql.request(`UPDATE users SET last_name="${last_name}" WHERE id=${id}`).catch(e => console.log(e))
            res.status(200)
        }

        if(first_name) {
            await sql.request(`UPDATE users SET first_name="${first_name}" WHERE id=${id}`).catch(e => console.log(e))
            res.status(200)
        }

        if(password) {
            await sql.request(`UPDATE users SET password="${password}" WHERE id=${id}`).catch(e => console.log(e))
            res.status(200)
        }

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new profileController