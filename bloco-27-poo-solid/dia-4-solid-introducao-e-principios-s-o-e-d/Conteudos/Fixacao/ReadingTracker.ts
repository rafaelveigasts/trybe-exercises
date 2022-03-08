/* // ReadingTracker.ts
type Book = {
  book: string;
  author: string;
  genre: string;
}

class ReadingTracker {
  private readingGoal: number;
  private booksRead: number;
  private wishlist: Book[];

  constructor(readingGoal: number) {
    this.readingGoal = readingGoal;
    this.booksRead = 0;
    this.wishlist = [];
  }

  trackReadings(readsCount: number) {
    this.booksRead += readsCount;
    if (this.booksRead >= this.readingGoal) {
      this.progressNotification(
        "Congratulations! You've reached your reading goal!"
      );
      return;
    }
    this.progressNotification(
      "There are still some books to go!"
    );
  }

  addToWishList(book: Book): void {
    this.wishlist.push(book);
  }

  showWishlist(): void {
    console.log(this.wishlist);
  }

  progressNotification(message: string): void {
    console.log(message);
  }
}

const readTracker = new ReadingTracker(20);
readTracker.addToWishList({'The Road', 'Cormac McCarthy', 'Dystopia'});
readTracker.showWishlist();
readTracker.trackReadings(12);
readTracker.trackReadings(9); */

// ReadingTracker.ts
import progressNotification from './notifications';

class ReadingTracker {
  private readingGoal: number;
  private booksRead: number;

  constructor(readingGoal: number) {
    this.readingGoal = readingGoal;
    this.booksRead = 0;
  }

  trackReadings(readsCount: number) {
    this.booksRead += readsCount;
    if (this.booksRead >= this.readingGoal) {
      this.progressNotification(
        "Congratulations! You've reached your reading goal!"
      );
      return;
    }
    this.progressNotification(
      "There are still some books to go!"
    );
  }
}

const readTracker = new ReadingTracker(20);
readTracker.trackReadings(12);
readTracker.trackReadings(9);

// BooksWishlist.ts
type Book = {
  book: string;
  author: string;
  genre: string;
}

class BooksWishlist {
  private wishlist: Book[];
  constructor(book: Book) {
    this.wishlist = [];
    this.wishlist.push(book);
  }

  addToWishList(newBook: Book): void {
    this.wishlist.push(newBook);
  }

  showWishlist(): void {
    return console.log(this.wishlist);
  }
}

const wishlist = new BooksWishlist({book: 'The Road', author: 'Cormac McCarthy', genre: 'Dystopia'})
wishlist.addToWishList({book: 'Misery', author: 'Stephen King', genre: 'Thriller'});
wishlist.showWishlist();

// notifications.ts

export default function progressNotification(message: string): void {
  console.log(message)
};