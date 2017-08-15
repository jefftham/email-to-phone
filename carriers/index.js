'use strict';

let carriers, carriersSms = {};

let allCarriers = require('./in-the-wild');
let Fuse = require('fuse.js');

carriers = require('./in-the-wild');
carriers.forEach(function (c) {
  carriersSms[c.name] = c.sms;
});

function formatNum(num) {
  num = String(num).replace(/\D/g, '').replace(/^\+?1/, '');
  if (!/^\d{10}/.test(num)) {
    return null;
  }
  return num;
}

function lookupByComment(comment) {
  let name;

  if (!comment) {
    return;
  }

  carriers.some(function (carrier) {
    if (new RegExp(carrier.name, 'i').test(comment.replace(/\W/, ''))) {
      name = carrier.name;
      return true;
    }
  });

  return name;
}

function lookupBySms(gateway) {
  let name;

  if (!gateway) {
    return;
  }

  carriers.some(function (carrier) {
    if (carrier.sms) {
      if (new RegExp(carrier.sms, 'i').test(gateway)) {
        name = carrier.name;
        return true;
      }
    }
  });

  return name;
}

function lookupByMms(gateway) {
  let name;

  if (!gateway) {
    return;
  }

  carriers.some(function (carrier) {
    if (carrier.mms) {
      if (new RegExp(carrier.mms, 'i').test(gateway)) {
        name = carrier.name;
        return true;
      }
    }
  });

  return name;
}

function createTestCarrier(carrierName) {
  function testCarrier(string) {
    let re = new RegExp(carrierName, 'i');

    return re.test((string || '').replace(/[\W\-]+/g, ''));
  }

  return testCarrier;
}

function lookup(type, number, map) {
  map = map || {};

  let options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "name",
      "carrier"
    ]
  };
  let fuse = new Fuse(allCarriers, options); // "list" is the item array
  let result = fuse.search(type)[0]; // use fuzzy search to get the most nearest carrier

  for (let key in result) {
    if (key !== 'test' && key !== 'updated')
      map[key] = result[key];
  }

  if (map.sms) {
    if (number) {
      map.smsAddress = formatNum(number) + '@' + map.sms;
    } else {
      //  map.smsGateway = carrier.sms;
    }
  }
  if (map.mms) {
    if (number) {
      map.mmsAddress = formatNum(number) + '@' + map.mms;
    } else {
      //  map.mmsGateway = carrier.mms;
    }
  }


  return map;
}

function lookupSms(str) {
  let sms;

  carriers.some(function (carrier) {
    let test = carrier.test || createTestCarrier(carrier.name);

    if (test(str)) {
      sms = carrier.sms || null;
      return sms;
    }
  });

  return sms;
}

function lookupMms(str) {
  let mms;

  carriers.some(function (carrier) {
    let test = carrier.test || createTestCarrier(carrier.name);

    if (test(str)) {
      mms = carrier.mms || null;
      return mms;
    }
  });

  return mms;
}

function phoneToEmail(number, carrier) {
  return module.exports.sms(carrier, number);
}

function lookupCarrierName(str) {
  str = (str || '').replace(/.*@/, '');

  let options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
      "sms",
      "mms"
    ]
  };
  let fuse = new Fuse(allCarriers, options); // "list" is the item array
  let result = fuse.search(str); // use fuzzy search to get the most nearest carrier
  return result;

  // return (lookupBySms(str) || lookupByMms(str) || lookupByComment(str) || null);
}

function lookupSmsAddress(carrierString, num) {
  num = formatNum(num);
  let sms = lookupSms(carrierString);

  if (sms) {
    if (num) {
      return num + '@' + sms;
    }
    return sms;
  }
  return null;
}

function lookupSmsOrMms(carrierString, num) {
  num = formatNum(num);
  let sms = lookupSms(carrierString);

  if (sms) {
    if (num) {
      return num + '@' + sms;
    }
    return sms;
  }
  return lookupMmsAddress(carrierString, num);
}

function lookupMmsAddress(carrierString, num) {
  num = formatNum(num);
  let mms = lookupMms(carrierString);

  if (mms) {
    if (num) {
      return num + '@' + mms;
    }
    return mms;
  }
  return null;
}

function lookupMmsOrSms(carrierString, num) {
  num = formatNum(num);
  let mms = lookupMms(carrierString);

  if (mms) {
    if (num) {
      return num + '@' + mms;
    }
    return mms;
  }
  return lookupSmsAddress(carrierString, num);
}


let getCarrierList = () => carriers.map((e, i, a) => e.name);
let carrierList = getCarrierList();


let getCompanrList = () => carriers.map((e, i, a) => e.carrier);
let companyList = getCompanrList();

// console.log(carriers);
// console.log(carriersSms);
// console.log(carrierList);

module.exports = phoneToEmail;
module.exports.list = getCarrierList;
module.exports.companyList = getCompanrList;
module.exports.carriers = carriersSms;
module.exports.gateways = carriers;

module.exports.sms = lookupSmsAddress;
module.exports.mms = lookupMmsAddress;
module.exports.sms_mms = lookupSmsOrMms;
module.exports.mms_sms = lookupMmsOrSms;
module.exports.carrier = lookupCarrierName;
module.exports.lookup = lookup;
module.exports.carrierBySms = lookupBySms;
module.exports.carrierByMms = lookupBySms;
module.exports.carrierByComment = lookupByComment;

// Deprecated
module.exports.lookupBySmsGateway = lookupBySms;
module.exports.lookupByComment = lookupByComment;
