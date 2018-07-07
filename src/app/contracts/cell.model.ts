export class Cell
{
  private isAlive:boolean;  
  private x: number;
  private y: number;
  private neighbours = [];

   constructor(x, y) {
     this.x = x;
     this.y = y;  
     this.isAlive = false;   
   }

   getIsAlive()
   {
       return this.isAlive;
   }


}
