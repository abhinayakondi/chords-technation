import apiClient from '../../../core/api/apiClient';
import { Fighter, FightEvent, FightResult, ApiResponse } from '../types';

export const mmaApi = {
  // Fighter endpoints
  async createFighter(fighter: Omit<Fighter, 'id' | 'createdAt' | 'updatedAt'>): Promise<Fighter> {
    const response = await apiClient.post<ApiResponse<Fighter>>('/fighters', fighter);
    return response.data.data;
  },

  async getFighter(id: string): Promise<Fighter> {
    const response = await apiClient.get<ApiResponse<Fighter>>(`/fighters/${id}`);
    return response.data.data;
  },

  async getAllFighters(): Promise<Fighter[]> {
    const response = await apiClient.get<ApiResponse<Fighter[]>>('/fighters');
    return response.data.data;
  },

  async updateFighter(id: string, fighter: Partial<Fighter>): Promise<Fighter> {
    const response = await apiClient.put<ApiResponse<Fighter>>(`/fighters/${id}`, fighter);
    return response.data.data;
  },

  async deleteFighter(id: string): Promise<void> {
    await apiClient.delete(`/fighters/${id}`);
  },

  // Fight events endpoints
  async getUpcomingFights(): Promise<FightEvent[]> {
    const response = await apiClient.get<ApiResponse<FightEvent[]>>('/fights/upcoming');
    return response.data.data;
  },

  async getLiveFights(): Promise<FightEvent[]> {
    const response = await apiClient.get<ApiResponse<FightEvent[]>>('/fights/live');
    return response.data.data;
  },

  async getFightDetails(id: string): Promise<FightEvent> {
    const response = await apiClient.get<ApiResponse<FightEvent>>(`/fights/${id}`);
    return response.data.data;
  },

  async getFightResult(id: string): Promise<FightResult> {
    const response = await apiClient.get<ApiResponse<FightResult>>(`/fights/${id}/result`);
    return response.data.data;
  }
}; 