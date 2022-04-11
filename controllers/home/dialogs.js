const sql = require('../../lib/mysql')

class Home {
    async dialogs(req, res) {
        const { id, password } = req.body

        if(!id || !password) {
            return res.status(402).send('Не переданы нужные данные')
        }

        const [dialogs] = sql.request(`SELECT * FROM dialogs WHERE to_id=${id}`)
    }
}