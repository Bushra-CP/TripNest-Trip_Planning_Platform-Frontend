import { createSlice } from "@reduxjs/toolkit";

import type { KnowledgeDocument } from "../types/knowledge-document.types";

import {
  deleteKnowledgeDocumentThunk,
  getKnowledgeDocumentByIdThunk,
  getKnowledgeDocumentsThunk,
  uploadKnowledgeDocumentThunk,
} from "./knowledge-document.thunk";

interface KnowledgeDocumentPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

interface KnowledgeDocumentState {
  documents: KnowledgeDocument[];

  selectedDocument: KnowledgeDocument | null;

  pagination: KnowledgeDocumentPagination;

  isLoading: boolean;
  isUploading: boolean;
  isDeleting: boolean;

  error: string | null;
}

const initialState: KnowledgeDocumentState = {
  documents: [],

  selectedDocument: null,

  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 5,
  },

  isLoading: false,
  isUploading: false,
  isDeleting: false,

  error: null,
};

const knowledgeDocumentSlice = createSlice({
  name: "knowledgeDocuments",

  initialState,

  reducers: {
    clearKnowledgeDocuments(state) {
      state.documents = [];

      state.pagination = initialState.pagination;

      state.selectedDocument = null;

      state.error = null;
    },

    clearSelectedKnowledgeDocument(state) {
      state.selectedDocument = null;
    },

    clearKnowledgeDocumentError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /////////////////////////////////////////////////////////////
      // GET DOCUMENTS

      .addCase(getKnowledgeDocumentsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getKnowledgeDocumentsThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.documents = action.payload.data.documents;

        state.pagination = action.payload.data.pagination;
      })

      .addCase(getKnowledgeDocumentsThunk.rejected, (state, action) => {
        state.isLoading = false;

        state.error =
          (action.payload as string) ?? "Failed to fetch knowledge documents.";
      })

      /////////////////////////////////////////////////////////////
      // GET DOCUMENT BY ID

      .addCase(getKnowledgeDocumentByIdThunk.fulfilled, (state, action) => {
        state.selectedDocument = action.payload;
      })

      .addCase(getKnowledgeDocumentByIdThunk.rejected, (state, action) => {
        state.error =
          (action.payload as string) ?? "Failed to fetch knowledge document.";
      })

      /////////////////////////////////////////////////////////////
      // UPLOAD DOCUMENT

      .addCase(uploadKnowledgeDocumentThunk.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })

      .addCase(uploadKnowledgeDocumentThunk.fulfilled, (state, action) => {
        state.isUploading = false;

        //Add the newly uploaded document to the beginning of the current list.
        state.documents.unshift(action.payload.data);

        state.pagination.totalItems += 1;
      })

      .addCase(uploadKnowledgeDocumentThunk.rejected, (state, action) => {
        state.isUploading = false;

        state.error =
          (action.payload as string) ?? "Failed to upload knowledge document.";
      })

      /////////////////////////////////////////////////////////////
      // DELETE DOCUMENT

      .addCase(deleteKnowledgeDocumentThunk.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })

      .addCase(deleteKnowledgeDocumentThunk.fulfilled, (state, action) => {
        state.isDeleting = false;

        state.documents = state.documents.filter(
          (document) => document.id !== action.payload,
        );

        state.pagination.totalItems = Math.max(
          0,
          state.pagination.totalItems - 1,
        );

        if (state.selectedDocument?.id === action.payload) {
          state.selectedDocument = null;
        }
      })

      .addCase(deleteKnowledgeDocumentThunk.rejected, (state, action) => {
        state.isDeleting = false;

        state.error =
          (action.payload as string) ?? "Failed to delete knowledge document.";
      });
  },
});

export const {
  clearKnowledgeDocuments,
  clearSelectedKnowledgeDocument,
  clearKnowledgeDocumentError,
} = knowledgeDocumentSlice.actions;

export default knowledgeDocumentSlice.reducer;
