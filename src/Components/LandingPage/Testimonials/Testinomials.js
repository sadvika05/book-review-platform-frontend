import { User, Star } from 'lucide-react';
import {motion} from "framer-motion"

export default function Testimonials() {
    const testimonialData = [
        {
            username: "sadvika",
            text: "One of the best pages to find the books. The recommendations are always spot on!",
            rating: 5
        },
        {
            username: "soumika",
            text: "I've discovered so many amazing authors through this platform. The user interface is intuitive and the collection is vast.",
            rating: 4.5
        },
        {
            username: "bookworm69",
            text: "As an avid reader, I appreciate how well-organized everything is. Finding my next read has never been easier.",
            rating: 5
        },
        {
            username: "booklover143",
            text: "The community reviews helped me discover hidden gems I would have otherwise missed. Truly a reader's paradise!",
            rating: 4.5
        },
        {
            username: "mass_reader",
            text: "This platform has reignited my love for reading! The variety and quality of books available is exceptional.",
            rating: 5
        },
        {
            username: "page_turner92",
            text: "Fantastic platform for book lovers! The personalized recommendations never disappoint, and I always find something new to read.",
            rating: 4.8
        },
        {
            username: "novel_enthusiast",
            text: "I can't imagine my reading journey without this site. It offers great suggestions and the interface is smooth and easy to use.",
            rating: 5
        },
        {
            username: "book_hunter",
            text: "Great experience overall! The genre filters are perfect, and I've found books I never thought I'd enjoy.",
            rating: 4.7
        },
        {
            username: "fiction_fanatic_420",
            text: "I love how this platform brings together readers from all around the world. It's a perfect place for book lovers to share opinions.",
            rating: 4.9
        },
        {
            username: "book_lover_96",
            text: "The reading suggestions based on my interests are always spot on! I’ve read more books in the past few months than ever before.",
            rating: 5
        }
    ];
    
    
    return (
        <section className="py-12 bg-gray-50" id="testimonials">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, type: "easeInOut" }}
                    viewport={{ once: true, amount: 0.05 }}
                >
                    <h2 className="text-2xl lg:text-3xl  font-bold text-gray-800 mb-2 font-header">
                        What Our Users Say
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                </motion.div>

                <div className="relative overflow-hidden">
                    <div className="flex animate-slide space-x-6">
                        {[...testimonialData, ...testimonialData].map(
                            (testimonial, index) => (
                                <motion.div
                                    key={index}
                                    className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col text-lg"
                                    initial={{ y: 100 }}
                                    whileInView={{ y: 0 }}
                                    transition={{
                                        duration: 1.5,
                                        type: "easeInOut",
                                    }}
                                    viewport={{ once: true, amount: 0.05 }}
                                >
                                    <div className="mb-4 flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white mr-3">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 font-body">
                                                @{testimonial.username}
                                            </p>
                                            <div className="flex items-center mt-1">
                                                {[
                                                    ...Array(
                                                        Math.floor(
                                                            testimonial.rating
                                                        )
                                                    ),
                                                ].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        fill="#D4A373"
                                                        color="#D4A373"
                                                    />
                                                ))}
                                                {testimonial.rating % 1 !==
                                                    0 && (
                                                    <Star
                                                        size={16}
                                                        fill="#D4A373"
                                                        color="#D4A373"
                                                        className="opacity-50"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 italic flex-grow">
                                        {testimonial.text}
                                    </p>
                                </motion.div>
                            )
                        )}
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes slide {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                    }
                    .animate-slide {
                    animation: slide 30s linear infinite;
                    }
                `}
            </style>
        </section>
    );
}
