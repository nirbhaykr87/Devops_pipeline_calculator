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
import base64
import json

# ======= CONFIGURATION =======
stream_name = "your-firehose-name"
file_path = "your-file.json"  # or .csv
batch_size = 500
# =============================

client = boto3.client('firehose')

def chunked_iterable(iterable, size):
    """Yield chunks of size 'size' from iterable."""
    chunk = []
    for item in iterable:
        chunk.append(item)
        if len(chunk) == size:
            yield chunk
            chunk = []
    if chunk:
        yield chunk

def encode_line(line):
    return base64.b64encode(line.encode("utf-8")).decode("utf-8")

def send_batch(records):
    entries = [{"Data": encode_line(r)} for r in records]
    response = client.put_record_batch(
        DeliveryStreamName=stream_name,
        Records=entries
    )
    failed = response['FailedPutCount']
    if failed > 0:
        print(f"[!] {failed} record(s) failed to deliver.")
    else:
        print(f"[✓] Sent {len(records)} records successfully.")

def main():
    with open(file_path, "r") as f:
        lines = f.readlines()
        for batch in chunked_iterable(lines, batch_size):
            send_batch(batch)

if __name__ == "__main__":
    main()


import base64
import json
import time

def lambda_handler(event, context):
    output = []

    for record in event['records']:
        try:
            # Decode Base64 input data
            payload = base64.b64decode(record['data']).decode('utf-8')
            # Assume CSV input for the 'customers' table from Purchase Data
            fields = payload.strip().split(',')

            transformed = {
                "customer_id": fields[0],
                "name": fields[1],
                "email": fields[2],
                "region": fields[3],
                "loyalty_status": fields[4],
                "ingested_at": int(time.time())
            }

            new_payload = base64.b64encode(json.dumps(transformed).encode('utf-8')).decode('utf-8')

            output_record = {
                'recordId': record['recordId'],
                'result': 'Ok',
                'data': new_payload
            }
        except Exception as e:
            output_record = {
                'recordId': record['recordId'],
                'result': 'ProcessingFailed',
                'data': record['data']
            }

        output.append(output_record)

    return {'records': output}















