let throng = require('throng');
let Queue = require("bull");

// Connect to a local redis intance locally, and the Heroku-provided URL in production
let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY || 2;

// The maxium number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network 
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 50;

function start() {
  // Connect to the named work queue
  let workQueue = new Queue('work', REDIS_URL);

  workQueue.process(maxJobsPerWorker, async (job) => {
    const url = job.data.url
    console.log('cargando ficha')
    console.time()
    const fetchResponse = await fetch(url)
    if (!fetchResponse.ok) {
      res.json({success: false})
      return
    }
    const arrayBuffer = await fetchResponse.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)
    console.timeEnd()
    console.log('leyendo ficha')
    console.time()
    const workbook = XLSX.read(data, { type: 'array' })
    console.timeEnd()
    console.log('Cargando valores')
    console.time()
    // TODO another storage
    const storage = {}
    const worksheet = workbook.Sheets.Principal
    for (let i = 22; i <= 72; i++) {
      let value = worksheet[`Q${i}`]
      value = value
        ? !isNaN(Number(value.v))
        ? value.v
        : undefined
        : undefined
      let name = worksheet[`M${i}`]
      name = name ? name.v.toLowerCase().split(' ').join().split('.').join('').split(',').join('') : undefined
      if (value) {
        console.log('guardando: ', name, value)
        // TODO save a value
        storage[name] = value
      }
    }
    console.timeEnd()
    return storage
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
