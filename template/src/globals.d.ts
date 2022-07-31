/// <reference types="vite-plugin-pwa/client" />

declare module "virtual:pwa-register/react" {
    import { Dispatch, SetStateAction } from "react";
  
    export type RegisterSWOptions = {
      immediate?: boolean;
      onNeedRefresh?: () => void;
      onOfflineReady?: () => void;
      onRegistered?: (
        registration: ServiceWorkerRegistration | undefined
      ) => void;
      onRegisterError?: (error: any) => void;
    };
  
    export function useRegisterSW(options?: RegisterSWOptions): {
      needRefresh: [boolean, Dispatch<SetStateAction<boolean>>];
      offlineReady: [boolean, Dispatch<SetStateAction<boolean>>];
      updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
    };
  }
  
  declare module "virtual:pwa-register" {
    export interface RegisterSWOptions {
      immediate?: boolean;
      onNeedRefresh?: () => void;
      onOfflineReady?: () => void;
      onRegistered?: (
        registration: ServiceWorkerRegistration | undefined
      ) => void;
      onRegisterError?: (error: any) => void;
    }
  
    export function registerSW(
      options?: RegisterSWOptions
    ): (reloadPage?: boolean) => Promise<void>;
  }
  

export interface AuthData {
    email: string;
    password: string;
  }
  
  
export interface meta {
    count: number;
    current: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    current_page?: number;
}