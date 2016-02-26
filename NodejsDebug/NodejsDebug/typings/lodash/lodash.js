 
        
        
 declare class Lodash {
  findWhere<T>(list: Array<T>, properties: {}): T;
  
  
  
   filter<W , T>(
            collection: Array<T>,
            predicate: W
        ): T[];
}

declare var _: Lodash;