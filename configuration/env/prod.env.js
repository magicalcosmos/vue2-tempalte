'use strict';
module.exports = {
  API_BASE: (W) => {
    return `${W.location.protocol}//${W.location.host}/api/v2`;
  },
  WS_ENDPOINT: (W) => {
    return `ws://${W.location.host}/ws`;
  }
};
