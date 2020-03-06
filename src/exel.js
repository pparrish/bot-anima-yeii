const throng = require('throng')
const Queue = require('bull')
const XLSX = require('xlsx')
const fetch = require('node-fetch')

// Connect to a local redis intance locally, and the Heroku-provided URL in production
const REDIS_URL =
  process.env.REDIS_URL ||
  'redis://127.0.0.1:6379'

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
const workers = process.env.WEB_CONCURRENCY || 2

// The maxium number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
const maxJobsPerWorker = 50

const getValueOfWorksheet = (id, worksheet) => {
  const value = worksheet[id]
  return value
    ? !Number.isNaN(Number(value.v))
      ? value.v
      : undefined
    : undefined
}

function start() {
  // Connect to the named work queue
  const workQueue = new Queue('work', REDIS_URL)

  workQueue.process(
    maxJobsPerWorker,
    async job => {
      const { url } = job.data
      const fetchResponse = await fetch(url)
      if (!fetchResponse.ok) {
        throw new Error('failed')
      }
      const arrayBuffer = await fetchResponse.arrayBuffer()
      const data = new Uint8Array(arrayBuffer)
      const workbook = XLSX.read(data, {
        type: 'array',
      })
      const storage = {}
      let worksheet = workbook.Sheets.Principal
      let value
      // Caracteristicas
      const characteristicsNames = [
        'agilidad',
        'constitución',
        'destreza',
        'fuerza',
        'inteligencia',
        'percepción',
        'poder',
        'voluntad',
      ]
      for (let i = 11; i <= 18; i += 1) {
        value = getValueOfWorksheet(
          `G${i}`,
          worksheet
        )
        const name = characteristicsNames.shift()
        if (value) storage[name] = value
      }
      // Secundarias
      for (let i = 22; i <= 72; i += 1) {
        value = worksheet[`Q${i}`]
        value = value
          ? !Number.isNaN(Number(value.v))
            ? value.v
            : undefined
          : undefined
        let name = worksheet[`M${i}`]
        name = name
          ? name.v
              .toLowerCase()
              .split(' ')
              .join()
              .split('.')
              .join('')
              .split(',')
              .join('')
          : undefined
        if (value) {
          // TODO save a value
          storage[name] = value
        }
      }

      // Ataque,h24 parada,h26 esquivah28
      value = getValueOfWorksheet(
        `H24`,
        worksheet
      )
      let name = 'ataque'
      if (value) storage[name] = value

      value = getValueOfWorksheet(
        `H26`,
        worksheet
      )
      name = 'parada'

      if (value) storage[name] = value
      value = getValueOfWorksheet(
        `H28`,
        worksheet
      )
      name = 'esquiva'
      if (value) storage[name] = value

      // magica, convocacikb
      worksheet = workbook.Sheets['Místicos']

      value = getValueOfWorksheet(
        `O12`,
        worksheet
      )
      name = 'mágica'
      if (value) storage[name] = value
      // m25 -m28
      value = getValueOfWorksheet(
        'M25',
        worksheet
      )
      name = 'convocar'
      if (value) storage[name] = value
      value = getValueOfWorksheet(
        'M26',
        worksheet
      )
      name = 'dominación'
      if (value) storage[name] = value
      value = getValueOfWorksheet(
        'M27',
        worksheet
      )
      name = 'atadura'
      if (value) storage[name] = value
      value = getValueOfWorksheet(
        'M28',
        worksheet
      )
      name = 'desconvocar'
      if (value) storage[name] = value

      // potencial psiquica
      worksheet = workbook.Sheets['Psíquicos']
      value = getValueOfWorksheet(
        'O12',
        worksheet
      )
      name = 'psíquica'
      if (value) storage[name] = value

      value = getValueOfWorksheet(
        'H11',
        worksheet
      )
      name = 'potencial'
      if (value) storage[name] = value

      return storage
    }
  )
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start })
