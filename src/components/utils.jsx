export const renderStars = (rating) => {
  // Ensure rating is a number between 0 and 5
  const validRating = Math.max(0, Math.min(5, parseFloat(rating) || 0));

  // Calculate the number of full, half, and empty stars
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <svg key={`full-${index}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <svg key={`empty-${index}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};
