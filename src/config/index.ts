const basePort = `:${process.env.BASE_PORT}`
const baseUrl = `http://127.0.0.1${basePort}`
const Url = 'http://www.tiancai9.top'

export const fetchUrl =
    process.env.NODE_ENV === 'development' ? baseUrl :
        process.env.NODE_ENV === 'production' ? Url :
            process.env.NODE_ENV === 'test' ? baseUrl :
                baseUrl