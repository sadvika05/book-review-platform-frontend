import { useState, useEffect } from "react";
import api from "../../api";
import { Edit, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function SuggestionBook() {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState("not approved");
    const [remark, setRemark] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const suggestionsPerPage = 5;
    
    const fetchSuggestions = async () => {
        try {
            const response = await api.get("/admin/all-suggestion");
            console.log(response.data.data);
            setSuggestions(response.data.data);
        } catch (error) {
            console.error("Failed to fetch suggestions", error);
        }
    };
    
    useEffect(() => {
        fetchSuggestions();
    }, []);
    
    const handleViewMore = (suggestion) => {
        setSelectedSuggestion(suggestion);
        setIsEditing(false);
        setStatus(suggestion.status || "not approved");
        setRemark(suggestion.remark || "");
    };
    
    const handleEdit = (suggestion) => {
        setSelectedSuggestion(suggestion);
        setIsEditing(true);
        setStatus(suggestion.status || "not approved");
        setRemark(suggestion.remark || "");
    };
    
    const handleClose = () => {
        setSelectedSuggestion(null);
        setIsEditing(false);
    };
    
    const handleSave = async () => {
        const updatedSuggestion = {
            ...selectedSuggestion,
            status,
            remark,
        };
        
        try {
            await api.put(`/admin/update-suggestion/${selectedSuggestion._id}`, updatedSuggestion)
                .then((response) => {
                    console.log(response.data);
                });
            await fetchSuggestions();
            handleClose();
        } catch (error) {
            console.error("Failed to update suggestion", error);
        }
    };
    
    // Sort suggestions
    const sortedSuggestions = [
        ...suggestions.filter(s => s.status === "not approved" || !s.status),
        ...suggestions.filter(s => s.status === "approved"),
        ...suggestions.filter(s => s.status === "rejected")
    ];
    
    // Pagination logic
    const totalPages = Math.ceil(sortedSuggestions.length / suggestionsPerPage);
    const indexOfLastSuggestion = currentPage * suggestionsPerPage;
    const indexOfFirstSuggestion = indexOfLastSuggestion - suggestionsPerPage;
    const currentSuggestions = sortedSuggestions.slice(indexOfFirstSuggestion, indexOfLastSuggestion);
    
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const getStatusColor = (status) => {
        switch (status) {
            case "approved": return "bg-green-50";
            case "rejected": return "bg-red-50";
            default: return "bg-yellow-50";
        }
    };
    
    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-primary mb-6">Book Suggestions</h2>
            
            <div className="space-y-3 mb-4">
                {currentSuggestions.length > 0 ? (
                    currentSuggestions.map((suggestion) => (
                        <div
                            key={suggestion._id}
                            className={`flex items-center justify-between py-3 px-4 rounded-md border ${getStatusColor(suggestion.status)} transition-all hover:shadow-sm`}
                        >
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{suggestion.name}</p>
                                <p className="text-sm text-gray-600">by {suggestion.author}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {suggestion.status && (
                                        <span className={`inline-block px-2 py-0.5 rounded-full ${
                                            suggestion.status === "approved" ? "bg-green-100 text-green-800" :
                                                suggestion.status === "rejected" ? "bg-red-100 text-red-800" :
                                                    "bg-yellow-100 text-yellow-800"
                                        }`}>
                                            {suggestion.status}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleViewMore(suggestion)}
                                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                                >
                                    <Eye size={16} className="mr-1" /> View
                                </button>
                                <button
                                    onClick={() => handleEdit(suggestion)}
                                    className="text-yellow-600 hover:text-yellow-800 flex items-center text-sm px-2 py-1 rounded hover:bg-yellow-50 transition-colors"
                                >
                                    <Edit size={16} className="mr-1" /> Edit
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center py-6 text-gray-500 bg-gray-50 rounded-md">No suggestions available.</p>
                )}
            </div>
            
            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t pt-4">
                    <div className="text-sm text-gray-600">
                        Showing {indexOfFirstSuggestion + 1}-{Math.min(indexOfLastSuggestion, sortedSuggestions.length)} of {sortedSuggestions.length}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        
                        <div className="px-4 py-1 text-sm font-medium">
                            Page {currentPage} of {totalPages}
                        </div>
                        
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
            
            {/* Modal */}
            {selectedSuggestion && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative animate-fade-in">
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                            {isEditing ? "Edit Suggestion" : "Suggestion Details"}
                        </h3>
                        
                        <div className="space-y-3 mb-4">
                            <div className="bg-gray-50 p-3 rounded-md">
                                <p className="text-lg font-medium text-gray-800">{selectedSuggestion.name}</p>
                                <p className="text-gray-600">by {selectedSuggestion.author}</p>
                            </div>
                            
                            <p><span className="font-medium text-gray-700">Suggested by:</span> {selectedSuggestion.userId?.name}</p>
                            <p><span className="font-medium text-gray-700">Email:</span> {selectedSuggestion.userId?.email}</p>
                            <p><span className="font-medium text-gray-700">Reason:</span></p>
                            <p className="bg-gray-50 p-2 rounded text-gray-700 text-sm">{selectedSuggestion.reason}</p>
                            
                            {!isEditing && selectedSuggestion.status && (
                                <p>
                                    <span className="font-medium text-gray-700">Status:</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-sm inline-block ${
                                        selectedSuggestion.status === "approved" ? "bg-green-100 text-green-800" :
                                            selectedSuggestion.status === "rejected" ? "bg-red-100 text-red-800" :
                                                "bg-yellow-100 text-yellow-800"
                                    }`}>
                                        {selectedSuggestion.status}
                                    </span>
                                </p>
                            )}
                            
                            {!isEditing && selectedSuggestion.remark && (
                                <div>
                                    <p className="font-medium text-gray-700">Remark:</p>
                                    <p className="bg-gray-50 p-2 rounded text-gray-700 text-sm">{selectedSuggestion.remark}</p>
                                </div>
                            )}
                        </div>
                        
                        {isEditing && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    >
                                        <option value="not approved">Not Approved</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">Remark</label>
                                    <textarea
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                                        rows="3"
                                        placeholder="Add a remark..."
                                    />
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-2">
                                    <button
                                        onClick={handleClose}
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}