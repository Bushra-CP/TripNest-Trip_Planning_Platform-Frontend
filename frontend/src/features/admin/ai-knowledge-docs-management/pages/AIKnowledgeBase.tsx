import {
  BookOpen,
} from "lucide-react";

import UploadDocumentModal from "../components/UploadDocumentModal";
import ViewDocumentModal from "../components/ViewDocumentModal";
import DeleteDocumentModal from "../components/DeleteDocumentModal";

import KnowledgeBaseTable from "../components/KnowledgeBaseTable";
import KnowledgeBaseToolbar from "../components/KnowledgeBaseToolbar";

import { useKnowledgeBase } from "../hooks/useKnowledgeBase";

const AIKnowledgeBase = () => {
  const {
    documents,
    selectedDocument,
    deleteDocument,

    uploadModalOpen,

    search,
    status,

    currentPage,
    totalPages,
    totalItems,
    pageSize,

    isLoading,
    isUploading,
    isDeleting,


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
  } = useKnowledgeBase();

  return (
    <div className="min-h-full bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900">
              <BookOpen size={21} className="text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Knowledge Base
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage the documents used by your AI travel planner.
              </p>
            </div>
          </div>
        </div>



        {/* Toolbar */}
        <KnowledgeBaseToolbar
          search={search}
          status={status}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onUploadClick={handleOpenUpload}
        />

        {/* Table */}
        <KnowledgeBaseTable
          documents={documents}
          loading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onView={handleViewDocument}
          onDelete={handleDeleteDocument}
        />
      </div>

      {/* Upload Modal */}
      <UploadDocumentModal
        open={uploadModalOpen}
        onClose={handleCloseUpload}
        onUpload={handleUploadDocument}
        loading={isUploading}
      />

      {/* View Modal */}
      <ViewDocumentModal
        document={selectedDocument}
        onClose={handleCloseView}
      />

      {/* Delete Modal */}
      <DeleteDocumentModal
        document={deleteDocument}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </div>
  );
};

export default AIKnowledgeBase;
