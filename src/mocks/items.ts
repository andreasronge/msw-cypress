import { http, HttpResponse } from 'msw'

const apiPath = '/api/items'

export const itemsHandler = http.post(apiPath, async ({request}) => {
  const body = await request.json();
  return HttpResponse.json(body);
})

export const sampleServerHandler = http.post(apiPath, async () => {
  return HttpResponse.json({value: 'Hi from Server/Cypress'})
})