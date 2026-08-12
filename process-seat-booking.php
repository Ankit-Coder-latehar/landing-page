<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
 http_response_code(405);
 echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
 exit;
}

$name = trim($_POST['name'] ?? '');
$batch = trim($_POST['batch'] ?? '');
$state = trim($_POST['state'] ?? '');
$city = trim($_POST['city'] ?? '');
$course = trim($_POST['course_enrolled'] ?? '');
$email = trim($_POST['applicant_email'] ?? '');
$mobile = trim($_POST['applicant_mobile'] ?? '');

$paymentId = trim($_POST['razorpay_payment_id'] ?? '');
$paymentStatus = trim($_POST['payment_status'] ?? 'PAID');

$record = [
 'id' => uniqid('seat_'),
 'name' => $name,
 'batch' => $batch,
 'state' => $state,
 'city' => $city,
 'course_enrolled' => $course,
 'email' => $email,
 'mobile' => $mobile,
 'razorpay_payment_id' => $paymentId,
 'payment_status' => $paymentStatus,
 'aadhaar_uploaded' => !empty($_FILES['upload_aadhaar']['name']),
 'cert_12th_uploaded' => !empty($_FILES['upload_12th_certificate']['name']),
 'cert_10th_uploaded' => !empty($_FILES['upload_10th_certificate']['name']),
 'submitted_at' => date('Y-m-d H:i:s')
];

$dataFile = __DIR__ . '/data/seat-bookings.json';
$existingBookings = [];

if (file_exists($dataFile)) {
 $content = file_get_contents($dataFile);
 $existingBookings = json_decode($content, true) ?: [];
}

$existingBookings[] = $record;
file_put_contents($dataFile, json_encode($existingBookings, JSON_PRETTY_PRINT));

echo json_encode([
 'status' => 'success',
 'message' => 'Seat booking registered successfully.',
 'booking_id' => $record['id']
]);
