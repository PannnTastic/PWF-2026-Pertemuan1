<form action="{{ $url }}" method="POST" class="inline" onsubmit="return confirm('Are you sure you want to delete this {{ strtolower($name) }}?')">
    @csrf
    @method('DELETE')
    <button type="submit" class="inline-flex items-center gap-2 px-4 py-2 border border-red-500 text-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 text-sm font-medium rounded-lg transition duration-150">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete {{ $name }}
    </button>
</form>