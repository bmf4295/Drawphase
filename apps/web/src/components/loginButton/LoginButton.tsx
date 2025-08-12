import React from "react";

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-3 px-5 py-2 rounded bg-white shadow hover:bg-gray-100 border border-gray-300 transition light:text-gray-800 dark:text-white font-medium"
    style={{ minWidth: 180 }}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <g>
        <path
          fill="#4285F4"
          d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.86-6.86C35.82 2.13 30.28 0 24 0 14.82 0 6.73 5.48 2.69 13.44l8.01 6.22C12.44 13.09 17.74 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.41c-.54 2.91-2.18 5.38-4.66 7.04l7.19 5.6C43.97 37.44 46.1 31.5 46.1 24.55z"
        />
        <path
          fill="#FBBC05"
          d="M10.7 28.66a14.5 14.5 0 0 1 0-9.32l-8.01-6.22A23.98 23.98 0 0 0 0 24c0 3.77.9 7.34 2.69 10.88l8.01-6.22z"
        />
        <path
          fill="#EA4335"
          d="M24 48c6.28 0 11.56-2.08 15.41-5.67l-7.19-5.6c-2.01 1.35-4.59 2.16-8.22 2.16-6.26 0-11.56-3.59-13.3-8.74l-8.01 6.22C6.73 42.52 14.82 48 24 48z"
        />
        <path fill="none" d="M0 0h48v48H0z" />
      </g>
    </svg>
    <span>Sign in with Google</span>
  </button>
);

export default LoginButton;