import axios from 'axios'

const API_URL = `http://localhost:${process.env.PORT || 3000}/api/user/balance` // URL вашего эндпоинта
const USER_ID = 1
const AMOUNT = -2
const REQUESTS_COUNT = 10000

async function sendRequest() {
  try {
    const response = await axios.post(API_URL, {
      userId: USER_ID,
      amount: AMOUNT,
    })
    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, error: error.response ? error.response.data : error.message }
  }
}

async function runTest() {
  const promises = []

  for (let i = 0; i < REQUESTS_COUNT; i++) {
    promises.push(sendRequest())
  }

  const results = await Promise.all(promises)

  let successfulRequests = 0
  let failedRequests = 0

  results.forEach((result) => {
    if (result.success) {
      successfulRequests++
    } else {
      failedRequests++
    }
  })

  console.log(`Успешных запросов: ${successfulRequests}`)
  console.log(`Неудачных запросов: ${failedRequests}`)
}

runTest()