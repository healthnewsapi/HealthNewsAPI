export const responsePagination = (document: any, limit: number, page: number,
                                   totalItems: number) => {
  const response: any = {
    meta: {},
    data: document,
    links: new Object(),
  };

  if (page > 1) {
    response.links.prev = `?limit=${limit}&page=${page - 1}`;
  }

  response.links.self = `?limit=${limit}&page=${page}`;

  if ( page * limit < totalItems ) {
      response.links.next = `?limit=${limit}&page=${page + 1}`;
    }

  return response;
};
