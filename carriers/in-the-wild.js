'use strict';
// IN THE WILD
// these carriers have been discovered through actual lookups on real numbers

// ALPHABETIC ORDER
// When editing this file, please maintain alphabetic order

// edit on 08/15/2017

// EXAMPLE
/*
  { "name": "boost"             // programmer-friendly name
  , "carrier": "Boost"          // print-friendly name
  , "sms": "myboostmobile.com"  // sms gateway
  , "mms": "myboostmobile.com"  // mms gateway
   }
*/

module.exports = [{
  "name": "alaska",
  "carrier": "Alaska",
  "sms": "sms.alaska-wireless.com",
  "mms": "msg.acsalaska.net"
}, {
  "name": "alltel",
  "carrier": "Alltel Wireless",
  "sms": "message.alltel.com",
  "mms": "mms.alltelwireless.com"
}, {
  "name": 'att',
  "carrier": "AT&T Mobility"
    // the default wireles function will test for carrier the strings
    // Wireless / Mobility / PCS, etc to determine whether AT&T or Cingular
    ,
  "sms": "txt.att.net",
  "mms": "mms.att.net",
  "test": function test(string) {
    var re = /\b(AT\s*&?\s*T|cingular)\b/i;

    return re.test(string);
  }
}, {
  "name": "boost",
  "carrier": "Boost Mobile",
  "sms": "myboostmobile.com",
  "mms": "myboostmobile.com"
}, {
  "name": "cinglular",
  "carrier": "Cingular",
  "sms": "txt.att.net",
  "mms": "mms.att.net"
}, {
  "name": "cleartalk",
  "carrier": "Cleartalk",
  "sms": "sms.cleartalk.us"
}, {
  "name": "cricket",
  "carrier": "Cricket Wireless",
  "mms": "mms.cricketwireless.net"
}, {
  "name": "cspire",
  "carrier": "C Spire Wireless",
  "sms": "cspire1.com"
}, {
  "name": "metropcs",
  "carrier": "T-Mobile_MetroPCS",
  "sms": "tmomail.net",
  "mms": "tmomail.net"
}, {
  "name": "nextel",
  "carrier": "Sprint Nextel",
  "sms": "messaging.nextel.com"
}, {
  "name": "pageplus",
  "carrier": "Page Plus",
  "sms": "vtext.com",
  "mms": "vzwpix.com"
}, {
  "name": "projectfi",
  "carrier": "Google Project Fi",
  "sms": "msg.fi.google.com"
}, {
  "name": "republic",
  "carrier": "Republic Wireless",
  "sms": "text.republicwireless.com"
}, {
  "name": "sprint",
  "carrier": "Sprint",
  "sms": "messaging.sprintpcs.com",
  "mms": "pm.sprint.com"
}, {
  "name": "straighttalk",
  "carrier": "Straight Talk",
  "sms": "txt.att.net",
  "mms": "mms.att.net"
}, {
  "name": "ting",
  "carrier": "Ting",
  "sms": "message.ting.com"
}, {
  "name": "tmobile",
  "carrier": "T-Mobile",
  "sms": "tmomail.net",
  "mms": "tmomail.net",
  "test": function (string) {
    // being careful not to match boos*tmobile*
    var re = /\bt-?mobile\b/i;

    return re.test(string);
  }
}, {
  "name": "tracfone",
  "carrier": "Tracfone",
  "sms": "mmst5.tracfone.com",
  "mms": "mmst5.tracfone.com"
}, {
  "name": "uscellular",
  "carrier": "US Cellular",
  "sms": "email.uscc.net",
  "mms": "mms.uscc.net",
  "test": function (string) {
    var re = /\b((u\.?s\.?\s*cellular)|(united\s*states\s*cellular))\b/i;

    return re.test(string);
  }
}, {
  "name": "verizon",
  "carrier": "Verizon Wireless",
  "sms": "vtext.com",
  "mms": "vzwpix.com"
}, {
  "name": "viaero",
  "carrier": "Viaero Wireless",
  "sms": "viaerosms.com",
  "mms": "mmsviaero.com"
}, {
  "name": "virgin",
  "carrier": "Virgin Mobile",
  "sms": "vmobl.com",
  "mms": "vmpix.com"
}];
