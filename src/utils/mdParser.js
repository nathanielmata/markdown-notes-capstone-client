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
    // let regex = /https?\:\/\/([^._-]([a-zA-Z0-9]|(\-?(?!\-))){1,63})?\b[\.\:]?([^._-]([a-zA-Z0-9]|(\-?(?!\-))){1,63})?\b[\.\:]([a-zA-Z]){0,63}/g;
    let protocol = /https?:\/\//;
    let subdomain = /([^._-]([a-zA-Z0-9]|(-?(?!-))){1,63})?/;
    let sep = /\b[.:]?/;
    let domain = subdomain;
    let tld = /\b[.:]([a-zA-Z]){1,63}\b/;
    let flags = "g"

    let regex = new RegExp(
      protocol.source +
      subdomain.source +
      sep.source +
      domain.source +
      tld.source, flags
    );
    
    match = str.match(regex);
    if (match) {
      str = str.replace(regex, `<a href="${match}">${match}</a>`);
    }
    return str;
  } 

  function escSpecial(str) {
    const c = { "<": "&lt;", ">": "&gt;", "&": "&amp;" };
    return str.replace(/[<&>]/g, function (s) {
      return c[s];
    });
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
