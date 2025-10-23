// Reviews Component - Display Real Google Reviews

interface Review {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  photos?: number;
  reviews?: number;
  isLocalGuide?: boolean;
}

const reviews: Review[] = [
  {
    name: "Tracey Lewis",
    avatar: "TL",
    rating: 5,
    date: "a year ago",
    text: "Great experience, Maxine is such a fabulous hairdresser and a lovely person, I felt totally relaxed and at ease with her, I will definitely be returning.",
    reviews: 3,
    photos: 1
  },
  {
    name: "Nikki D",
    avatar: "ND",
    rating: 5,
    date: "2 years ago",
    text: "Such a friendly, professional business. Maxine and Carla always do a fabulous job. Would recommend 😀",
    reviews: 11,
    photos: 4
  },
  {
    name: "Gail Stovell",
    avatar: "GS",
    rating: 5,
    date: "2 years ago",
    text: "I've been a customer of Maxine's for over 20 years and have become good friends during this time. Maxine and Carla are both amazing, definitely a fantastic hairdressers, always friendly and recommend great hairstyles whenever you feel like a change.",
    reviews: 4,
    isLocalGuide: true
  },
  {
    name: "BetaRaySam337",
    avatar: "BS",
    rating: 5,
    date: "2 years ago",
    text: "Fantastic hairdresser. Carla is very very good.",
    reviews: 96,
    photos: 50,
    isLocalGuide: true
  },
  {
    name: "Carolyn Taylor",
    avatar: "CT",
    rating: 5,
    date: "3 years ago",
    text: "Nice friendly place to go for a haircut",
    reviews: 23,
    photos: 2,
    isLocalGuide: true
  },
  {
    name: "Pamela Ladds",
    avatar: "PL",
    rating: 5,
    date: "3 years ago",
    text: "Never had such a good hair cut already booked my second appointment love it",
    reviews: 97,
    photos: 2,
    isLocalGuide: true
  },
  {
    name: "Yvonne Kruszelnicki",
    avatar: "YK",
    rating: 5,
    date: "3 years ago",
    text: "Amazing results as always. Thanks Maxine",
    reviews: 31,
    photos: 30,
    isLocalGuide: true
  }
];

export class ReviewsDisplay {
  init(containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = reviews.map(review => this.createReviewCard(review)).join('');
  }

  private createReviewCard(review: Review): string {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    return `
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar">${review.avatar}</div>
          <div class="review-author">
            <div class="review-name-row">
              <h4>${review.name}</h4>
              ${review.isLocalGuide ? '<span class="local-guide-badge">Local Guide</span>' : ''}
            </div>
            <div class="review-meta">
              ${review.reviews ? `<span>${review.reviews} reviews</span>` : ''}
              ${review.photos ? `<span>· ${review.photos} photo${review.photos > 1 ? 's' : ''}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="review-rating">
          <div class="review-stars">${stars}</div>
          <span class="review-date">${review.date}</span>
        </div>
        <p class="review-text">${review.text}</p>
        <div class="review-footer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="google-icon">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Posted on Google</span>
        </div>
      </div>
    `;
  }
}

export const reviewsDisplay = new ReviewsDisplay();
