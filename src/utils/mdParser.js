const mdParser = (() => {
  let match;

  function headingMatch(str) {
    match = str.match(/\n*#+\s+.+\n*/g);
    if (match) {
      const matchStr = match[0];
      const level = matchStr.match(/^#+/)[0].length;
      const trimStr = matchStr.replace(/^#+/, "").trim();
      str = `<h${level}>${trimStr}</h${level}>`;
    }
    return str;
  }

  function codeBlockMatch(str) {
    match = str.match(/`{3}\n*.*\n*/g);
    if (match) {
      const matchStr = match[0];
      const trimStr = matchStr.replace(/`{3}\n*/g, "").trim();
      str = `<pre><code>${trimStr}</code></pre>`;
    }
    return str;
  }

  function ulMatch(str, prev, next) {
    const regex = /^[-*]\s.+/g;
    const match = str.match(regex);
    if (match) {
      let out = String();
      out += !prev || !prev.match(regex) ? `<ul>` : "";
      out += `<li>${match[0].replace(/^[-*]\s/g, "")}</li>`;
      out += !next || !next.match(regex) ? `</ul>` : "";
      str = out;
    }
    return str;
  }
  
  function emMatch(str) {
    let regex = /(__|\*\*)[^.]+(__|\*\*)\n*/g;
    match = str.match(regex);
    if (match) {
      let out = String();
      const arr = str.split(regex);
      out += "<p>" + arr[0];

      match.forEach((m, idx) => {
        out += `<strong>${m.replace(/(_{2}|\*{2})([^_*]+)\1/g, "$2")}</strong>`;
        out += idx === match.length - 1 ? arr[arr.length - 1] : "";
      });

      out += "</p>";
      str = out;
    }

    regex = /[_*][^_*]+[_*]\n*/g;
    match = str.match(regex);
    if (match) {
      let out = String();
      const arr = str.split(regex);

      match.forEach((m, idx) => {
        out += arr[idx] + `<em>${m.replace(/[_*]/g, "")}</em>`;
        out += idx === match.length - 1 ? arr[idx + 1] : "";
      });

      str = out;
    }

    return str;
  }

  return {
    parse: (content) => {
      const arr = content.split("\n");
      return arr.map((str, idx) => {
        let mdMatch = headingMatch(str);
        mdMatch = codeBlockMatch(mdMatch);
        mdMatch = ulMatch(mdMatch, arr[idx - 1], arr[idx + 1]);
        mdMatch = emMatch(mdMatch);
        return mdMatch;
      });
    },
  };
})();

export default mdParser;
