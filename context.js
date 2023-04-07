import { readFileSync, existsSync } from 'node:fs'
import { EOL } from 'node:os'

export class Context {
  constructor() {
    this.payload = {}
    const eventPath = process.env.GITHUB_EVENT_PATH
    if (eventPath) {
      if (existsSync(eventPath)) this.payload = JSON.parse(readFileSync(eventPath, {encoding: 'utf8'}))
      else process.stdout.write(`GITHUB_EVENT_PATH ${eventPath} does not exist${EOL}`)
    }

    this.job = process.env.GITHUB_JOB
    this.ref = process.env.GITHUB_REF
    this.sha = process.env.GITHUB_SHA
    this.repository = process.env.GITHUB_REPOSITORY
    this.repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER
    this.runId = parseInt(process.env.GITHUB_RUN_ID, 10)
    this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10)
    this.runAttempt = parseInt(process.env.GITHUB_RUN_ATTEMPT, 10)
    this.actor = process.env.GITHUB_ACTOR
    this.workflow = process.env.GITHUB_WORKFLOW
    this.action = process.env.GITHUB_ACTION
    this.actionPath = process.env.GITHUB_ACTION_PATH
    this.eventName = process.env.GITHUB_EVENT_NAME
    this.refName = process.env.GITHUB_REF_NAME
    this.refProtected = process.env.GITHUB_REF_PROTECTED === 'true'
    this.refType = process.env.GITHUB_REF_TYPE
    this.workspace = process.env.GITHUB_WORKSPACE
    this.temp = process.env.RUNNER_TEMP

    this.serverUrl = process.env.GITHUB_SERVER_URL ?? `https://github.com`
    this.apiUrl = process.env.GITHUB_API_URL ?? `https://api.github.com`
    this.graphqlUrl = process.env.GITHUB_GRAPHQL_URL ?? `https://api.github.com/graphql`
  }

  get issue() {
    const payload = this.payload

    return {
      ...this.repo,
      number: (payload.issue || payload.pull_request || payload).number
    }
  }

  get repo() {
    if (process.env.GITHUB_REPOSITORY) {
      const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
      return { owner, repo }
    }

    if (this.payload.repository) return {
      owner: this.payload.repository.owner.login,
      repo: this.payload.repository.name
    }

    throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'")
  }
}
