"use server";
import { fetcher } from "@/shared/libs/fetcher";

export async function getUser(id: string) {
  const response = await fetcher(`/users/${id}`);
  return response.data;
}
