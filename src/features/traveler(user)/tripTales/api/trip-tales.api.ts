import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";
import type {
  CreatePostApiResponse,
  CreatePostData,
  CreatePostResponse,
  DeleteMyPostApiResponse,
  MyPostApiResponse,
  MyPostResponse,
  MyPostsApiResponse,
  MyPostsQuery,
  MyPostsResponse,
  MyProfileApiResponse,
  MyProfileResponse,
  UpdateMyPostApiResponse,
  UpdateMyPostData,
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

  // GET MY PROFILE
  async getMyProfile(): Promise<MyProfileResponse> {
    const response = await axiosInstance.get<MyProfileApiResponse>(
      SERVER_ROUTES.GET_MY_PROFILE,
    );

    return response.data.data;
  },

  // GET MY POSTS
  async getMyPosts(query: MyPostsQuery = {}): Promise<MyPostsResponse> {
    const response = await axiosInstance.get<MyPostsApiResponse>(
      SERVER_ROUTES.GET_MY_POSTS,
      {
        params: query,
      },
    );

    return response.data.data;
  },

  // GET MY POST BY ID
  async getMyPostById(postId: string): Promise<MyPostResponse> {
    const response = await axiosInstance.get<MyPostApiResponse>(
      SERVER_ROUTES.GET_MY_POST_BY_ID.replace(":postId", postId),
    );

    return response.data.data;
  },

  // UPDATE MY POST
  async updateMyPost(
    postId: string,
    postData: UpdateMyPostData,
  ): Promise<MyPostResponse> {
    const formData = new FormData();

    formData.append("title", postData.title);
    formData.append("destination", postData.destination);
    formData.append("content", postData.content);
    formData.append("tags", JSON.stringify(postData.tags));

    formData.append("keepMediaKeys", JSON.stringify(postData.keepMediaKeys));

    postData.media.forEach((file) => {
      formData.append("media", file);
    });

    const response = await axiosInstance.put<UpdateMyPostApiResponse>(
      SERVER_ROUTES.UPDATE_MY_POST.replace(":postId", postId),
      formData,
    );

    return response.data.data;
  },

  // DELETE MY POST
  async deleteMyPost(postId: string): Promise<string> {
    const response = await axiosInstance.delete<DeleteMyPostApiResponse>(
      SERVER_ROUTES.DELETE_MY_POST.replace(":postId", postId),
    );

    return response.data.data?.id ?? postId;
  },
};
