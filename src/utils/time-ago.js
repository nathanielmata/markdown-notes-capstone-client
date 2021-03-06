const TimeAgo = (() => {

  function timeUnits() {
    // time units (minute, hour, day) in milliseconds
    const unitMs = {
      m: 1000*60,
      h: 1000*60*60,
      d: 1000*60*60*24,
    }

    // return array of objects containing
    // r: time range validator
    // u: time unit in milliseconds
    // s: time suffix
    return [
      {r: (ms) => ms < unitMs.h, u: unitMs.m, s: " min ago"},
      {r: (ms) => ms > unitMs.h && ms < unitMs.d, u: unitMs.h, s: " hours ago"},
      {r: (ms) => ms > unitMs.d, u: unitMs.d, s: " days ago"},
    ];
  };

  return {  
    parse: (date) => {
      const ms = (Date.now() - Date.parse(date));
      let time_ago = "";
      for (let timestamp of timeUnits()){
        if (timestamp.r(ms)) {
          let timeUnits = Math.round(ms/timestamp.u).toString();
          let suffix = timestamp.s;
          time_ago = timeUnits + suffix;
          break;
        }
      }
      return time_ago;
    },
  };

})();

export default TimeAgo;
