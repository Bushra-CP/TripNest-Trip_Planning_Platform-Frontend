import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";
import type {
  CreatePostApiResponse,
  CreatePostData,
  CreatePostResponse,
} from "../types/trip-tales.types";

export const tripTalesApi = {
  ////////////create post////////////
  async createPost(postData: CreatePostData): Promise<CreatePostResponse> {
    const formData = new FormData();

    formData.append("title", postData.title);

    formData.append("destination", postData.destination);

    formData.append("content", postData.content);

    //Send tags as JSON.
    //Backend validation will convert this back into an array.
    formData.append("tags", JSON.stringify(postData.tags));

    //Add all images/videos using the same "media" field.
    postData.media.forEach((file) => {
      formData.append("media", file);
    });

    const response = await axiosInstance.post<CreatePostApiResponse>(
      SERVER_ROUTES.CREATE_POST,
      formData,
    );

    console.log(response.data);

    return response.data.data;
  },

  ////////////get posts////////////
  async getPosts(): Promise<CreatePostResponse[]> {
    const response = await axiosInstance.get<{
      success: boolean;
      message: string;
      data: CreatePostResponse[];
    }>(SERVER_ROUTES.GET_POSTS);

    return response.data.data;
  },

  ////////////get post by id////////////
  async getPostById(postId: string): Promise<CreatePostResponse> {
    const response = await axiosInstance.get<{
      success: boolean;
      message: string;
      data: CreatePostResponse;
    }>(SERVER_ROUTES.GET_POST_BY_ID.replace(":postId", postId));

    console.log(response.data.data);

    return response.data.data;
  },
};
