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
  slugs: [string];
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
    category: {
      slug: string;
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
      slug: string;
    };
    description: {
      text: string;
    }[];
    mainimage: {
      alt: string;
      url: string;
    };
    short_description: string;
    price: number;
    sku: string;
    specs: {
      spec_name: string;
      spec_value: string;
    }[];
    images: {
      image: {
        alt: string;
        url: string;
      };
    }[];
    stock: number;
  };
  tags: string[];
}
