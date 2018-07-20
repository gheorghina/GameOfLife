# The evolve function mechanism

For the current generation state the following steps are applied:

1. A list of computed addiacent cells is created: "the addiacent groups"
   The addiacent groups are computed in a recursive way:
        - for a given list of alive cells, one cell is extracted
        - for the extracted cell, a search is performed to extract the list of addiacent ones, and added to the same group
        - if there are any remaining cells in the list after the above step, then a new cell is extracted, and put in a new group
        - for the new extracted cell, the same approach is followed for computing its addiacent cells

2. For each group of addiacent cells, it is calculated the Min and Max XY coordinates for being able to identify a smaller square universe around the alive cells. The coordinates are defined in such a way that this universe shall contain also the dead cells which might be resurected

3. The evolution is calculated then for each group of addiacent cells, going from cell to cell in the smaller computed area around the living cells, given by the Min-Max computed coordinates 

4. In order not to calculate the index of the living cells in the generation for identifying which one is alive and which one is dead, a new list is kept only with the information if alive cells were added to the generation. 
For an easy interogation of the list, a key is computed, containing the row and col of each alive cell

5. Then for each cell, the evolution mechanism applies with the Game of Life rules

6. For being able to expand the universe, an additional check is performed for seeing if the margin of the current universe was hit

