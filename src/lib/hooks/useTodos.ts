import useSWR from "swr";

import { Todo } from "../types";

const fetcher = (url: string): Promise<Todo[]> =>
  fetch(url).then((res) => res.json());

export function useTodos() {
  // Use SWR with the generic Todo[] type
  const { data, error, mutate } = useSWR<Todo[]>("/api/todos", fetcher);

  return {
    todos: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
}
