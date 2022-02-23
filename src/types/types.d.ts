export interface StoreState {
  categorySelected: string;
  productList: {
    results: ProductDataType[];
  };
  selectedCategoryProductList: ProductDataType[];
}

export interface SliderSettingsType {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  responsive?: {
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
    };
  }[];
}

export interface HomeBannerSlideDataType {
  id: string;
  data: {
    title: string;
    description: {
      text: string;
    }[];
    main_image: {
      alt: string;
      url: string;
    };
  };
}

export interface ProductCategoryDataType {
  id: string;
  href: string;
  data: {
    name: string;
    main_image: {
      alt: string;
      url: string;
    };
  };
}

export interface HomeFeaturedItemDataType {
  id: string;
  href: string;
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
}

export interface ProductDataType {
  id: string;
  data: {
    name: string;
    category: {
      id: string;
    };
    mainimage: {
      alt: string;
      url: string;
    };
    short_description: string;
    price: number;
  };
}
