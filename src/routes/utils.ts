export const responsePagination = (document: any, baseUrl: string, urlQuery: string, items = 1, page = 1,
                                   totalItems = 1, url?: string, URLQuery = "") => {
  const response: any = {
    data: document,
    links: [],
  };

  if (page > 1) {
    response.links.push({ rel: "prev",
                          href: `http://${baseUrl}/noticias?${URLQuery}items=${items}&page=${page - 1}`});
  }

  if (url) {
    response.links.push({ rel: "self",
                          href: `http://${baseUrl}${url}`});
  } else {
    response.links.push({ rel: "self",
                          href: `http://${baseUrl}/noticias?${URLQuery}items=${items}&page=${page}`});
  }

  if ( page * items < totalItems ) {
      response.links.push({ rel: "next",
                            href: `http://${baseUrl}/noticias?${URLQuery}items=${items}&page=${page + 1}`});
  }

  return response;
};
