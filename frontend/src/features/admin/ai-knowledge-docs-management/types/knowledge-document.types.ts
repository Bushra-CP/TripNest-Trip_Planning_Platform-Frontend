export type KnowledgeDocumentStatus =
  | "PENDING"
  | "PROCESSING"
  | "READY"
  | "FAILED";

export type KnowledgeDocumentFileType = "PDF" | "DOCX" | "TXT";

export interface KnowledgeDocument {
  id: string;
  title: string;
  description: string | null;
  destination: string | null;
  category: string;
  fileType: KnowledgeDocumentFileType;
  fileUrl: string;
  status: KnowledgeDocumentStatus;
  uploadedBy: string;
  uploadedAt: string;
  chunkCount: number;
}

export interface GetKnowledgeDocumentsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface KnowledgeDocumentPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export interface GetKnowledgeDocumentsData {
  documents: KnowledgeDocument[];
  pagination: KnowledgeDocumentPagination;
}

export interface GetKnowledgeDocumentsResponse {
  data: GetKnowledgeDocumentsData;
}

export interface KnowledgeDocumentResponse {
  data: KnowledgeDocument;
}

export interface UploadKnowledgeDocumentData {
  title: string;
  description: string;
  destination: string;
  category: string;
  file: File;
}

export interface UploadKnowledgeDocumentResponse {
  id: string;
  title: string;
  description: string | null;
  destination: string | null;
  category: string;
  fileType: "PDF" | "DOCX" | "TXT";
  fileUrl: string;
  status: "PENDING" | "PROCESSING" | "READY" | "FAILED";
  uploadedBy: string;
  uploadedAt: string;
  chunkCount: number;
}
