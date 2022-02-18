export interface User {
  id: number;
  print: boolean;
  name: string;
  url: string;
}

export interface HomeBannerType {
  results: {
    id: string;
    data: {
      title: string;
      description: {
        text: string;
      }[];
    };
    main_image: {
      alt: string;
      url: string;
    };
  }[];
}

export interface HomeCategoriesType {
  results: {
    id: string;
    href: string;
    data: {
      name: string;
      main_image: {
        alt: string;
        url: string;
      };
    };
  }[];
}

export interface HomeFeaturedType {
  results: {
    id: string;
    data: {
      name: string;
      mainimage: {
        alt: string;
        url: string;
      };
      short_description: string;
      price: number;
      stock: number;
    };
  }[];
}
