const admin = require('firebase-admin')

const credentials = () => {
  if (
    process.env.FB_type &&
    process.env.FB_project_id &&
    process.env.FB_private_key_id &&
    process.env.FB_private_key &&
    process.env.FB_client_email &&
    process.env.FB_client_id &&
    process.env.FB_auth_uri &&
    process.env.FB_token_uri &&
    process.env.FB_auth_provider_x509_cert_url &&
    process.env.FB_client_x509_cert_url
  ) {
    return {
      type: process.env.FB_type,
      project_id: process.env.FB_project_id,
      private_key_id: process.env.FB_private_key_id,
      private_key: process.env.FB_private_key,
      client_email: process.env.FB_client_email,
      client_id: process.env.FB_client_id,
      auth_uri: process.env.FB_auth_uri,
      token_uri: process.env.FB_token_uri,
      auth_provider_x509_cert_url: process.env.FB_auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.FB_client_x509_cert_url
    }
  } else { return require('./config/firebase-key.json') }
}

admin.initializeApp({
  credential: admin.credential.cert(credentials()),
  databaseURL: 'https://anima-yeii-242204.firebaseio.com'
})

module.exports.database = admin.database()
module.exports.admin = admin
