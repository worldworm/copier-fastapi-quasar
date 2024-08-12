import { ref, Ref } from "vue";
import { QTableProps } from "quasar";
import { api } from "boot/axios";
import { fullParamsStr } from "src/utils/apiQueryParams";

interface Pagination {
  rowsPerPage: number;
  page: number;
  rowsNumber: number;
  totalCount: number;
  sortBy: string;
  descending: boolean;
}

interface ApiResponse<T> {
  data: T[];
  pagination: {
    page: number;
    size: number;
    result_count: number;
    total_count: number;
    total_pages: number;
    last_page: number;
  };
}

export function usePagedTableLoad<T>(apiEndpoint: string, defaultSortBy: string, defaultFilterBy: string) {
  const rows: Ref<T[]> = ref([]);
  const loadingTable = ref(true);
  const filter = ref("");
  const pagination: Ref<Pagination> = ref({
    rowsPerPage: 10,
    page: 1,
    rowsNumber: 0,
    totalCount: 0,
    sortBy: defaultSortBy,
    descending: false,
  });

  async function loadData(page: number, size: number, sortBy = defaultSortBy, descending = false, filter = "") {
    loadingTable.value = true;
    const response = await api.get<ApiResponse<T>>(`${apiEndpoint}/${fullParamsStr(page, size, sortBy, descending, defaultFilterBy, filter)}`);
    rows.value = response.data.data;
    pagination.value.rowsNumber = response.data.pagination.result_count;
    pagination.value.totalCount = response.data.pagination.total_count;
    pagination.value.page = response.data.pagination.page + 1;
    pagination.value.rowsPerPage = size;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
    loadingTable.value = false;
  }

  function requestTableData(props: Parameters<NonNullable<QTableProps["onRequest"]>>[0], loadEverything = false) {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    const filter = props.filter;
    const size = loadEverything ? 0 : rowsPerPage;
    return loadData(page, size, sortBy, descending, filter);
  }

  return {
    rows,
    loadingTable: loadingTable,
    filter,
    pagination,
    loadData: loadData,
    requestTableData,
  };
}
