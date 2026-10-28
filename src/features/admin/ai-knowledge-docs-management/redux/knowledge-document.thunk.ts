import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type {
  GetKnowledgeDocumentsParams,
  UploadKnowledgeDocumentData,
} from "../types/knowledge-document.types";
import { knowledgeDocumentApi } from "../apis/knowledge-document.api";

interface ApiError {
  message: string;
}

/////////////////////////////////////////////////////////////
// GET KNOWLEDGE DOCUMENTS

export const getKnowledgeDocumentsThunk = createAsyncThunk(
  "knowledgeDocuments/getDocuments",

  async (params: GetKnowledgeDocumentsParams, { rejectWithValue }) => {
    try {
      const response = await knowledgeDocumentApi.getDocuments(params);

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch knowledge documents.",
      );
    }
  },
);

/////////////////////////////////////////////////////////////
// GET KNOWLEDGE DOCUMENT BY ID

export const getKnowledgeDocumentByIdThunk = createAsyncThunk(
  "knowledgeDocuments/getDocumentById",

  async (documentId: string, { rejectWithValue }) => {
    try {
      const response = await knowledgeDocumentApi.getDocumentById(documentId);

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch knowledge document.",
      );
    }
  },
);

/////////////////////////////////////////////////////////////
// UPLOAD KNOWLEDGE DOCUMENT

export const uploadKnowledgeDocumentThunk = createAsyncThunk(
  "knowledgeDocuments/uploadDocument",

  async (data: UploadKnowledgeDocumentData, { rejectWithValue }) => {
    try {
      const response = await knowledgeDocumentApi.uploadDocument(data);

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to upload knowledge document.",
      );
    }
  },
);

/////////////////////////////////////////////////////////////
// DELETE KNOWLEDGE DOCUMENT

export const deleteKnowledgeDocumentThunk = createAsyncThunk(
  "knowledgeDocuments/deleteDocument",

  async (documentId: string, { rejectWithValue }) => {
    try {
      await knowledgeDocumentApi.deleteDocument(documentId);

      return documentId;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to delete knowledge document.",
      );
    }
  },
);
