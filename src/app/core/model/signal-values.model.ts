import { WritableSignal } from '@angular/core';


export interface SignalValues {
      [key: string]: WritableSignal<string>; 
}
