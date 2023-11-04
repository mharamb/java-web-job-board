import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiDeleteJob, apiGetJob, apiUpdateJob } from '@/services/JobService'

type JobStatus = {
    id: number
    name: string
}

type User = {
    firstName: string
    lastName: string
    email: string
}

type ProductData = {
    id: number
    name: string
    description: string
    status: JobStatus
    appliedUsers?: User[]
}

export type SalesProductEditState = {
    loading: boolean
    productData: ProductData
}

type GetSalesProductResponse = ProductData

export const SLICE_NAME = 'salesProductEdit'

export const getProduct = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (id: number) => {
        const response = await apiGetJob<GetSalesProductResponse>(id)
        return response.data
    }
)

export const updateProduct = async <T, U extends Record<string, unknown>>(
    id: number,
    data: U
) => {
    const response = await apiUpdateJob<T, U>(id, data)
    return response.data
}

export const deleteProduct = async <T>(id: number) => {
    const response = await apiDeleteJob<T>(id)
    return response.data
}

const initialState: SalesProductEditState = {
    loading: true,
    productData: {
        id: 0,
        name: '',
        description: '',
        status: {
            id: 0,
            name: '',
        },
    },
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                state.productData = action.payload
                state.loading = false
            })
            .addCase(getProduct.pending, (state) => {
                state.loading = true
            })
    },
})

export default productEditSlice.reducer
