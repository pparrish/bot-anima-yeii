import { readFile } from 'fs'
import path from 'path'

const resolver = (
  aPath = 'main',
  { channel }
) => {
  readFile(
    path.join(
      __dirname,
      `../../bot-help/${aPath}.md`
    ),
    { encoding: 'utf-8' },
    (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      channel.send(data, {
        split: true,
      })
    }
  )
}

export default {
  name: 'help',
  resolver,
}
