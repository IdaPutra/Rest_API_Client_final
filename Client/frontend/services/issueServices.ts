// services/issueService.ts

import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Replace with your API base URL

export interface Issue {
  id: number;
  title: string;
  description: string;
}

// Get all issues
export const getAllIssues = async (): Promise<Issue[]> => {
  const response: AxiosResponse<Issue[]> = await axios.get(`${API_BASE_URL}/issues`);
  return response.data;
};

// Get an issue by ID
export const getIssueById = async (id: number): Promise<Issue | null> => {
  try {
    const response: AxiosResponse<Issue> = await axios.get(`${API_BASE_URL}/issues/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      return null; // Issue not found
    }
    throw error; // Other errors
  }
};

// Create a new issue
export const createIssue = async (issueData: Partial<Issue>): Promise<Issue> => {
  const response: AxiosResponse<Issue> = await axios.post(`${API_BASE_URL}/issues`, issueData);
  return response.data;
};

// Update an existing issue
export const updateIssue = async (id: number, issueData: Partial<Issue>): Promise<Issue | null> => {
  try {
    const response: AxiosResponse<Issue> = await axios.put(`${API_BASE_URL}/issues/${id}`, issueData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      return null; // Issue not found
    }
    throw error; // Other errors
  }
};

// Delete an issue by ID
export const deleteIssue = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/issues/${id}`);
};
