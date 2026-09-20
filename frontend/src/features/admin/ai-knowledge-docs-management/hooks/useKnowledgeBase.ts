import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/app/store";

import type {
  KnowledgeDocument,
  KnowledgeDocumentStatus,
} from "../types/knowledge-document.types";

import type { UploadDocumentFormData } from "../components/UploadDocumentModal";

import {
  deleteKnowledgeDocumentThunk,
  getKnowledgeDocumentByIdThunk,
  getKnowledgeDocumentsThunk,
  uploadKnowledgeDocumentThunk,
} from "../redux/knowledge-document.thunk";

import {
  selectKnowledgeDocumentDeleting,
  selectKnowledgeDocumentError,
  selectKnowledgeDocumentPagination,
  selectKnowledgeDocuments,
  selectKnowledgeDocumentsLoading,
  selectKnowledgeDocumentUploading,
  selectSelectedKnowledgeDocument,
} from "../redux/knowledge-document.selectors";
import { clearSelectedKnowledgeDocument } from "../redux/knowledge-document.slice";
import { toast } from "sonner";

const PAGE_SIZE = 5;

export const useKnowledgeBase = () => {
  const dispatch = useDispatch<AppDispatch>();

  //Redux state
  const documents = useSelector(selectKnowledgeDocuments);

  const pagination = useSelector(selectKnowledgeDocumentPagination);

  const selectedDocument = useSelector(selectSelectedKnowledgeDocument);

  const isLoading = useSelector(selectKnowledgeDocumentsLoading);

  const isUploading = useSelector(selectKnowledgeDocumentUploading);

  const isDeleting = useSelector(selectKnowledgeDocumentDeleting);

  const error = useSelector(selectKnowledgeDocumentError);

  //UI states
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<KnowledgeDocumentStatus | "">("");

  const [currentPage, setCurrentPage] = useState(1);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [deleteDocument, setDeleteDocument] =
    useState<KnowledgeDocument | null>(null);

  /*
   * Fetch documents
   *
   * Whenever page, search or status changes,
   * fetch the corresponding data from the backend.
   */
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: PAGE_SIZE,
      ...(search.trim() && {
        search: search.trim(),
      }),
      ...(status && {
        status,
      }),
    };

    dispatch(getKnowledgeDocumentsThunk(params));
  }, [dispatch, currentPage, search, status]);

  //Search
  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setCurrentPage(1);
  };

  //Status filter
  const handleStatusChange = (value: string): void => {
    setStatus(value as KnowledgeDocumentStatus | "");

    setCurrentPage(1);
  };

  //Pagination
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  //View document
  const handleViewDocument = (document: KnowledgeDocument): void => {
    dispatch(getKnowledgeDocumentByIdThunk(document.id));
  };

  //Close view modal
  const handleCloseView = (): void => {
    dispatch(clearSelectedKnowledgeDocument());
  };

  //Open delete confirmation
  const handleDeleteDocument = (document: KnowledgeDocument): void => {
    setDeleteDocument(document);
  };

  //Close delete confirmation
  const handleCloseDelete = (): void => {
    if (isDeleting) {
      return;
    }

    setDeleteDocument(null);
  };

  //Confirm delete
  const handleConfirmDelete = async (): Promise<void> => {
    if (!deleteDocument) {
      return;
    }

    try {
      await dispatch(deleteKnowledgeDocumentThunk(deleteDocument.id)).unwrap();

      toast.success("Document deleted successfully.");

      setDeleteDocument(null);

      //If the current page becomes empty after deletion, move back to the previous page.
      if (documents.length === 1 && currentPage > 1) {
        setCurrentPage((previousPage) => previousPage - 1);
      }
    } catch (error) {
      console.error("Delete document error:", error);

      toast.error(
        typeof error === "string" ? error : "Failed to delete the document.",
      );
    }
  };

  //Open upload modal
  const handleOpenUpload = (): void => {
    setUploadModalOpen(true);
  };

  //Close upload modal
  const handleCloseUpload = (): void => {
    if (isUploading) {
      return;
    }

    setUploadModalOpen(false);
  };

  //Upload document
  const handleUploadDocument = async (
    data: UploadDocumentFormData,
  ): Promise<void> => {
    try {
      await dispatch(
        uploadKnowledgeDocumentThunk({
          title: data.title,
          description: data.description,
          destination: data.destination,
          category: data.category,
          file: data.file,
        }),
      ).unwrap();

      toast.success("Document uploaded successfully.");

      setUploadModalOpen(false);

      //Go back to the first page so the newly uploaded document can be displayed.
      setCurrentPage(1);

      //Refetch the first page.
      dispatch(
        getKnowledgeDocumentsThunk({
          page: 1,
          limit: PAGE_SIZE,
          ...(search.trim() && {
            search: search.trim(),
          }),
          ...(status && {
            status,
          }),
        }),
      );
    } catch (error) {
      console.error("Upload document error:", error);

      toast.error(
        typeof error === "string" ? error : "Failed to upload the document.",
      );
    }
  };

  return {
    //Data
    documents,
    selectedDocument,
    deleteDocument,

    //Modal state
    uploadModalOpen,

    //Pagination
    currentPage,
    totalPages: pagination?.totalPages ?? 1,
    totalItems: pagination?.totalItems ?? 0,
    pageSize: pagination?.pageSize ?? PAGE_SIZE,

    //Filters
    search,
    status,

    //Loading states
    isLoading,
    isUploading,
    isDeleting,

    //Error
    error,

    //Handlers
    handleSearchChange,
    handleStatusChange,
    handlePageChange,

    handleViewDocument,
    handleCloseView,

    handleDeleteDocument,
    handleCloseDelete,
    handleConfirmDelete,

    handleOpenUpload,
    handleCloseUpload,
    handleUploadDocument,
  };
};
