import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { join } from 'path'

const adapter = new FileSync(join(__dirname, '../../database/database.json'))

export default low(adapter)
