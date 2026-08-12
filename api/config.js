module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  return res.end(JSON.stringify({
    razorpay_key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_bWTZeZdjtDN95M'
  }));
};
