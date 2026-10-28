import type { RootState } from "@/app/store";

export const selectKnowledgeDocuments = (state: RootState) =>
  state.knowledgeDocuments.documents;

export const selectKnowledgeDocumentPagination = (state: RootState) =>
  state.knowledgeDocuments.pagination;

export const selectSelectedKnowledgeDocument = (state: RootState) =>
  state.knowledgeDocuments.selectedDocument;

export const selectKnowledgeDocumentsLoading = (state: RootState) =>
  state.knowledgeDocuments.isLoading;

export const selectKnowledgeDocumentUploading = (state: RootState) =>
  state.knowledgeDocuments.isUploading;

export const selectKnowledgeDocumentDeleting = (state: RootState) =>
  state.knowledgeDocuments.isDeleting;

export const selectKnowledgeDocumentError = (state: RootState) =>
  state.knowledgeDocuments.error;
