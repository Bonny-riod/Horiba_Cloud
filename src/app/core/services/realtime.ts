import { Injectable } from "@angular/core";
import { BehaviorSubject, interval } from "rxjs";
import { LIVE_GRAPH_PRESET } from "../../../app/dummy-data/live-graph";

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  private graph$ = new BehaviorSubject<any[]>(LIVE_GRAPH_PRESET);

  constructor() {
    this.simulateStream();
  }

  getGraphStream() {
    return this.graph$.asObservable();
  }

  private simulateStream() {
    interval(2000).subscribe(() => {
      const current = this.graph$.value;

      const newPoint = {
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        value: Math.floor(20 + Math.random() * 30)
      };

      const updated = [...current.slice(1), newPoint];
      this.graph$.next(updated);
    });
  }
}
