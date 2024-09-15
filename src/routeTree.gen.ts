/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as WireguardIndexImport } from './routes/wireguard/index'
import { Route as VmIndexImport } from './routes/vm/index'

// Create Virtual Routes

const WireguardTestConnectionLazyImport = createFileRoute(
  '/wireguard/test-connection',
)()
const WireguardInstallLazyImport = createFileRoute('/wireguard/install')()
const WireguardDownloadConfigLazyImport = createFileRoute(
  '/wireguard/download-config',
)()
const WireguardAddConfigLazyImport = createFileRoute('/wireguard/add-config')()
const WireguardActivateTunnelLazyImport = createFileRoute(
  '/wireguard/activate-tunnel',
)()

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WireguardIndexRoute = WireguardIndexImport.update({
  path: '/wireguard/',
  getParentRoute: () => rootRoute,
} as any)

const VmIndexRoute = VmIndexImport.update({
  path: '/vm/',
  getParentRoute: () => rootRoute,
} as any)

const WireguardTestConnectionLazyRoute =
  WireguardTestConnectionLazyImport.update({
    path: '/wireguard/test-connection',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/wireguard/test-connection.lazy').then((d) => d.Route),
  )

const WireguardInstallLazyRoute = WireguardInstallLazyImport.update({
  path: '/wireguard/install',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/wireguard/install.lazy').then((d) => d.Route),
)

const WireguardDownloadConfigLazyRoute =
  WireguardDownloadConfigLazyImport.update({
    path: '/wireguard/download-config',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/wireguard/download-config.lazy').then((d) => d.Route),
  )

const WireguardAddConfigLazyRoute = WireguardAddConfigLazyImport.update({
  path: '/wireguard/add-config',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/wireguard/add-config.lazy').then((d) => d.Route),
)

const WireguardActivateTunnelLazyRoute =
  WireguardActivateTunnelLazyImport.update({
    path: '/wireguard/activate-tunnel',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/wireguard/activate-tunnel.lazy').then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/wireguard/activate-tunnel': {
      id: '/wireguard/activate-tunnel'
      path: '/wireguard/activate-tunnel'
      fullPath: '/wireguard/activate-tunnel'
      preLoaderRoute: typeof WireguardActivateTunnelLazyImport
      parentRoute: typeof rootRoute
    }
    '/wireguard/add-config': {
      id: '/wireguard/add-config'
      path: '/wireguard/add-config'
      fullPath: '/wireguard/add-config'
      preLoaderRoute: typeof WireguardAddConfigLazyImport
      parentRoute: typeof rootRoute
    }
    '/wireguard/download-config': {
      id: '/wireguard/download-config'
      path: '/wireguard/download-config'
      fullPath: '/wireguard/download-config'
      preLoaderRoute: typeof WireguardDownloadConfigLazyImport
      parentRoute: typeof rootRoute
    }
    '/wireguard/install': {
      id: '/wireguard/install'
      path: '/wireguard/install'
      fullPath: '/wireguard/install'
      preLoaderRoute: typeof WireguardInstallLazyImport
      parentRoute: typeof rootRoute
    }
    '/wireguard/test-connection': {
      id: '/wireguard/test-connection'
      path: '/wireguard/test-connection'
      fullPath: '/wireguard/test-connection'
      preLoaderRoute: typeof WireguardTestConnectionLazyImport
      parentRoute: typeof rootRoute
    }
    '/vm/': {
      id: '/vm/'
      path: '/vm'
      fullPath: '/vm'
      preLoaderRoute: typeof VmIndexImport
      parentRoute: typeof rootRoute
    }
    '/wireguard/': {
      id: '/wireguard/'
      path: '/wireguard'
      fullPath: '/wireguard'
      preLoaderRoute: typeof WireguardIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/wireguard/activate-tunnel': typeof WireguardActivateTunnelLazyRoute
  '/wireguard/add-config': typeof WireguardAddConfigLazyRoute
  '/wireguard/download-config': typeof WireguardDownloadConfigLazyRoute
  '/wireguard/install': typeof WireguardInstallLazyRoute
  '/wireguard/test-connection': typeof WireguardTestConnectionLazyRoute
  '/vm': typeof VmIndexRoute
  '/wireguard': typeof WireguardIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/wireguard/activate-tunnel': typeof WireguardActivateTunnelLazyRoute
  '/wireguard/add-config': typeof WireguardAddConfigLazyRoute
  '/wireguard/download-config': typeof WireguardDownloadConfigLazyRoute
  '/wireguard/install': typeof WireguardInstallLazyRoute
  '/wireguard/test-connection': typeof WireguardTestConnectionLazyRoute
  '/vm': typeof VmIndexRoute
  '/wireguard': typeof WireguardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/wireguard/activate-tunnel': typeof WireguardActivateTunnelLazyRoute
  '/wireguard/add-config': typeof WireguardAddConfigLazyRoute
  '/wireguard/download-config': typeof WireguardDownloadConfigLazyRoute
  '/wireguard/install': typeof WireguardInstallLazyRoute
  '/wireguard/test-connection': typeof WireguardTestConnectionLazyRoute
  '/vm/': typeof VmIndexRoute
  '/wireguard/': typeof WireguardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/wireguard/activate-tunnel'
    | '/wireguard/add-config'
    | '/wireguard/download-config'
    | '/wireguard/install'
    | '/wireguard/test-connection'
    | '/vm'
    | '/wireguard'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/wireguard/activate-tunnel'
    | '/wireguard/add-config'
    | '/wireguard/download-config'
    | '/wireguard/install'
    | '/wireguard/test-connection'
    | '/vm'
    | '/wireguard'
  id:
    | '__root__'
    | '/'
    | '/wireguard/activate-tunnel'
    | '/wireguard/add-config'
    | '/wireguard/download-config'
    | '/wireguard/install'
    | '/wireguard/test-connection'
    | '/vm/'
    | '/wireguard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  WireguardActivateTunnelLazyRoute: typeof WireguardActivateTunnelLazyRoute
  WireguardAddConfigLazyRoute: typeof WireguardAddConfigLazyRoute
  WireguardDownloadConfigLazyRoute: typeof WireguardDownloadConfigLazyRoute
  WireguardInstallLazyRoute: typeof WireguardInstallLazyRoute
  WireguardTestConnectionLazyRoute: typeof WireguardTestConnectionLazyRoute
  VmIndexRoute: typeof VmIndexRoute
  WireguardIndexRoute: typeof WireguardIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  WireguardActivateTunnelLazyRoute: WireguardActivateTunnelLazyRoute,
  WireguardAddConfigLazyRoute: WireguardAddConfigLazyRoute,
  WireguardDownloadConfigLazyRoute: WireguardDownloadConfigLazyRoute,
  WireguardInstallLazyRoute: WireguardInstallLazyRoute,
  WireguardTestConnectionLazyRoute: WireguardTestConnectionLazyRoute,
  VmIndexRoute: VmIndexRoute,
  WireguardIndexRoute: WireguardIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/wireguard/activate-tunnel",
        "/wireguard/add-config",
        "/wireguard/download-config",
        "/wireguard/install",
        "/wireguard/test-connection",
        "/vm/",
        "/wireguard/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/wireguard/activate-tunnel": {
      "filePath": "wireguard/activate-tunnel.lazy.tsx"
    },
    "/wireguard/add-config": {
      "filePath": "wireguard/add-config.lazy.tsx"
    },
    "/wireguard/download-config": {
      "filePath": "wireguard/download-config.lazy.tsx"
    },
    "/wireguard/install": {
      "filePath": "wireguard/install.lazy.tsx"
    },
    "/wireguard/test-connection": {
      "filePath": "wireguard/test-connection.lazy.tsx"
    },
    "/vm/": {
      "filePath": "vm/index.tsx"
    },
    "/wireguard/": {
      "filePath": "wireguard/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
