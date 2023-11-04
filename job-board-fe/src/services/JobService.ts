import ApiService from './ApiService'

export async function apiGetJobStatusList<T>() {
    return ApiService.fetchData<T>({
        url: 'http://localhost:8080/api/job-status',
        method: 'get',
    })
}

export async function apiGetJobList<T>() {
    return ApiService.fetchData<T>({
        url: 'http://localhost:8080/api/job',
        method: 'get',
    })
}

export async function apiGetJob<T>(id: number) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8080/api/job/${id}`,
        method: 'get',
    })
}

export async function apiPostJob<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: 'http://localhost:8080/api/job',
        method: 'post',
        data,
    })
}

export async function apiUpdateJob<T, U extends Record<string, unknown>>(
    id: number,
    data: U
) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8080/api/job/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteJob<T>(id: number) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8080/api/job/${id}`,
        method: 'delete',
    })
}

export async function apiAppliedJob<T>(id: number) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8080/api/job/applied/${id}`,
        method: 'put',
    })
}
