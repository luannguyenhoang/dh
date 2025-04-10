export const replaceSeoRM = (input?: string) => {
  if (!input) return ""; 

  return input
    .replace(
      `link rel="canonical" href="http://10.10.51.16:8009`,
      `link rel="canonical" href="https://aof.com.vn/`
    )
    .replace(
      `meta property="og:url" content="http://10.10.51.16:8009`,
      `meta property="og:url" content="https://aof.com.vn`
    )
    .replace(
      `"@id":"http://10.10.51.16:8009/#organization"`,
      `"@id":"https://aof.com.vn/#organization"`
    )
    .replace(`http://10.10.51.16:8009/#logo`, `https://aof.com.vn/#logo`)
    .replace(`http://10.10.51.16:8009/#website`, `https://aof.com.vn/#website`)
    .replace(`http://10.10.51.16:8009/#webpage`, `https://aof.com.vn/#webpage`)
    .replace(`"url":"http://10.10.51.16:8009"`, `"url":"https://aof.com.vn"`)
    .replace(
      `"@type":"WebPage","@id":"http://10.10.51.16:8009`,
      `"@type":"WebPage","@id":"https://aof.com.vn`
    )
    .replace(
      `#webpage","url":"http://10.10.51.16:8009`,
      `#webpage","url":"https://aof.com.vn`
    )
    .replace(
      `"mainEntityOfPage":{"@id":"http://10.10.51.16:8009`,
      `"mainEntityOfPage":{"@id":"https://aof.com.vn/`
    )
    .replace(
      `"worksFor":{"@id":"http://10.10.51.16:8009/#organization`,
      `"worksFor":{"@id":"https://aof.com.vn/#organization`
    )
    .replace(
      `"sameAs":["http://10.10.51.16:8009"]`,
      `"sameAs":["https://aof.com.vn"]`
    );
};
