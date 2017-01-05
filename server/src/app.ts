import * as express from 'express'
import * as logger from 'morgan'

import * as path from 'path'

export default class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.middleware(this.app)
    this.routes(this.app)
  }

  private middleware(app: express.Application): void {
    app.use(logger('dev'))
  }

  private routes(app: express.Application) {
    const clientDir = path.join(__dirname, '../../client')
    app.use(express.static(clientDir))
  }
}
