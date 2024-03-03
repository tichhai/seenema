import { SET_CAROUSEL } from "../actions/types/CarouselType";

const stateDefault = {
  arrImg: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

export const CarouselReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CAROUSEL: {
      return { ...state, arrImg: action.arrImg };
    }
    default:
      return { ...state };
  }
};
