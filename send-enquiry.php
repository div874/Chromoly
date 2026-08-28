<?php

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.',
    ]);
    exit;
}

function clean_input($value)
{
    return trim((string) $value);
}

function request_value($key)
{
    return isset($_POST[$key]) ? clean_input($_POST[$key]) : '';
}

$recipient = 'sales@chromolytubing.com';

$name = request_value('name');
$email = request_value('email');
$phone = request_value('phone');
$company = request_value('company');
$message = request_value('message');
$source = request_value('source');
$pageUrl = request_value('page_url');

if ($name === '' || $email === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Name and email are required.',
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.',
    ]);
    exit;
}

$subjectSource = $source !== '' ? $source : 'Website enquiry';
$subject = 'New enquiry from ' . $subjectSource;

$messageLines = [
    'New website enquiry received.',
    '',
    'Source: ' . ($source !== '' ? $source : 'N/A'),
    'Page URL: ' . ($pageUrl !== '' ? $pageUrl : 'N/A'),
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : 'N/A'),
    'Company: ' . ($company !== '' ? $company : 'N/A'),
    '',
    'Message:',
    $message !== '' ? $message : 'N/A',
];

$body = implode("\r\n", $messageLines);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Siddhgiri Website <no-reply@chromolytubing.com>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
];

$mailSent = mail($recipient, $subject, $body, implode("\r\n", $headers));

if (!$mailSent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'The enquiry could not be sent. Please try again later.',
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Thank you. Your enquiry has been sent successfully.',
]);
