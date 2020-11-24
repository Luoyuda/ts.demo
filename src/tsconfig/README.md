<!--
 * @Author: xiaohuolong
 * @Date: 2020-11-16 21:07:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-17 09:58:01
 * @FilePath: /ts.demo/src/tsconfig/README.md
-->
# tsconfig 选项

```json
{
    "files": ["a.ts"], // 表示编译器需要编译的文件列表
    "includes": ["src/*/*"], // 表示编译器需要编译的文件或者目录 （与files合并）
    "exclude": ["src/lib"], // 表示编译器需要排除的文件
    "extends": "", // 引入其他文件配置
    "compilerOptions": {
        /* Basic Options */
        // "incremental": true,                   /* 增量编译，第一次编译后生成编译信息相关文件加快后续编译速度 */
        // "tsBuildInfoFile": "./",               /* 增量编译文件的存储位置 */
        // "diagnostics": true,                   /* 打印信息 */
        "target": "es5",                          /* 目标语言版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
        "module": "commonjs",                     /* 生成代码模块标准: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
        // "outFile": "./",                       /* 将多个相互依赖文件生成到一个文件中，可用于AMD模块 */
        // "lib": [],                             /* TS 需要引用的库， 即声明文件 */
        // "allowJs": true,                       /* 允许编译 js,jsx 文件 */
        // "checkJs": true,                       /* 允许在 js 文件中报错 */
        // "outDir": "./",                        /* 指定输出目录 */
        // "rootDir": "./",                       /* 指定输入文件目录（用于输出） --outDir. */

        // "declaration": true,                   /* 生成声明文件 */
        // "declarationDir": "./",                /* 声明文件目录 */
        // "emitDeclarationOnly": true,           /* 只生成声明文件 */
        // "sourceMap": true,                     /* 生成目标文件的 sourceMap */
        // "inlineSourceMap": true,               /* 生成目标文件的 inline sourceMap */
        // "declarationMap": true,                /* 生成声明文件的 sourceMap */
        // "typeRoots": [],                       /* 声明文件目录 默认 node_modules/@types */
        // "types": [],                           /* 声明文件包 */
        
        "removeComments": true,                   /* 删除注释 */

        // "noEmit": true,                        /* 不输出文件 */
        // "noEmitOnError": true,                 /* 发生错误时不输出文件 */
        // "noEmitHelpers": true,                 /* 不生成 helper 函数，需要额外安装 ts-helper */
        // "importHelpers": true,                 /* 通过 tslib 引入 helper 函数，文件必须是模块 */

        // "downlevelIteration": true,            /* 降级遍历器的实现 */

        // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
        // "composite": true,                     /* Enable project compilation */
        // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

        /* Strict Type-Checking Options */
        "strict": true,                           /* 开启严格模式 */
        // "alwaysStrict": true,                  /* 代码中注入 "use strict" */
        // "noImplicitAny": true,                 /* 不允许隐式的 any */
        // "strictNullChecks": true,              /* 不允许把 null undefined 复制给其他类型变量 */
        // "strictFunctionTypes": true,           /* 不允许函数参数双向协变 */
        // "strictBindCallApply": true,           /* 严格的 'bind', 'call', and 'apply' 检查 */
        // "strictPropertyInitialization": true,  /* 类的实例属性必须初始化 */
        // "noImplicitThis": true,                /* 不允许 this 有隐式的 any 类型 */

        /* Additional Checks */
        // "noUnusedLocals": true,                /* 检查只声明未使用的局部变量 */
        // "noUnusedParameters": true,            /* 检查未使用的函数参数. */
        // "noImplicitReturns": true,             /* 所有分支必须有返回值 */
        // "noFallthroughCasesInSwitch": true,    /* 防止 switch 语句贯穿 */

        /* Module Resolution Options */
        // "moduleResolution": "node",            /* 模块解析策略: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
        // "baseUrl": "./",                       /* 解析非相对模块的基地址. */
        // "paths": {},                           /* 路径映射，相对于 baseUrl */
        // "rootDirs": [],                        /* 将多个目录放在一个虚拟目录下，用于运行时 */
        // "typeRoots": [],                       /* List of folders to include type definitions from. */
        // "types": [],                           /* Type declaration files to be included in compilation. */
        // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
        "esModuleInterop": true,                  /* 允许 export = 导出， 由 import from 导入 */
        // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
        // "allowUmdGlobalAccess": true,          /* 允许模块访问 UMD 全局变量 */

        /* Source Map Options */
        // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
        // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
        // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

        /* Experimental Options */
        "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
        // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
    
    }
}
```