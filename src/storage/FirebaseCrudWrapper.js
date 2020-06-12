import * as admin from 'firebase-admin'

require('dotenv').config()

const credentials = () => {
  return {
    type: process.env.FB_type || undefined,
    project_id:
      process.env.FB_project_id || undefined,
    private_key_id:
      process.env.FB_private_key_id || undefined,
    private_key:
      process.env.FB_private_key || undefined,
    client_email:
      process.env.FB_client_email || undefined,
    client_id:
      process.env.FB_client_id || undefined,
    auth_uri:
      process.env.FB_auth_uri || undefined,
    token_uri:
      process.env.FB_token_uri || undefined,
    auth_provider_x509_cert_url:
      process.env
        .FB_auth_provider_x509_cert_url ||
      undefined,
    client_x509_cert_url:
      process.env.FB_client_x509_cert_url ||
      undefined,
  }
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(
      credentials()
    ),
    databaseURL:
      'https://anima-yeii-83347.firebaseio.com',
  })
} catch (e) {
  console.log(e)
}

export default class FirebaseCrudWrapper {
  constructor() {
    this.storage = admin.database()
    this.version = '0'
  }

  getReferenceOf(
    domain = '',
    id = '',
    resource = ''
  ) {
    if (!domain)
      throw new Error('domain is required')
    if (typeof domain !== 'string')
      throw new Error('domain must be a string')
    if (typeof id !== 'string')
      throw new Error('id must be a string')
    if (typeof resource !== 'string')
      throw new Error('domain must be a string')
    const replacedDomain = this.replaceFrobidenCharacters(
      domain
    )
    const replacedId = this.replaceFrobidenCharacters(
      id
    )
    const replacedResource = this.replaceFrobidenCharacters(
      resource
    )
    const path = `${
      this.version
    }/${replacedDomain}/${
      replacedId ? `${replacedId}/` : ''
    }${
      replacedResource
        ? `${replacedResource}/`
        : ''
    }`
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

  recoverFrobidenCharacters(str) {
    let newStr = str.replace('__d__', '.', 'g')
    newStr = newStr.replace('__h__', '#', 'g')
    newStr = newStr.replace('__$__', '$', 'g')
    newStr = newStr.replace('__ob__', '[', 'g')
    newStr = newStr.replace('__cb__', ']', 'g')
    return newStr
  }

  operation(options) {
    const {
      domain,
      id,
      resource,
      data,
      type,
    } = options
    if (type === 'create')
      this.create(data, domain, id, resource)
    if (type === 'update')
      this.create(data, domain, id, resource)
    if (type === 'read')
      this.read(domain, id, resource)
    if (type === 'delete')
      this.delete(domain, id, resource)
    return this
  }

  create(data = {}, domain, id, resource) {
    const ref = this.getReferenceOf(
      domain,
      id,
      resource
    )
    return ref.push(data).key
  }

  update(data = {}, domain, id, resource) {
    const ref = this.getReferenceOf(
      domain,
      id,
      resource
    )
    return ref.set(data)
  }

  async read(domain, id, resource) {
    const ref = this.getReferenceOf(
      domain,
      id,
      resource
    )
    return (await ref.once('value')).val()
  }

  delete(domain, id, resource) {
    const ref = this.getReferenceOf(
      domain,
      id,
      resource
    )
    ref.set(null)
    return this
  }

  increment(domain, id, resource) {
    const ref = this.getReferenceOf(
      domain,
      id,
      resource
    )
    ref.transaction(curent =>
      curent == null ? 1 : curent + 1
    )
  }
}
