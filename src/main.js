const core = require('@actions/core')
const httpm = require('@actions/http-client')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const testsString = core.getInput('tests', { required: true })

    // parse into test ids
    const testIds = testsString.split(/\r|\n/).map(line => line.trim())

    if (!process.env['MOMENTIC_API_KEY']) {
      throw Error('Environment variable MOMENTIC_API_KEY is missing an API key')
    }

    const client = new httpm.HttpClient('momentic-run-tests-action', [], {
      headers: {
        Authorization: `Bearer ${process.env['MOMENTIC_API_KEY']}`,
        'Content-Type': 'application/json'
      }
    })

    const url = `https://api.momentic.ai/v1/tests/queue`
    const body = {
      testIds
    }

    const res = await client.post(url, JSON.stringify(body))

    if (res.message.statusCode !== 200) {
      throw Error(
        `Failed to queue test runs: ${res.message.statusCode} ${res.message.statusMessage}`
      )
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
