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
      const worksheet = workbook.Sheets.Principal
      for (let i = 22; i <= 72; i += 1) {
        let value = worksheet[`Q${i}`]
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
      return storage
    }
  )
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start })
