module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      const params = new URLSearchParams(body);
      body = {};
      for (const [k, v] of params.entries()) body[k] = v;
    }
  }

  const firstName   = (body.first_name || '').trim();
  const lastName    = (body.last_name || '').trim();
  const email       = (body.email || '').trim();
  const countryCode = (body.country_code || '+91').trim();
  const mobile      = (body.mobile || '').trim();
  const nationality = (body.nationality || '').trim();
  const stream      = (body.stream || '').trim();
  const program     = (body.program || '').trim();
  const elective    = (body.elective || '').trim();
  const consent     = Boolean(body.consent);

  const errors = [];
  if (!firstName) errors.push('First Name is required.');
  if (!lastName) errors.push('Last Name is required.');
  if (!email || !email.includes('@')) errors.push('A valid Email address is required.');
  if (!mobile || mobile.length < 7) errors.push('A valid Mobile number is required.');
  if (!program) errors.push('Program selection is required.');
  if (!consent) errors.push('You must consent to receive communications before submitting.');

  if (errors.length > 0) {
    res.statusCode = 400;
    return res.end(JSON.stringify({
      status: 'error',
      message: errors.join(' '),
      errors: errors
    }));
  }

  const newLead = {
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    first_name: firstName,
    last_name: lastName,
    email: email,
    country_code: countryCode,
    mobile: mobile,
    nationality: nationality,
    stream: stream,
    program: program,
    elective: elective,
    submitted_at: new Date().toISOString()
  };

  console.log('[VERCEL LEAD RECEIVED]', JSON.stringify(newLead));

  res.statusCode = 200;
  return res.end(JSON.stringify({
    status: 'success',
    message: `Thank you, ${firstName}! Your enquiry has been received successfully. Our admissions counselor will contact you shortly.`,
    lead_id: newLead.id
  }));
};
