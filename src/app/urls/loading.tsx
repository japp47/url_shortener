export default function loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="relative">
                <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-b-4 border-blue-300 rounded-full opacity-75"></div>
            </div>
            <p className="ml-4 text-xl font-medium text-gray-600">Loading...</p>
        </div>
    );
}