import { publicRequest, userRequest } from "../requestMethods";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

import{
  addImageStart,
  addImageSuccess,
  addImageFailure,
  getImageStart,
  getImageSuccess,
  getImageFailure,
  deleteImageStart,
  deleteImageSuccess,
  deleteImageFailure,
} from './imageRedux'
import axios from "axios";

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const addImage = async (image, dispatch) => {
  console.log(image)
  dispatch(addImageStart());
  try {
    const res = await userRequest.post(`/image`, image);
    
    dispatch(addImageSuccess(res.data));
  } catch (err) {
    dispatch(addImageFailure());
    console.log(err)
  }
};

export const deleteImage = async (id, dispatch) => {
  dispatch(deleteImageStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteImageSuccess(id));
  } catch (err) {
    dispatch(deleteImageFailure());
  }
};

export const getImage = async (dispatch) => {
  dispatch(getImageStart());
  try {
    const res = await publicRequest.get("/find");
    dispatch(getImageSuccess(res.data));
  } catch (err) {
    dispatch(getImageFailure());
  }
};