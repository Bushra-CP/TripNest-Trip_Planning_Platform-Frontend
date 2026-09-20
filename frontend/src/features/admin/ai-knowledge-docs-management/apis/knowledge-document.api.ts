import { axiosInstance } from "@/shared/api/axios";
import type {
  GetKnowledgeDocumentsParams,
  GetKnowledgeDocumentsResponse,
  KnowledgeDocumentResponse,
  UploadKnowledgeDocumentData,
} from "../types/knowledge-document.types";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";

export const knowledgeDocumentApi = {
  /////////////////////////////////////////////////////////////
  // GET KNOWLEDGE DOCUMENTS

  async getDocuments(
    params: GetKnowledgeDocumentsParams,
  ): Promise<GetKnowledgeDocumentsResponse> {
    const response = await axiosInstance.get<GetKnowledgeDocumentsResponse>(
      SERVER_ROUTES.ADMIN_KNOWLEDGE_DOCUMENTS,
      {
        params,
      },
    );

    return response.data;
  },

  /////////////////////////////////////////////////////////////
  // GET KNOWLEDGE DOCUMENT BY ID

  async getDocumentById(
    documentId: string,
  ): Promise<KnowledgeDocumentResponse> {
    const response = await axiosInstance.get<KnowledgeDocumentResponse>(
      SERVER_ROUTES.ADMIN_KNOWLEDGE_DOCUMENT_BY_ID.replace(":id", documentId),
    );

    return response.data;
  },

  /////////////////////////////////////////////////////////////
  // UPLOAD KNOWLEDGE DOCUMENT

  async uploadDocument(
    data: UploadKnowledgeDocumentData,
  ): Promise<KnowledgeDocumentResponse> {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("destination", data.destination);
    formData.append("category", data.category);
    formData.append("file", data.file);

    const response = await axiosInstance.post<KnowledgeDocumentResponse>(
      SERVER_ROUTES.ADMIN_KNOWLEDGE_DOCUMENTS,
      formData,
    );

    return response.data;
  },

  /////////////////////////////////////////////////////////////
  // DELETE KNOWLEDGE DOCUMENT

  async deleteDocument(documentId: string): Promise<void> {
    await axiosInstance.delete(
      SERVER_ROUTES.ADMIN_KNOWLEDGE_DOCUMENT_BY_ID.replace(":id", documentId),
    );
  },
};
