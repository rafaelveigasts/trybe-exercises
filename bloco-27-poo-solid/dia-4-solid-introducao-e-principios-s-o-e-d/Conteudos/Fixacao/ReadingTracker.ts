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

interface Notificator {
  sendNotification(message: string): void;
}

class ConsoleNotification implements Notificator {
  sendNotification(message: string) {
    console.log(`Here we go again! - ${message}`)
  }
}

class EmailNotification implements Notificator {
  private email: string;
  constructor(email: string) {
    this.email = email;
  }
  sendNotification(message: string) {
    console.log(
      `Here should go the implementation to send notification to the email: ${this.email} - ${message}`
    )
  }
}

class PhoneNotification implements Notificator {
  private phone: number;
  constructor(phone: number) {
    this.phone = phone;
  }
  sendNotification(message: string) {
    console.log(
      `Here should go the implementation to send notification to the phone ${this.phone} - ${message}`
    );
  }
}

export class ReadingTracker {
  private readingGoal: number;
  private booksRead: number;
  constructor(readingGoal: number,  public notificator: Notificator = new ConsoleNotification()) {
    this.readingGoal = readingGoal;
    this.booksRead = 0;
  }

  trackReadings(readsCount: number) {
    this.booksRead += readsCount
    if (this.booksRead >= this.readingGoal) {
      this.notificator.sendNotification(
        "Congratulations! You've reached your reading goal!"
      )
      return;
    }
    this.notificator.sendNotification("There are still some books to go!")
  }
  // Aqui viriam mais m??todos, que fogem o escopo deste exerc??cio 
}