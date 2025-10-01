import { Hono } from 'hono'
import convertToICalendar from '@ohjelmistokehitys/calendar-converter'
import { type Calendar } from '@ohjelmistokehitys/calendar-converter/build/types';

const app = new Hono()

const URL = "https://lukkarit.haaga-helia.fi/rest/realization/";

app.get('/', (c) => {
  return c.text('The service is up and running.');
})

app.get('/course/:id', async (c) => {
  const id = c.req.param("id");

  if (!id) {
    return c.json({ error: "No course id provided" }, 400);
  }

  const response = await fetch(`${URL}${id}`);

  if (!response.ok) {
    return c.json({ error: response.statusText, status: response.status }, 404);
  }

  const jsonCalendar: Calendar = await response.json();

  const icalendar = convertToICalendar(jsonCalendar);

  return c.text(icalendar);
})

export default app
