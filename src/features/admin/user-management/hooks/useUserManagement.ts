import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserTableColumns } from "../components/UserTableColumns";

import type {
  GetUsersQuery,
  User,
  UserDetails,
  UserStatus,
} from "../types/user.types";
import { selectUserManagement } from "../redux/users.selectors";
import {
  getUserDetailsThunk,
  getUsersThunk,
  updateUserStatusThunk,
} from "../redux/users.thunk";
import { toast } from "sonner";
import type { AppDispatch } from "@/app/store";

const DEFAULT_QUERY: GetUsersQuery = {
  page: 1,
  limit: 10,
};

const useUserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    users: users,
    pagination,
    isLoading,
    error,
  } = useSelector(selectUserManagement);

  /* ----------------------------------------
      Query State
  ----------------------------------------- */

  const [query, setQuery] = useState<GetUsersQuery>(DEFAULT_QUERY);

  /* ----------------------------------------
      Debounced Search
  ----------------------------------------- */

  const [debouncedSearch, setDebouncedSearch] = useState(query.search ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(query.search ?? "");
    }, 1000);

    return () => clearTimeout(timer);
  }, [query.search]);

  /* ----------------------------------------
      Modal State
  ----------------------------------------- */

  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);

  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

  /* ----------------------------------------
      Fetch Users
  ----------------------------------------- */

  useEffect(() => {
    dispatch(
      getUsersThunk({
        page: query.page,
        limit: query.limit,
        status: query.status,
        search: debouncedSearch || undefined,
      }) as never,
    );
  }, [dispatch, query.page, query.limit, query.status, debouncedSearch]);

  /* ----------------------------------------
      Query Handlers
  ----------------------------------------- */

  const handleSearchChange = (value: string) => {
    setQuery((prev) => ({
      ...prev,
      page: 1,
      search: value,
    }));
  };

  const handleStatusChange = (value: UserStatus | "All") => {
    setQuery((prev) => ({
      ...prev,
      page: 1,
      status: value === "All" ? undefined : value,
    }));
  };

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      page,
    }));
  };

  /* ----------------------------------------
      Table Actions
  ----------------------------------------- */

  const handleView = async (user: User) => {
    try {
      const response = await dispatch(
        getUserDetailsThunk({
          userId: user.id,
        }),
      ).unwrap();

      console.log(response);

      setSelectedUser(response);
      setIsUserDetailsOpen(true);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleBlock = async (user: User) => {
    try {
      const response = await dispatch(
        updateUserStatusThunk({
          userId: user.id,
          isActive: user.status === "Blocked",
        }),
      ).unwrap();

      toast.success(response.message);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const closeUserDetails = () => {
    setSelectedUser(null);
    setIsUserDetailsOpen(false);
  };

  /* ----------------------------------------
      Table Columns
  ----------------------------------------- */

  const columns = useMemo(
    () =>
      getUserTableColumns({
        onView: handleView,
        onBlock: handleBlock,
      }),
    [],
  );

  const currentStatus: UserStatus | "All" = query.status ?? "All";

  /* ----------------------------------------
      Return
  ----------------------------------------- */

  return {
    users,

    columns,

    loading: isLoading,

    error,

    pagination: {
      currentPage: pagination.page,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
      pageSize: pagination.limit,
      onPageChange: handlePageChange,
    },

    search: query.search ?? "",

    status: currentStatus,

    setSearch: handleSearchChange,
    setStatus: handleStatusChange,

    selectedUser,

    isUserDetailsOpen,

    closeUserDetails,
  };
};

export default useUserManagement;
