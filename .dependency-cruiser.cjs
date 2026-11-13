/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment:
        'Circular dependencies make modules harder to reason about; break the cycle when practical.',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'not-to-unresolvable',
      severity: 'error',
      comment:
        "The dependency graph can't be parsed if a dependency isn't resolved.",
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: 'bootstrap-entry',
      severity: 'error',
      comment: 'Application entry may only wire the router and global styles.',
      from: {
        path: '^src/main\\.tsx$',
      },
      to: {
        path: '^src/',
        pathNot: ['^src/router', '^src/index\\.css$'],
      },
    },
    {
      name: 'router-down-to-pages',
      severity: 'error',
      comment:
        'Router may depend on pages only, not on lower layers directly.',
      from: {
        path: '^src/router',
      },
      to: {
        path: '^src/(containers|ui|hooks|constants|assets|network)',
      },
    },
    {
      name: 'pages-no-upward',
      severity: 'error',
      comment: 'Pages must not depend on the router layer.',
      from: {
        path: '^src/pages',
      },
      to: {
        path: '^src/router',
      },
    },
    {
      name: 'containers-no-upward',
      severity: 'error',
      comment: 'Containers must not depend on router or pages.',
      from: {
        path: '^src/containers',
      },
      to: {
        path: '^src/(router|pages)',
      },
    },
    {
      name: 'containers-no-cross-imports',
      severity: 'error',
      comment:
        'Containers must not import other top-level containers; compose them from pages instead.',
      from: {
        path: '^src/containers/([^/]+)',
      },
      to: {
        path: '^src/containers/',
        pathNot: '^src/containers/$1',
      },
    },
    {
      name: 'foundation-no-upward',
      severity: 'error',
      comment:
        'ui, hooks, constants, assets, and network must not depend on router, pages, or containers.',
      from: {
        path: '^src/(ui|hooks|constants|assets|network)',
      },
      to: {
        path: '^src/(router|pages|containers)',
      },
    },
    {
      name: 'constants-isolated',
      severity: 'error',
      comment: 'Constants may only depend on other constants modules.',
      from: {
        path: '^src/constants',
      },
      to: {
        path: '^src/',
        pathNot: ['^src/constants'],
      },
    },
    {
      name: 'assets-isolated',
      severity: 'error',
      comment: 'Static assets must not import application code.',
      from: {
        path: '^src/assets',
      },
      to: {
        path: '^src/',
        pathNot: ['^src/assets'],
      },
    },
    {
      name: 'hooks-no-ui',
      severity: 'error',
      comment: 'Hooks stay free of UI components.',
      from: {
        path: '^src/hooks',
      },
      to: {
        path: '^src/ui',
      },
    },
    {
      name: 'ui-no-hooks',
      severity: 'error',
      comment: 'UI components must not depend on hooks.',
      from: {
        path: '^src/ui',
      },
      to: {
        path: '^src/hooks',
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
      },
      archi: {
        collapsePattern:
          '^(node_modules|packages|src/(containers|pages|router|ui|hooks|constants|network))',
      },
    },
  },
};
