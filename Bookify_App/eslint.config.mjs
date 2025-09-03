// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
    // ===============================
    // 1) Files and folders to ignore
    // ===============================
    {
        ignores: [
            "node_modules", // dependencies
            "dist", // build output (Vite)
            "build", // alternative build folder
            "coverage", // test coverage reports
            "db.json", // mock database file
            // Add more here if needed, e.g. "server/**"
        ],
    },

    // ===============================
    // 2) Base ESLint recommended rules for JavaScript
    // ===============================
    eslint.configs.recommended,

    // ===============================
    // 3) TypeScript ESLint recommended rules with type-checking
    // ===============================
    ...tseslint.configs.recommendedTypeChecked,

    // ===============================
    // 4) Prettier integration
    // (must be last to override formatting rules)
    // ===============================
    eslintPluginPrettierRecommended,

    // ===============================
    // 5) Frontend (React + TS) configuration
    // ===============================
    {
        files: ["src/**/*.{ts,tsx,js,jsx}"], // Apply only to frontend source code
        languageOptions: {
            globals: {
                ...globals.browser, // Browser environment (window, document, etc.)
            },
            sourceType: "module", // ES modules
            parserOptions: {
                projectService: true, // Let TS ESLint find tsconfig automatically
                tsconfigRootDir: import.meta.dirname, // Root dir for tsconfig.json
            },
        },
        plugins: {
            "react-hooks": reactHooks, // Rules for React hooks
            "react-refresh": reactRefresh, // For Vite React Fast Refresh
        },
        rules: {
            // React Hooks rules (must be enabled for hook correctness)
            ...reactHooks.configs.recommended.rules,

            // Warn if component exports break React Fast Refresh in Vite
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],

            // Warn on unused variables (TypeScript-aware version)
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_", // Allow unused args starting with "_"
                    varsIgnorePattern: "^[A-Z_]", // Allow unused vars in UPPER_CASE (e.g., constants)
                },
            ],

            // Common but non-blocking rules
            "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type
            "@typescript-eslint/no-floating-promises": "warn", // Warn about unhandled promises
            "@typescript-eslint/no-unsafe-argument": "warn", // Warn about unsafe arguments
        },
    },

    // ===============================
    // 6) Node.js environment configuration
    // (for config files and scripts in project root)
    // ===============================
    {
        files: [
            "*.mjs",
            "*.cjs",
            "vite.config.{ts,js,mjs,cjs}",
            "generateData.ts",
            "scripts/**/*.{ts,js,mjs,cjs}",
            "config/**/*.{ts,js,mjs,cjs}",
        ],
        languageOptions: {
            globals: {
                ...globals.node, // Node.js environment
            },
            sourceType: "module", // ES modules
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // Disable "floating promises" warning for Node.js scripts
            "@typescript-eslint/no-floating-promises": "off",
        },
    },

    // ===============================
    // 7) (Optional) Test environment config
    // Uncomment if you use Vitest or Jest
    // ===============================
    {
      files: ["**/*.{test,spec}.{ts,tsx,js,jsx}"],
      languageOptions: {
        globals: {
          ...globals.vitest, // or ...globals.jest
        },
      },
    }
);
