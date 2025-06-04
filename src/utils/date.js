const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()}/${date.getUTCMonth()}/${date.getFullYear()}`;
}

const getCurrentTime = () => {
    const time = new Date();
    return `${time.getHours()}:${time.getMinutes()}`;
}

export { getCurrentDate, getCurrentTime }