import { Star, Book, User } from "lucide-react";

export default function ReviewCard({ bookname = "Ash", stars = "5", review = "asda", author = "Asda" }) {
    const rating = parseFloat(stars);
    
    return (
        <div className="w-full bg-background rounded-lg p-5 shadow-md border border-highlight/20 hover:shadow-lg transition-shadow duration-300 mb-2 font-body" >
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primaryText flex items-center">
                        <Book size={18} className="text-accent mr-2" />
                        {bookname}
                    </h3>
                    <p className="text-sm text-secondary flex items-center mt-1">
                        <User size={16} className="text-secondary mr-2" />
                        {author}
                    </p>
                </div>
                
                <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={18}
                            fill={i < Math.floor(rating) ? "#D4A373" : "transparent"}
                            color={i < rating ? "#D4A373" : "#D4A373"}
                            className={i < rating ? "" : "opacity-30"}
                        />
                    ))}
                </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-highlight/20">
                <p className="text-primaryText leading-relaxed">
                    {review}
                </p>
            </div>
        </div>
    );
}