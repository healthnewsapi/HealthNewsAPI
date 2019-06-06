export const responsePagination = (document: any, baseUrl: string, urlQuery: string, limit = 1, page = 1,
                                   totalItems = 1, url?: string) => {
  const response: any = {
    data: document,
    links: new Object(),
  };

  if (page > 1) {
    response.links.prev = `http://${baseUrl}/noticias?limit=${limit}&page=${page - 1}`;
  }

  if (url) {
    response.links.self = `http://${baseUrl}${url}`;
  } else {
    response.links.self = `http://${baseUrl}/noticias?limit=${limit}&page=${page}`;
  }

  if ( page * limit < totalItems ) {
      response.links.next = `http://${baseUrl}/noticias?limit=${limit}&page=${page + 1}`;
    }

  return response;
};
