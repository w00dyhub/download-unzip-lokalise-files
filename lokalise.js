const path = require('path')
const decompress = require('decompress')
const sdk = require('api')('@lokalise-devhub/v1.0#1hn7a1bl667ypd9')

sdk.auth('API token')

const downloadLokaliseFiles = async () => {
  try {
    const project = await sdk.DownloadFiles({ 
      original_filenames: false,
      format: 'json',
      bundle_structure: '%LANG_ISO%/common.%FORMAT%',
    }, {
      project_id: 'project ID'
    })
    const sourceFile = await fetch(project.bundle_url)
    const arrayBuffer = await sourceFile.arrayBuffer()
    await decompress(Buffer.from(arrayBuffer), path.resolve('./public/locales'))
  } catch (error) {
    console.info(error)
  }
}

downloadLokaliseFiles()
console.info('Downloading your lokalise files...')