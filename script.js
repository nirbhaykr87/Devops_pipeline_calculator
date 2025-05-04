ko
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
  }
  
  
  function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
  }
  
  
  function calculateResult() {
    const display = document.getElementById('display');
    
    // Check for empty expression
    if (display.value.trim() === '') {
      display.value = 'Error';
      return;
    }
  
    // Check for division by zero
    if (display.value.includes('/ 0')) {
      display.value = 'Error';
      return;
    }
  
    try {
      // Evaluate the expression
      const result = eval(display.value);
      // Check if the result is finite, otherwise show 'Error'
      display.value = isFinite(result) ? result : 'Error';
    } catch (error) {
      // Catch any errors (e.g., malformed expression)
      display.value = 'Error';
    }
  }
  
  // Export functions for testing
  module.exports = {
    appendToDisplay,
    clearDisplay,
    calculateResult
  };





// {
//   "Id": "key-consolepolicy-3",
//   "Version": "2012-10-17",
//   "Statement": [
//     {
//       "Sid": "Enable IAM User Permissions",
//       "Effect": "Allow",
//       "Principal": {
//         "AWS": "arn:aws:iam::982081053423:root"
//       },
//       "Action": "kms:*",
//       "Resource": "*"
//     },
//     {
//       "Sid": "Allow Firehose to use the key",
//       "Effect": "Allow",
//       "Principal": {
//         "Service": "firehose.amazonaws.com"
//       },
//       "Action": [
//         "kms:Encrypt",
//         "kms:Decrypt",
//         "kms:ReEncrypt*",
//         "kms:GenerateDataKey*",
//         "kms:DescribeKey"
//       ],
//       "Resource": "*",
//       "Condition": {
//         "StringEquals": {
//           "kms:EncryptionContext:aws:kinesis:arn": "arn:aws:firehose:<region>:982081053423:deliverystream/<your-stream-name>"
//         }
//       }
//     }
//   ]
// }

  









import boto3
import os

# 🔧 Replace these with your values
FIREHOSE_STREAM_NAME = 'your-firehose-name'
FOLDER_PATH = r'C:\Path\To\Your\Files'  # Use raw string for Windows paths

# Connect to Firehose
firehose = boto3.client('firehose')

# Loop through files
for filename in os.listdir(FOLDER_PATH):
    if filename.endswith('.csv') or filename.endswith('.json'):
        file_path = os.path.join(FOLDER_PATH, filename)
        with open(file_path, 'rb') as f:
            response = firehose.put_record(
                DeliveryStreamName=FIREHOSE_STREAM_NAME,
                Record={'Data': f.read()}
            )
        print(f"✅ Uploaded {filename}: {response['ResponseMetadata']['HTTPStatusCode']}")


import boto3
import os

# Set your AWS credentials (never share these!)
os.environ['AWS_ACCESS_KEY_ID'] = 'YOUR_ACCESS_KEY'
os.environ['AWS_SECRET_ACCESS_KEY'] = 'YOUR_SECRET_KEY'
os.environ['AWS_DEFAULT_REGION'] = 'ap-south-1'  # or your preferred region

# Firehose stream name and local folder path
FIREHOSE_STREAM_NAME = 'YOUR_FIREHOSE_STREAM_NAME'
FOLDER_PATH = r'C:\Path\To\Your\Folder'  # Change this to your actual folder path

# Connect to Firehose
firehose = boto3.client('firehose')

# Loop through all CSV and JSON files in the folder
for filename in os.listdir(FOLDER_PATH):
    if filename.endswith('.csv') or filename.endswith('.json'):
        file_path = os.path.join(FOLDER_PATH, filename)
        with open(file_path, 'rb') as f:
            response = firehose.put_record(
                DeliveryStreamName=FIREHOSE_STREAM_NAME,
                Record={'Data': f.read()}
            )
        print(f"Uploaded {filename}: {response['ResponseMetadata']['HTTPStatusCode']}")













