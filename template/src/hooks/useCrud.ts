import { useState } from "react";
import { toast } from "react-toastify";
import { meta } from "../types";
import { useApi } from "./useApi";
import qs from "qs";
// import assert from "assert";

interface Options {
  meta?: boolean;
}

const defaultOptions = {
  meta: false,
};

let error_message =
  "something went wrong, please try again or contact the administrator";

export function useCrud(url: string, options?: Options) {
  options = { ...defaultOptions, ...options };
  const api = useApi();

  const [state, setState] = useState({
    loading: true,
    errors: null,
    data: [] as any[],
    item: null as any | null,
    meta: {
      current: 1,
      total: 0,
      per_page: 15,
      last_page: 1,
      from: 1,
    } as meta,
  });

  const setLoading = (val: boolean) => {
    setState({ ...state, loading: val });
  };

  const deafultParams: any = {};

  const fetch: any = async (params = deafultParams, query: string) => {
    setState((prevState) => ({
      ...prevState,
      data: [],
      loading: true,
      errors: null,
    }));

    let queryParams = query ? qs.parse(query, { plainObjects: true }) : {};

    try {
      const { data } = await api.get(url, {
        params: { ...params, ...queryParams },
      });
      if (options?.meta) {
        setState((prevState) => ({
          ...prevState,
          data: data.data,
          loading: false,
          meta: data.meta,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          data: data.data,
        }));
      }
      return (state.data as any[]) ?? [];
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error("404 log not found");
      }
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else toast.error(error_message);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
      throw error;
    }
  };

  const fetchById = async (id: number | string) => {
    setState((prevState) => ({
      ...prevState,
      errors: null,
    }));
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.get(`${url}/${id}`);
        setState((prevState) => ({
          ...prevState,
          loading: false,
          item: data,
        }));
        resolve(data);
      } catch (error: any) {
        if (error.response.status === 404) {
          toast.error("404 log not found");
        }
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        } else toast.error(error_message);
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        reject(error);
      }
    });
  };

  const create = async (payload: any) => {
    setState((prevState) => ({
      ...prevState,
      errors: null,
    }));

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.post(`${url}/store`, payload);
        toast.success("data created successfully");
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errors: null,
        }));
        resolve(data);
      } catch (error: any) {
        if (error.response.status === 404) {
          toast.error("404 log not found");
        }
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        } else toast.error(error_message);
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        throw error;
      }
    });
  };

  const update = async ({
    id,
    payload,
  }: {
    id: string | number;
    payload: any;
  }) => {
    setState((prevState) => ({
      ...prevState,
      errors: null,
    }));
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.put(`${url}/${id}`, payload);
        toast.success("data updated successfully");
        resolve(data);
      } catch (error: any) {
        if (error.response.status === 404) {
          toast.error("404 log not found");
        }
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        } else toast.error(error_message);
        reject(error);
      }
    });
  };

  const remove = async (item: any) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      await api.delete(`${url}/${item.id}`);
      const index = state.data.findIndex((i: any) => i.id === item.id);
      index !== -1 &&
        setState((prevState) => ({
          ...prevState,
          data: state.data.splice(index, 1),
        }));
      toast.success("data deleted successfully");
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error("404 log not found");
      }
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else toast.error(error_message);
      throw error;
    }
    setState((prevState) => ({
      ...prevState,
      loading: false,
    }));
  };

  

 

  return {
    ...state,
    fetch,
    fetchById,
    create,
    update,
    remove,
    setLoading,
  };
}
