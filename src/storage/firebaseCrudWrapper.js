const database = require('../legacy/firebase').database
class FirebaswCrudWrapper {
  constructor() {
    this.storage = database
    this.version = "0"
  }
  getReferenceOf(domain, id, resource) {
    if(!domain) throw new Error('domain is required')
    if(typeof domain !== 'string') throw new Error('domain must be a string')
    if(!id) id = ''
    if(typeof id !== 'string') throw new Error('domain must be a string')
    if(!resource) resource = ''
    if(typeof resource !== 'string') throw new Error('domain must be a string')
    domain = this.replaceFrobidenCharacters(domain)
    id = this.replaceFrobidenCharacters(id)
    resource = this.replaceFrobidenCharacters(resource)
    let path = `${this.version}/${domain}/${id ? id + '/' : '' }${resource ? resource + '/' : ''}`
    return this.storage.ref(path)
  }
  replaceFrobidenCharacters(str) {
    let newStr = str.replace('.', '__d__', 'g')
    newStr = newStr.replace('#', '__h__', 'g')
    newStr = newStr.replace('$', '__$__', 'g')
    newStr = newStr.replace('[', '__ob__', 'g')
    newStr = newStr.replace(']', '__cb__', 'g')
    return newStr
  }
  operation(options) {
    const {domain, id, resource, data, type} = options
    if (type === 'create') this.create(domain, id, resource, data)
    if(type === 'update') this.create(domain, id, resource, data)
    if(type === 'read') this.read(domain, id, resource)
    if(type === 'delete') this.delete(domain, id, resource)
    return this
  }
  create (domain, id, resource, data) {
    const ref = this.getReferenceOf(domain, id, resource)
    return reg.push(data).key
  }
  update (domain, id, resource, data) {
    const ref = this.getReferenceOf(domain, id, resource)
    return req.set(data)
  }
  async read (domain, id, resource) {
    const ref = this.getReferenceOf(domain, id, resource)
    const snapshot = await ref.once(eventType)
    const value = snapshot.value
    return value
  }
  delete (domain, id, resource) {
    const ref = this.getReferenceOf(domain, id, resource)
    ref.set(null)
    return this
  }
}

module.exports = FirebaswCrudWrapper
