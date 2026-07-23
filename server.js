const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.php': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function createServer(port) {
  const server = http.createServer((req, res) => {
    // Handle POST lead form submission
    if (req.method === 'POST' && (req.url === '/process-enquiry.php' || req.url === '/process-enquiry')) {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        res.setHeader('Content-Type', 'application/json');

        try {
          let data = {};
          if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
            data = JSON.parse(body || '{}');
          } else {
            const params = new URLSearchParams(body);
            for (const [key, value] of params.entries()) {
              data[key] = value;
            }
          }

          const firstName   = (data.first_name || '').trim();
          const lastName    = (data.last_name || '').trim();
          const email       = (data.email || '').trim();
          const countryCode = (data.country_code || '+91').trim();
          const mobile      = (data.mobile || '').trim();
          const nationality = (data.nationality || '').trim();
          const program     = (data.program || '').trim();
          const elective    = (data.elective || '').trim();
          const consent     = Boolean(data.consent);

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
            program: program,
            elective: elective,
            submitted_at: new Date().toISOString(),
            ip_address: req.socket.remoteAddress || '127.0.0.1'
          };

          let existingLeads = [];
          if (fs.existsSync(LEADS_FILE)) {
            try {
              existingLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8') || '[]');
            } catch (e) {
              existingLeads = [];
            }
          }

          existingLeads.push(newLead);
          fs.writeFileSync(LEADS_FILE, JSON.stringify(existingLeads, null, 2), 'utf8');

          res.statusCode = 200;
          return res.end(JSON.stringify({
            status: 'success',
            message: `Thank you, ${firstName}! Your enquiry has been received successfully. Our admissions counselor will contact you shortly.`,
            lead_id: newLead.id
          }));

        } catch (err) {
          res.statusCode = 500;
          return res.end(JSON.stringify({
            status: 'error',
            message: 'Server error processing enquiry: ' + err.message
          }));
        }
      });
      return;
    }

    // Handle GET static files
    let safePath = req.url.split('?')[0];
    if (safePath === '/' || safePath === '\\') {
      safePath = '/index.html';
    }

    if (safePath.endsWith('.php') && safePath !== '/process-enquiry.php') {
      const htmlAlt = safePath.replace(/\.php$/, '.html');
      if (fs.existsSync(path.join(PUBLIC_DIR, htmlAlt))) {
        safePath = htmlAlt;
      } else {
        safePath = '/index.html';
      }
    }

    const filePath = path.join(PUBLIC_DIR, safePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1>');
        } else {
          res.writeHead(500);
          res.end('Server Error: ' + err.code);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Trying port ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, () => {
    console.log(`\n==================================================`);
    console.log(` Vignan Online Server Active!`);
    console.log(` Access URL: http://localhost:${port}`);
    console.log(`==================================================\n`);
  });
}

createServer(PORT);
