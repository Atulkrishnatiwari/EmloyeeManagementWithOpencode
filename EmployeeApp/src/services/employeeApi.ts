import { Platform } from 'react-native';

export type Employee = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  image: string | null;
};

export type ApiMode = 'rest' | 'graphql';

const API_BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:5433' : 'http://localhost:5433';

type ListResponse = {
  data?: Employee[];
};

async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>) {
  const response = await fetch(`${API_BASE_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.message || 'GraphQL request failed';
    throw new Error(message);
  }

  const payload = await response.json();
  if (payload?.errors?.length) {
    throw new Error(payload.errors[0]?.message || 'GraphQL error');
  }
  return payload as T;
}

export async function listEmployees(
  mode: ApiMode,
  options?: { search?: string; page?: number; limit?: number }
) {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 50;
  const search = options?.search ?? '';

  if (mode === 'rest') {
    const response = await fetch(
      `${API_BASE_URL}/employees?limit=${limit}&page=${page}&search=${encodeURIComponent(search)}`
    );
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const message = body?.message || 'Failed to load employees';
      throw new Error(message);
    }
    const payload = (await response.json()) as ListResponse;
    return Array.isArray(payload?.data) ? payload.data : [];
  }

  const gqlQuery = `query Employees($page: Int, $limit: Int, $search: String) {
  employees(page: $page, limit: $limit, search: $search) {
    id
    name
    email
    mobile
    image
  }
}`;

  const payload = await graphqlRequest<{
    data?: { employees?: Employee[] };
  }>(gqlQuery, {
    page,
    limit,
    search: search || null,
  });

  return payload?.data?.employees ?? [];
}

export async function getEmployeeById(mode: ApiMode, id: number) {
  if (mode === 'rest') {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const message = body?.message || 'Failed to load employee';
      throw new Error(message);
    }
    return (await response.json()) as Employee;
  }

  const gqlQuery = `query Employee($id: ID!) {
  employee(id: $id) {
    id
    name
    email
    mobile
    image
  }
}`;

  const payload = await graphqlRequest<{
    data?: { employee?: Employee | null };
  }>(gqlQuery, { id });

  return payload?.data?.employee ?? null;
}

export async function createEmployee(
  mode: ApiMode,
  input: { name: string; email: string; mobile: string; image: string | null }
) {
  if (mode === 'rest') {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const message = body?.message || 'Failed to create employee';
      throw new Error(message);
    }
    return (await response.json()) as Employee;
  }

  const mutation = `mutation CreateEmployee($input: EmployeeInput!) {
  createEmployee(input: $input) {
    id
    name
    email
    mobile
    image
  }
}`;

  const payload = await graphqlRequest<{
    data?: { createEmployee?: Employee };
  }>(mutation, { input });

  if (!payload?.data?.createEmployee) {
    throw new Error('Failed to create employee');
  }

  return payload.data.createEmployee;
}

export async function deleteEmployee(mode: ApiMode, id: number) {
  if (mode === 'rest') {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const message = body?.message || 'Failed to delete employee';
      throw new Error(message);
    }
    return true;
  }

  const mutation = `mutation DeleteEmployee($id: ID!) {
  deleteEmployee(id: $id)
}`;

  const payload = await graphqlRequest<{
    data?: { deleteEmployee?: boolean };
  }>(mutation, { id });

  if (!payload?.data?.deleteEmployee) {
    throw new Error('Failed to delete employee');
  }

  return true;
}
