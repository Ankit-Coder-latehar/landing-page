module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const booking = {
    id: 'seat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    submitted_at: new Date().toISOString(),
    body: req.body || {}
  };
  console.log('[SEAT BOOKING RECEIVED]', JSON.stringify(booking));
  res.statusCode = 200;
  return res.end(JSON.stringify({ status: 'success', message: 'Seat booking stored successfully.', id: booking.id }));
};
