const core = require('@actions/core')
const httpm = require('@actions/http-client')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const testId = core.getInput('test-id', { required: true })

    if (!process.env['MOMENTIC_API_KEY']) {
      throw Error('Environment variable MOMENTIC_API_KEY is missing an API key')
    }

    const client = new httpm.HttpClient('momentic-run-tests-action')
    client.requestOptions = {
      headers: {
        Authorization: `Bearer ${process.env['MOMENTIC_API_KEY']}`
      }
    }

    const url = `https://app.momentic.ai/api/tests/${testId}/webhook`

    const res = await client.post(url)

    if (res.message.statusCode !== 200) {
      throw Error(
        `Failed to trigger test run: ${res.message.statusCode} ${res.message.statusMessage}`
      )
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
