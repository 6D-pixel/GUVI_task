const Toast = ({ message }) => {
  return (
    <div className="absolute bottom-10 end-20">
      <div
        class="max-w-xs bg-gray-800 text-sm text-white rounded-xl shadow-lg dark:bg-gray-900"
        role="alert"
      >
        <div class="flex p-4">
          {message}

          <div class="ms-auto">
            <button
              type="button"
              class="inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
            >
              <span class="sr-only">Close</span>
              <svg
                class="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
