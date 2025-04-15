export const replaceSeoRM = (input?: string) => {
  if (!input) return "";

  return input
    .replace(
      `link rel="canonical" href="https://dhthainguyen.aum.edu.vn`,
      `link rel="canonical" href="https://dhthainguyen.edu.vn/`
    )
    .replace(
      `meta property="og:url" content="https://dhthainguyen.aum.edu.vn`,
      `meta property="og:url" content="https://dhthainguyen.edu.vn`
    )
    .replace(
      `"@id":"https://dhthainguyen.aum.edu.vn/#organization"`,
      `"@id":"https://dhthainguyen.edu.vn/#organization"`
    )
    .replace(
      `https://dhthainguyen.aum.edu.vn/#logo`,
      `https://dhthainguyen.edu.vn/#logo`
    )
    .replace(
      `https://dhthainguyen.aum.edu.vn/#website`,
      `https://dhthainguyen.edu.vn/#website`
    )
    .replace(
      `https://dhthainguyen.aum.edu.vn/#webpage`,
      `https://dhthainguyen.edu.vn/#webpage`
    )
    .replace(
      `"url":"https://dhthainguyen.aum.edu.vn"`,
      `"url":"https://dhthainguyen.edu.vn"`
    )
    .replace(
      `"@type":"WebPage","@id":"https://dhthainguyen.aum.edu.vn`,
      `"@type":"WebPage","@id":"https://dhthainguyen.edu.vn`
    )
    .replace(
      `#webpage","url":"https://dhthainguyen.aum.edu.vn`,
      `#webpage","url":"https://dhthainguyen.edu.vn`
    )
    .replace(
      `"mainEntityOfPage":{"@id":"https://dhthainguyen.aum.edu.vn`,
      `"mainEntityOfPage":{"@id":"https://dhthainguyen.edu.vn/`
    )
    .replace(
      `"worksFor":{"@id":"https://dhthainguyen.aum.edu.vn/#organization`,
      `"worksFor":{"@id":"https://dhthainguyen.edu.vn/#organization`
    )
    .replace(
      `"sameAs":["https://dhthainguyen.aum.edu.vn"]`,
      `"sameAs":["https://dhthainguyen.edu.vn"]`
    );
};
