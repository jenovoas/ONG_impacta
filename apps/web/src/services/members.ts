import { apiClient } from "../lib/api";

export type MemberStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DECEASED";

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  status: MemberStatus;
  memberNumber?: string | null;
  memberSince?: string | null;
  monthlyFee?: string | null;
}

export interface MembersResponse {
  data: Member[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface MembersFilters {
  page?: number;
  perPage?: number;
  search?: string;
  status?: MemberStatus | "";
}

export const membersService = {
  async list(filters: MembersFilters = {}) {
    const { data } = await apiClient.get<MembersResponse>("/members", {
      params: filters,
    });
    return data;
  },
};
