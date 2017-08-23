email-to-phone
====================

(a fork of [tel-carrier-gateways](https://www.npmjs.com/package/tel-carrier-gateways) module with extra features and latest carriers data)

Performs a lookup of the mobile phone carrier company name to get the sms and mms gateway email addresses for that carrier.

You can use the SMS or MMS gateway address to send text messages from email.

Usage
===

```bash
npm install email-to-phone --save
```

```javascript
let lookups = require('email-to-phone');

let email = lookups.sms('verizon', 5550002222);

console.log(email);
// 5550002222@vtext.com
```

```javascript
let lookups = require('email-to-phone');

let obj = lookups.lookup('veriSon wireless');        // fuzzy lookup

let email = lookups.mms_sms(obj.name, 5550002222);   // prefer MMS but SMS is ok

console.log(email);
// 5550002222@vzwpix.com
```

API
===

  * `sms` - lookup sms domain or email
  * `mms` - lookup mms domain or email
  * `mms_sms` - lookup mms value first, return sms value if mms value is not available
  * `sms_mms` - lookup sms value first, return mms value if sms value is not available
  * `carrier` - reverse lookup carrier from sms, mms, or company name (a list of possible carriers)
  * `lookup` - a fuzzy lookup that return an object with sms, mms, wireless, and carrier short name
  * `list` - return an array of availabe carriers for lookup
  * `companyList` - return an array of availabe companies

### sms

Accepts any carrier name / company name string and an optional phone number
and returns the gateway domain or email to sms address or `null`

```javascript
lookups.sms(carrierString);                   // gateway
lookups.sms(carrierString[, phone]);          // phone@gateway
```

```javascript
lookups.sms('verizon');   // "vtext.com"
lookups.sms('tmobilee', '+15550002222');      // "5550002222@tmomail.net"
lookups.sms_mms('att', '+15550002222');       // "5550002222@txt.att.net"
```

### mms

Accepts any carrier name / company name string and an optional phone number
and returns the gateway domain or email to mms address or `null`

```javascript
lookups.mms(carrierString);                   // gateway
lookups.mms(carrierString[, phone]);          // phone@gateway
```

```javascript
lookups.mms('att');                     // "mms.att.net"
lookups.mms('sprint', '+15550002222');            // "5550002222@pm.sprint.com"
lookups.mms_sms('tmobile', '+15550002222');       // "5550002222@tmomail.net"
```

### carrier

Accepts an sms or mms gateway domain or email address, or a carrier string
and returns the an array of results that

```javascript
lookups.carrier(smsMmsOrCarrierString);       // programmer-friendly carrier name
```

```javascript
lookups.carrier('5550002222@vzwpix.com');     // an array of object included "verizon", "page plus"
```

### lookup

```javascript
lookups.lookup(carrierStr[, phone, object]);
```

```javascript
lookups.lookup("Verizon");

{ name: 'verizon',
  carrier: 'Verizon Wireless',
  sms: 'vtext.com',
  mms: 'vzwpix.com'}


lookups.lookup("verizon ??", '5550002222', { foo: "bar" });

{ foo: 'bar',
  name: 'verizon',
  carrier: 'Verizon Wireless',
  sms: 'vtext.com',
  mms: 'vzwpix.com',
  smsAddress: '5550002222@vtext.com',
  mmsAddress: '555000222@vzwpix.com'}
```

### list

```javascript
lookups.list();

[ 'alaska',
  'alltel',
  'att',
  'boost',
  'cinglular',
  'cleartalk',
  'cricket',
  'cspire',
  'metropcs',
  'nextel',
  'pageplus',
  'projectfi',
  'republic',
  'sprint',
  'straighttalk',
  'ting',
  'tmobile',
  'tracfone',
  'uscellular',
  'verizon',
  'viaero',
  'virgin' ]
```

### companyList

```javascript
lookups.companyList();

[ 'Alaska',
  'Alltel Wireless',
  'AT&T Mobility',
  'Boost Mobile',
  'Cingular',
  'Cleartalk',
  'Cricket',
  'C Spire Wireless',
  'T-Mobile_MetroPCS',
   'Sprint Nextel',
  'Page Plus',
  'Google Project Fi',
  'Republic Wireless',
  'Sprint',
  'Straight Talk',
  'Ting',
  'T-Mobile',
  'Tracfone',
  'US Cellular',
  'Verizon Wireless',
  'Viaero Wireless',
  'Virgin Mobile']
```
