export interface Fighter {
  id: string;
  name: string;
  weightClass: string;
  gym?: string;
  record: string;
  bio?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FightEvent {
  id: string;
  name: string;
  date: string;
  venue: string;
  fighters: [Fighter, Fighter];
  status: 'upcoming' | 'live' | 'completed';
}

export interface FightRound {
  round: number;
  winner?: string;
  takedowns: number;
  significantStrikes: number;
}

export interface FightResult {
  eventId: string;
  rounds: FightRound[];
  result?: string;
  winner?: string;
}

export interface LocalEvent {
  id: string;
  name: string;
  date: Date;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  ticketUrl?: string;
  fightCard: Array<{
    fighter1: Fighter;
    fighter2: Fighter;
    weightClass: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
} 