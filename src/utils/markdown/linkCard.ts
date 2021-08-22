import OgLite from 'ogp-parser';

export default async function linkCard(data: string, links: string[]) {
  await Promise.all(
    links.map(async (url: string) => {
      const ogLite = await OgLite(url);
      data = data.replace(
        `<p>${url}</p>`,
        `<div class="link_card"><a href="${url}" target="_blank" rel="noopener noreferrer"><div class="text_wrapper"><div class="title">${
          ogLite.title
        }</div><div class="description">${
          ogLite.seo.description
            ? ogLite.seo.description[0]
            : ogLite.seo[`${ogLite.ogp['og:site_name'][0].toLowerCase()}:description`][0]
        }</div><div class="domain"><img src="http://www.google.com/s2/favicons?domain=${
          url.split('/')[2]
        }" alt="favicon" />${url.split('/')[2]}</div></div><img src="${
          ogLite.seo[`${ogLite.ogp['og:site_name'][0].toLowerCase()}:image`][0]
            ? ogLite.seo[`${ogLite.ogp['og:site_name'][0].toLowerCase()}:image`][0]
            : ogLite.ogp['og:image'][0]
        }"/ alt="ogp_image" /></a></div>`,
      );
    }),
  );
  return data;
}
