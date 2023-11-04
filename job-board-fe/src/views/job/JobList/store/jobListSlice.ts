import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetJobList, apiPostJob } from '@/services/JobService'

type JobStatus = {
    id: number
    name: string
}

type Job = {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    description: string
    status: JobStatus | number
}

type JobList = Job[]

type GetProjectListResponse = {
    content: JobList
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
}

type PutProjectListRequest = {
    name: string
    description: string
}

type PutProjectListResponse = JobList

export type ProjectListState = {
    loading: boolean
    jobList: JobList
    deleteConfirmation: boolean
    appliedConfirmation: boolean
    selectedJobId: number
}

export const SLICE_NAME = 'projectList'

export const getList = createAsyncThunk(SLICE_NAME + '/getList', async () => {
    const response = await apiGetJobList<GetProjectListResponse>()
    return response.data
})

export const putProject = createAsyncThunk(
    SLICE_NAME + '/putProject',
    async (data: PutProjectListRequest) => {
        const response = await apiPostJob<
            PutProjectListResponse,
            PutProjectListRequest
        >(data)
        return response.data
    }
)

const initialState: ProjectListState = {
    loading: false,
    jobList: [],
    deleteConfirmation: false,
    appliedConfirmation: false,
    selectedJobId: 0,
}

const projectListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedJobId = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        toggleAppliedConfirmation: (state, action) => {
            state.appliedConfirmation = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getList.fulfilled, (state, action) => {
                state.jobList = action.payload.content
                state.loading = false
            })
            .addCase(getList.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    toggleDeleteConfirmation,
    toggleAppliedConfirmation,
    setSelectedProduct,
} = projectListSlice.actions

export default projectListSlice.reducer
