import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'
import {
    projectList
} from './data/projectData'

import { signInUserData } from './data/authData'

import { authFakeApi, projectFakeApi } from './fakeApi'

const { apiPrefix } = appConfig

export function mockServer({ environment = 'development' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
                projectList
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                const isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()

            authFakeApi(this, apiPrefix)
            projectFakeApi(this, apiPrefix)
        },
    })
}
