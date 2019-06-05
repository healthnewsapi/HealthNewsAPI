export interface INoticia {
  author: string;
  content: string;
  insertionDate: string;
  description: string;
  event: string[];
  publishedAt: string;
  score: number;
  source: string;
  title: string;
  region: string;
  country: string;
  uf: string;
  url: string;
  urlToImage: string;
  indicators: {
      postedClipping: string;
      markedClipping: string;
      mapViews: number;
      mapDetails: number;
  };
}
