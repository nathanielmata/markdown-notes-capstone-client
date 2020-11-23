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

  function linkMatch(str) {
    const urlPatterns = Object.values({
      protocol: /https?:\/\//,
      subdomain: /([^._-]([a-zA-Z0-9]|(-?(?!-))){1,63})?/,
      sep: /\b[.:]?/,
      domain: /([^._-]([a-zA-Z0-9]|(-?(?!-))){1,63})?/,
      tld: /\b[.:]([a-zA-Z]){1,63}\b/,
    })

    let regex = new RegExp(urlPatterns.map(r => r.source).join(""), "g");
    
    match = str.match(regex);
    if (match) {
      str = str.replace(regex, `<a href="${match}">${match}</a>`);
    }
    return str;
  } 

  function escSpecial(str) {
    const c = { "<": "&lt;", ">": "&gt;", "&": "&amp;" };
    str = str.replace(/[<&>]/g, (s) => c[s]);
    return str;
  }

  return {
    parse: (content) => {
      const arr = content.split("\n");
      return arr.map((str, idx) => {
        let mdMatch = escSpecial(str);
        mdMatch = headingMatch(mdMatch);
        mdMatch = codeBlockMatch(mdMatch);
        mdMatch = ulMatch(mdMatch, arr[idx - 1], arr[idx + 1]);
        mdMatch = emMatch(mdMatch);
        mdMatch = linkMatch(mdMatch);
        return mdMatch;
      });
    },
  };
})();

export default mdParser;
