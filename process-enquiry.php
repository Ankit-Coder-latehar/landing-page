<?php
header('Content-Type: application/json');

// Ensure request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed. Please submit via POST.'
    ]);
    exit;
}

// Retrieve input fields (support both JSON payload and standard x-www-form-urlencoded)
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!$data) {
    $data = $_POST;
}

$firstName   = trim($data['first_name'] ?? '');
$lastName    = trim($data['last_name'] ?? '');
$email       = trim($data['email'] ?? '');
$countryCode = trim($data['country_code'] ?? '+91');
$mobile      = trim($data['mobile'] ?? '');
$nationality = trim($data['nationality'] ?? '');
$program     = trim($data['program'] ?? '');
$elective    = trim($data['elective'] ?? '');
$consent     = isset($data['consent']) && ($data['consent'] == '1' || $data['consent'] == 'on' || $data['consent'] === true);

$errors = [];

if (empty($firstName)) {
    $errors[] = 'First Name is required.';
}
if (empty($lastName)) {
    $errors[] = 'Last Name is required.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid Email address is required.';
}
if (empty($mobile) || !preg_match('/^[0-9]{7,15}$/', preg_replace('/[^0-9]/', '', $mobile))) {
    $errors[] = 'A valid Mobile number is required.';
}
if (empty($program)) {
    $errors[] = 'Program selection is required.';
}
if (!$consent) {
    $errors[] = 'You must consent to receive communications before submitting.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => implode(' ', $errors),
        'errors' => $errors
    ]);
    exit;
}

// Format lead record
$lead = [
    'id'           => uniqid('lead_'),
    'first_name'   => $firstName,
    'last_name'    => $lastName,
    'email'        => $email,
    'country_code' => $countryCode,
    'mobile'       => $mobile,
    'nationality'  => $nationality,
    'program'      => $program,
    'elective'     => $elective,
    'submitted_at' => date('Y-m-d H:i:s'),
    'ip_address'   => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
];

$dataFile = __DIR__ . '/data/leads.json';
$existingLeads = [];

if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    $existingLeads = json_decode($content, true) ?: [];
}

$existingLeads[] = $lead;

// Save lead record securely
if (file_put_contents($dataFile, json_encode($existingLeads, JSON_PRETTY_PRINT))) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you, ' . htmlspecialchars($firstName) . '! Your enquiry has been received successfully. Our admissions counselor will contact you shortly.',
        'lead_id' => $lead['id']
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to save enquiry due to a server error. Please try again later.'
    ]);
}
