const url: string = `https://api.cloudinary.com/v1_1/ds07r0agf/auto/upload`;

const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append("upload_preset", "lamagym-app-file")

    const response = await fetch(url, {
        method: 'post',
        body: formData
    })
    console.log(response)
    return await response.json()
}

export default uploadFile